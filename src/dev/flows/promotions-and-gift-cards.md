---
title: Promotions & gift cards
description: "Coupon and automatic promotion rules, stacking, the on-offer badge and search filter, the gift-card ledger, refund-to-card, the two-tier gates, and the manual cache purge the offers page needs."
---

# Promotions and gift cards

Two features that both reduce what a shopper pays, and that are deliberately
**not** the same kind of thing. A promotion is a **discount**: it reduces the
order's taxable value and is evaluated fresh against the cart every time.
A gift card is a **payment instrument**: an accounting liability with an
append-only ledger, redeemed against the amount due, never against the goods
value.

The order they apply in is fixed and stated in `promotion/services.py`:
product markdown (already inside `Product.final_price`) → promotions →
loyalty redemption → gift-card payment.

## Diagram

```mermaid
flowchart TD
  Cart["Cart"] --> Bind["B2B pricing binding"]
  Bind --> Eval["PromotionEngine.evaluate"]
  Eval --> Gate{"is_enabled: plan AND setting"}
  Gate -- "no" --> Empty["empty result"]
  Gate -- "yes" --> Cand["_collect_candidates: automatic + attached codes"]
  Cand --> Elig["_check_eligibility per candidate"]
  Elig --> Amt["benefit amount / BXGY / gift / free shipping"]
  Amt --> Stack["_resolve_stacking"]
  Stack --> Clamp["clamp to items total"]
  Clamp --> Result["CartDiscountResult"]

  Result --> Preview["cart read + payment intent"]
  Result --> Create["order create with lock"]
  Create --> Rec["PromotionEngine.record: redemption rows"]

  Due["amount due"] --> Plan["GiftCardService.plan_redemption"]
  Plan --> Ledger["REDEEM rows, negative"]
  Refund["order refunded / canceled"] --> Credit["REFUND_CREDIT rows"]
```

## How it works

### One engine, four callers, one answer

`PromotionEngine.evaluate(cart)` is the only place a discount is computed.
Four surfaces call it: the cart serializer (preview), the payment-intent
amount, `CouponService.apply` when a code is attached, and
`OrderService._evaluate_promotions` — which both order-create paths, the
intent-first one and the offline one, go through. The verification guard and
the recorded discount are not two calls: they are one locked evaluation
inside `create_order_from_cart`, whose result feeds both the
`PaymentAmountMismatchError` check and `record`. The
module docstring states the contract — **all of them must agree to the cent**,
and `PaymentAmountMismatchError` is the alarm that fires when they do not.

`lock=True` takes `select_for_update` on the candidate `Promotion` rows and
is used **only** inside the order-create transaction, so usage-limit
enforcement is race-free. Preview surfaces evaluate without locks; the
order-create recomputation with the lock held is the source of truth.

### What a promotion is

`promotion/models/promotion.py: Promotion` is a translatable rule with:

| Axis | Field | Values |
|---|---|---|
| Trigger | `trigger` | `AUTOMATIC` (every eligible cart) or `CODE` (needs a coupon) |
| Benefit | `benefit_type` | `PERCENTAGE`, `FIXED_AMOUNT`, `FREE_SHIPPING`, `BXGY`, `FREE_GIFT` |
| Target | `target_scope` | `ORDER`, `PRODUCTS`, `CATEGORIES` |

Bundles are deliberately **not** a benefit type: the enum's comment calls
them a catalog construct — a composite product with component stock — not a
cart rule.

Conditions are `min_quantity` (eligible units after scope and exclusions),
`min_subtotal` (VAT-inclusive items total), `first_order_only`,
`usage_limit_total`, `usage_limit_per_customer`, plus exclusions
(`excluded_products`, `excluded_categories`, `exclude_discounted_products`).
Category targeting includes subcategories automatically — `_descendant_index`
expands every candidate's categories from **one** descendant query and hangs
the result on the in-memory instance for that evaluation only.

`Promotion.clean()` enforces the shape rules: a percentage benefit between 0
and 100, a positive fixed amount, `ends_at` after `starts_at`, BXGY needing
both quantities and a get-discount between 0 and 100, and a free gift needing
at least one gift unit. `is_live` is `is_active` plus the schedule window.

### Coupon codes

`PromotionCode` belongs to a `CODE` promotion and carries its own
`usage_limit` (1 for single-use bulk codes), an optional `assigned_to` user
or `assigned_to_email` for personal coupons, and `is_active`. Codes are
stored uppercase — `save()` normalises — and looked up that way.

`CartPromotionCode` is the attachment. The schema allows several rows per
cart so multi-code checkout can ship later without a migration, but
`CouponService.apply` enforces **one coupon per cart in v1**: applying a new
code deletes the previous row.

`CouponService.apply` refuses an unknown or inactive code with
`discount_code_invalid`, a non-live promotion with the precise window reason,
and — after attaching — re-evaluates; if the cart itself makes the code
ineligible, it **detaches the code again** and raises with the exact reason
rather than leaving a dead code on the cart.

Rejection reasons are a closed vocabulary, `CouponRejectionReason`, whose
values follow the ACP discount-extension error vocabulary verbatim so the
agent gateway can pass them through unchanged.

`CartDiscountResult.blocking_rejections` filters one reason out:
`combination_disallowed` is **not** blocking. A code that lost the stacking
comparison to a better automatic promotion charges the shopper *less* than the
code alone would have, and the cart preview already showed that outcome.

### Stacking and priority

`_resolve_stacking` is short and total:

- Stackable promotions combine, ordered by `priority` then primary key
  (lower priority applies first).
- Non-stackable promotions apply **alone**.
- The best single non-stackable competes against the **sum** of the
  stackables, and whichever discounts more wins.
- Every loser that came from a code is reported as
  `combination_disallowed`.

Free shipping never takes part: it has no amount to conflict over, so
`stackable` is ignored and it always combines. Free gifts are likewise
non-monetary.

After stacking, the chosen entries are clamped so the running discount never
exceeds the items total.

### Recording

`PromotionEngine.record(order, result)` must run in the same transaction and
under the same locks as the `evaluate(lock=True)` that produced the result.
It writes a `PromotionRedemption` per applied promotion — **including
zero-amount rows for free shipping and free gifts**, without which their
usage limits would count nothing — and mirrors a summary into
`order.metadata` under `promotions`, `promotion_gifts` and
`promotion_free_shipping`. `PromotionRedemption` is the usage-limit ledger;
counting it under the promotion lock is what makes limit enforcement
race-free.

`CouponService.clear_after_order(cart)` detaches the code once the order
exists — the redemption rows are the durable record.

Gifts add parcel weight. `gift_weight_grams` exists because shipping quotes
are weight-banded, and every surface that prices shipping must include the
gift or the courier upcharges the voucher later.

### Near misses

An **automatic** promotion blocked only by its minimum subtotal is reported
as a `NearMissEntry` with the exact remaining amount, which powers the
storefront's "add X more to unlock" teaser. Codes never produce near misses —
they produce a rejection — and an empty cart never produces one.

### Discovery: three surfaces, one rule

"May a shopper be told about this promotion?" has exactly one answer, in
`PromotionQuerySet.publicly_listable` (`promotion/managers/promotion.py`):
every live automatic promotion, plus code promotions with at least one
**publicly advertisable** code (`publishable_code_q` — not personal, not a
single-use bulk code), minus anything that has hit `usage_limit_total`. All
three discovery surfaces below compose it, so none can advertise an offer
the cart would then refuse.

They also share one payload shape — `PublicPromotionSerializer` — which is
what lets the storefront render the same card everywhere from a single
`app/composables/usePromotionOffer.ts` (headline, conditions, expiry, icon,
colour, and the translated ACP rejection vocabulary).

#### The offers page

`GET /api/v1/promotion` (`promotion/views.py: PublicPromotionListView`).
Results are ordered `priority, id` — the same order the engine applies them
in, so the page reads top to bottom the way a cart accumulates.

The storefront page is `app/pages/offers/index.vue` (cards in
`app/components/Offers/Card.vue`), gated by
`app/middleware/promotions-enabled.ts`, and its proxy
`server/api/promotions/index.get.ts` uses `useBackendFetch` (a raw `$fetch`
carries no `X-Forwarded-Host` and would resolve the public schema, giving
every tenant an empty list).

#### The product page panel

`GET /api/v1/promotion/product/{productId}`
(`promotion/views.py: ProductPromotionListView` →
`promotion/services.py: ProductPromotionService`) answers the narrower
question a shopper actually has: what is running **for this item**. Each row
carries a `relation` (`promotion/enum.py: ProductPromotionRelation`) saying
why it is relevant, because `target_scope` alone cannot express it:

| `relation` | Meaning |
|---|---|
| `PRODUCT` | The promotion names this product |
| `REWARD` | The shopper **receives** it — the FREE_GIFT gift, or a BXGY reward-pool item |
| `CATEGORY` | Its category is targeted (MPTT descendants included) |
| `ORDER` | Store-wide; true of every product |

Scope and exclusions are resolved with the same rules
`PromotionEngine._matching_items` uses at cart time — excluded products,
excluded categories (descendants included) and `exclude_discounted_products`
all suppress the buy-side claim — so an excluded product never advertises
the offer that skips it. The exclusions constrain what must be **bought**,
so they do not suppress a `REWARD` claim. `FREE_GIFT` mirrors
`_gift_entitlement` exactly (lowest-pk **active** gift product), so a
mis-configured promotion with two gifts never promises the one nobody would
receive.

Rows sort most-specific-first (`PRODUCT`, `REWARD`, `CATEGORY`, `ORDER`) and
are capped at `MAX_PRODUCT_OFFERS`. The panel is
`app/components/Product/Offers.vue`; it renders the specific relations open
and collapses the `ORDER` ones, because a store-wide offer is true of every
product and would otherwise bury the one line about the item in front of the
shopper.

#### The checkout coupon picker

`GET /api/v1/cart/coupons` (`cart/views/cart.py: list_coupons` →
`promotion/services.py: CouponPickerService`) lists the advertisable codes
**plus the personal coupons assigned to a signed-in customer** — the one
code a shopper is most likely to be holding is the one `/offers`
deliberately never shows them. Guests get only the public set: a guest cart
carries no verified identity to match against.

Every row carries the verdict `CouponService.apply` would give for the cart
as it stands:

| Field | Meaning |
|---|---|
| `eligible` | `apply` would accept the code |
| `reason` | ACP vocabulary when it would not; `null` otherwise |
| `discountAmount` | What applying it RIGHT NOW would take off |
| `freeShipping` | It would newly waive shipping |
| `applied` | It is the code already on the cart |

Two subtleties, both load-bearing:

- **`apply` raises on `COMBINATION_DISALLOWED` too.** A non-stackable coupon
  that loses the stacking comparison to the automatic offers is rejected by
  `_resolve_stacking`, and `CouponService.apply` raises on *any* rejection —
  so such a row must be `eligible: false`, not an enabled button that
  answers 400. (`blocking_rejections` excludes the same reason, but that is
  about aborting order creation, not about accepting a code.)
- **`discountAmount` is measured against the automatic offers alone**, not
  the cart's current total, because applying a coupon *replaces* the
  attached one (one coupon per cart in v1).

Cost: ONE `_collect_candidates` pass, then the pure stacking/clamp maths
re-run per candidate — not an `evaluate()` per code, which would have made
the checkout page pay ~15 queries for every code the store publishes.
`tests/unit/promotion/test_coupon_picker.py` pins both the apply-parity
contract and the query budget.

The storefront trigger and modal are
`app/components/Checkout/CouponPicker.vue`, mounted inside
`app/components/Checkout/CouponInput.vue` so the cart and checkout pages
both get it. The proxy `server/api/cart/coupons.get.ts` is deliberately
**uncached** and never SSR-rendered: every field except the offer copy
depends on the cart and the signed-in shopper.

`/offers` is indexable, so it also has an entry in
`server/plugins/sitemap-tenant-gate.ts: GATED_ROUTES` — plan flag
`promotionsEnabled` plus setting `PROMOTIONS_ENABLED`. Without that entry a
store with promotions off advertised a URL it then 404s. The other gated
storefront routes (`/gift-cards`, `/gift-cards/success`, `/feedback`) carry
`robots: false` and never reach a sitemap at all; removing that noindex from
one of them means adding it to this table.

### The on-offer flag: catalogue badge and search filter

The three surfaces above describe promotions. The catalogue asks a different,
per-product question: **is this product on offer right now?** One SQL
expression answers it, `promotion/offers.py: offer_kind_expression`, and gives
one of three values:

| `offerKind` | When |
|---|---|
| `MARKDOWN` | The product carries a product-level discount (`discount_percent > 0`). This value wins over `PROMOTION`. |
| `PROMOTION` | A live promotion covers the product (rules below), and promotions are enabled for the store. |
| `null` | Neither applies. |

The promotion branch is `covered_by_live_promotion`, built on
`live_offer_promotions`. It is stricter than `publicly_listable`, which it
builds on, because only some promotions put a price offer on a product:

- **AUTOMATIC only.** A code promotion offers nothing until the shopper types
  the code.
- **`target_scope` PRODUCTS or CATEGORIES.** Category scope includes the MPTT
  subtree, as in `PromotionEngine._matching_items`. ORDER scope is cart-level
  and never marks a product.
- **Every benefit type except FREE_SHIPPING.** Free shipping is a shipping
  perk, not a price offer.
- **Exclusions remove the product:** `excluded_products`, and
  `excluded_categories` with their subtrees. `exclude_discounted_products`
  needs no clause of its own, because a marked-down product is already
  `MARKDOWN`.
- **Only the products the shopper buys are marked.** The reward side of a
  BXGY or FREE_GIFT promotion is not.
- **Gated by `PromotionEngine.is_enabled()`** (plan flag and merchant
  setting). With promotions off, the cart grants nothing, so nothing is
  advertised.

Every surface reads this one expression, so the filter a shopper clicks and the
badge a card shows cannot disagree:

- **Product list and detail.** `offerKind` comes from the
  `ProductQuerySet.with_offer_kind()` annotation
  (`product/managers/product.py`), which `product/views/product.py` applies.
  `product/serializers/product.py` reads the annotation and nothing else.
- **Search index.** `ProductTranslation` indexes a filterable `on_offer`
  (`product/models/product.py`). The bulk queryset annotates it once per sync
  (`get_meilisearch_queryset`, `indexed_offer_kind`), and
  `search/views.py` filters on it when the request carries `onOffer=true`.
- **Search result cards.** `search/serializers.py` resolves `offer_kind` from
  the product.

#### Storefront

- **Filter.** The **On offer** filter
  (`app/components/Products/Filters/Availability.vue`) reaches the search
  endpoint through `app/components/Products/List.vue` →
  `server/api/products/search.get.ts`. The mega-menu's **On offer** button
  links to `/offers`, not to this filter.
- **Badge.** `app/components/Product/Card.vue` shows "−N%" for `MARKDOWN` and
  the translated "Offer" for `PROMOTION`. Sold out still takes precedence. A
  promotion has no single percentage to name, so it shows a word.
  `app/components/Search/Modal.vue` and `app/components/Product/Images.vue`
  (the product page gallery) apply the same rule, so a product badged in a
  listing is never bare on its own page.

#### Keeping the index in step

`on_offer` can go stale without any Product being saved: an admin edits a
promotion, a window opens or closes, or a usage limit is reached. Three
producers feed one coalescing queue in `promotion/offer_sync.py`.

**Signals** (`promotion/signals.py`) fire on:
- a promotion save or delete;
- its four scope M2M sets;
- a redemption that moves it across `usage_limit_total`.

What each signal records:
- A change that leaves the new scope readable records the **promotion id**,
  and its products are resolved later.
- A change that destroys the old scope (delete, `pre_remove`, `pre_clear`)
  records the **product ids** at once, while those rows still exist.

**The window sweep** is the beat entry `reindex-offer-window-changes`
(`settings.py`, every 5 minutes). It runs
`tenant.tasks.fanout_reindex_offer_window_changes` →
`reindex_window_changes`:
- It reindexes the products of every active promotion whose `starts_at` or
  `ends_at` fell inside `(cursor, now]`.
- The cursor (`promotion-offer:window-cursor`) moves only after dispatch.
  A crash repeats the window instead of skipping it.
- A missing cursor falls back to one day back. Reindexing is idempotent.

**Coalescing:**
- Marks are stored as per-schema cache sets, then committed.
- One `reindex_offer_products_task` runs `REINDEX_DELAY_SECONDS` (15 s) after
  the first mark and drains them all. An admin save that fires a dozen signals
  reindexes once.

Two changes are **not** covered:
- the reverse side of the M2M (`product.promotions.add`);
- the merchant's `PROMOTIONS_ENABLED` toggle.

The nightly full sync (`sync-meilisearch-indexes` →
`tenant.tasks.fanout_sync_meilisearch_indexes`) repairs both.

A deploy that changes the indexed fields needs a one-time
`meilisearch_sync_all_indexes --all-tenants --app product`, or `onOffer` filters
on documents that lack the field.

### Gift cards: a ledger, not a balance column

`giftcard/models.py` is explicit: balance is **always** derived by summing
`GiftCardTransaction.amount`, floored at zero. There is no cached balance
column to drift.

Ledger kinds are signed: `ISSUE`, `REFUND_CREDIT` and a positive `ADJUST`
add; `REDEEM`, `EXPIRE` and a negative `ADJUST` remove. The table is
append-only — corrections are new `ADJUST` rows, never edits.

Two partial unique constraints anchor idempotency:
`(gift_card, order)` for `REDEEM`, and the same pair for `REFUND_CREDIT`, so
a retried order-create cannot double-redeem and racing refund tasks cannot
double-credit.

A card is redeemable when it is `ACTIVE`, unexpired, and has a positive
balance. Expiry defaults to `GIFT_CARD_VALIDITY_DAYS` after issue (the field
help text notes the Greek five-year rule); empty means never.

### Redemption planning

`plan_redemption(codes, amount_due, lock=...)` computes how much the given
cards can settle, **smallest balance first** so near-empty cards drain, and
returns a `RedemptionPlan`. The same maths runs at payment-intent creation,
at order-create verification and at the actual redemption — parity or
`PaymentAmountMismatchError`.

Two refusals are worth knowing:

- A card whose balance currency differs from the order currency is **refused
  by code**, naming the card. There is no FX rate anywhere in the codebase,
  and silently treating a 100 USD card as 100 EUR extinguished more liability
  than instrument.
- Partial coverage is trimmed so the provider remainder is never a
  sub-minimum sliver below `MIN_PROVIDER_CHARGE`; the trimmed value stays on
  the card. The loop iterates because popping a fully-trimmed card changes
  the remainder again.

`record_plan` writes the negative `REDEEM` rows and mirrors the split into
`order.metadata["gift_cards"]`; `redeem` is plan-with-lock plus record in one
step.

### Purchase, delivery and refund

A storefront purchase is a `GiftCardPurchase`, deliberately **not** an
`Order` — orders drag stock, shipping, courier dispatch and the AADE
retail-receipt pipeline behind them, all wrong for a multi-purpose voucher.

`complete_purchase` is webhook-driven and idempotent through its status
guard. It flips the purchase to `PAID`, mints the card through `issue`,
queues the buyer's receipt, and queues delivery **only when there is no
`deliver_at` or it has already passed**.

Refunds go back to the source cards. `giftcard/signals.py` listens on
`order_refunded` and `order_canceled` and queues
`credit_refund_to_gift_cards`, passing the **actual refunded amount** —
crediting the full redemption for a partial refund would put money on the
card that was never returned. The provider refund only ever covers the
provider-charged remainder.

Three daily sweeps run, each reached through a per-tenant fanout wrapper
rather than scheduled directly — beat fires in the public schema, where the
gift-card tables are empty. The beat entries point at
`tenant.tasks.fanout_deliver_scheduled_gift_cards`,
`fanout_send_gift_card_expiry_reminders` and `fanout_expire_gift_cards`,
which dispatch `giftcard.tasks.deliver_scheduled_gift_cards`,
`send_gift_card_expiry_reminders` (each card warned exactly once via
`expiry_reminder_sent_at`; `GIFT_CARD_EXPIRY_REMINDER_DAYS` of 0 disables)
and `expire_gift_cards` per schema. Expiry runs at 03:00 Athens, the other
two at 06:00.

### The gates

Both features are two-tier and both service layers check the plan tier
themselves, not just at the endpoint. The reason is the same in both
docstrings: order create runs with **no permission classes** (it must serve
guest checkout), so an endpoint-only gate is bypassed entirely by the path
that matters.

| Feature | Plan flag | Runtime setting | Service check |
|---|---|---|---|
| Promotions | `Tenant.promotions_enabled` | `PROMOTIONS_ENABLED` (default off) | `PromotionEngine.is_enabled` |
| Gift cards | `Tenant.gift_cards_enabled` | `GIFT_CARDS_ENABLED` (default off) | `GiftCardService.is_enabled` |

Endpoints answer **404**, never 403: `PublicPromotionListView` chains
`IsPromotionsEnabled` and `IsPromotionsRuntimeEnabled`, and `GiftCardViewSet`
chains `IsGiftCardsEnabled`, adding `IsAuthenticated` on exactly one action,
`mine`. Everything else, including `purchase_status`, is `AllowAny` and
relies on a tight throttle instead.

On the storefront, `app/middleware/promotions-enabled.ts` and
`app/middleware/gift-cards-enabled.ts` apply the same two tiers. Both ship
the runtime default **off** and both fail **open** on a settings-endpoint
outage (`onError: true`) — an outage must not take the page down for stores
whose plan enables it, and Django still gates the data.

## Invariants

- **Preview and charge agree to the cent.** Every surface calls the same
  `evaluate`, and order create recomputes under a lock.
- **Money is never created.** The discount is clamped to the items total;
  a gift card's plan is clamped to the amount due and its balance.
- **The gift-card ledger is append-only.** Never update or delete a
  transaction; write an `ADJUST`.
- **One coupon per cart** in v1, enforced in `CouponService.apply`.
- **The on-offer badge and the on-offer filter agree.** Both read
  `offer_kind_expression`; never compute "on offer" anywhere else.
- **Free shipping always combines**; `stackable` does not apply to it.
- **Non-monetary applications still write redemption rows**, or their usage
  limits count nothing.
- **A wholesale cart does not stack retail promotions** unless
  `B2B_ALLOW_PROMOTIONS` is on — see [B2B](/dev/flows/b2b).
- **Gift cards reduce what the provider is charged, not the taxable order
  value.** The card sale itself is never submitted to myDATA.
- **A disabled feature 404s.** Both tiers, both services, both storefront
  middlewares.

## Failure modes

- **The offers page is stale after editing a promotion.** The `promotions`
  cache surface in `core/cache/surfaces.py` declares **no `invalidated_by` at
  all**, so it takes the `CacheSurface` default of an empty tuple. Signal
  wiring in `core/cache/invalidation.py` only ever connects the models a
  surface lists, so no signal, admin hook or save purges it. The signals in
  `promotion/signals.py` only queue the search index's `on_offer` reindex
  (see [Keeping the index in step](#keeping-the-index-in-step)), and nothing
  under `promotion/` calls `CacheService.purge`.
  Its `django_patterns` is
  also empty, because both promotion views are plain `APIView`s with no
  response cache; the entries that exist are the Nuxt `PublicPromotionList`
  and `ProductPromotionList` handlers and the rendered `/offers` **and
  `/products`** routes. `/products` is in the `promotions` surface, not only
  in `products`, because the product page now renders the offers that apply
  to it — a scope edit otherwise leaves every product page advertising the
  old one for the whole SWR window. **Purging is a manual operator action**
  after any promotion, code, scope or schedule edit. Contrast the
  `recommendations` surface, which lists four models in `invalidated_by`.
- **An admin-issued gift card is never emailed.** `giftcard/admin.py:
  save_model` routes a new card through `GiftCardService.issue`, which mints
  the code and the `ISSUE` row and sends nothing. `deliver_scheduled_gift_cards`
  only picks up cards with a **non-null** `deliver_at` in the past, so a card
  issued with the field blank is never swept either. The two ways it reaches
  the recipient are the admin's **Resend delivery email** detail action (which
  clears `delivered_at` and dispatches `deliver_gift_card_email`) and setting
  a `deliver_at` so the sweep finds it. Purchased cards are unaffected —
  `complete_purchase` dispatches delivery itself.
- **The demo store's published gift card refills every night.** Visitors
  may spend `DEMO-GIFT-25` (`devtools/demo_account.py: GIFT_CARD_CODE`), and
  the nightly `reset_demo_account` returns it to its issued value with one
  `ADJUST` row for the difference from the raw ledger sum, then sets it
  active with a fresh validity window (`_restore_gift_card`). The spends stay
  on its history, their guest orders `SET_NULL`. Demo tenants only, and no
  other card is touched.
- **A coupon silently does nothing.** Check `is_active` on both the code and
  the promotion, `is_live` (the schedule window), the assignment fields for a
  personal coupon, and then stacking — a code that lost to a better automatic
  promotion is reported as `combination_disallowed` and is deliberately
  non-blocking.
- **Payment amount mismatch at order create.** Something repriced between the
  intent and the order: a promotion's window closed, a usage limit filled, a
  gift card was spent elsewhere, or a wholesale binding changed. The locked
  recomputation is right and the intent is stale.
- **A partial refund credits the whole redemption.** Only if the `amount`
  kwarg is dropped on the way to `_queue_refund_credit`; the `order_refunded`
  contract treats an absent amount as a **full** refund.
- **A gift card in the wrong currency blocks checkout.** By design — the
  error names the card. There is no conversion path.

## Related

- [Checkout and payment](/dev/flows/checkout-and-payment)
- [Order lifecycle](/dev/flows/order-lifecycle)
- [B2B](/dev/flows/b2b)
- [Loyalty](/dev/flows/loyalty)
- [Caches and purging](/dev/operations/caches)

## Source

| File | Role |
|---|---|
| `grooveshop-django-api/promotion/models/promotion.py` | `Promotion`, conditions, `clean()`, `is_live` |
| `grooveshop-django-api/promotion/models/code.py` | `PromotionCode`, assignment, usage limit |
| `grooveshop-django-api/promotion/models/cart_code.py` | `CartPromotionCode`, one-per-cart in v1 |
| `grooveshop-django-api/promotion/models/redemption.py` | `PromotionRedemption`, the usage ledger |
| `grooveshop-django-api/promotion/enum.py` | Trigger, benefit, scope, rejection vocabulary |
| `grooveshop-django-api/promotion/managers/promotion.py` | `publicly_listable`, `publishable_code_q` — the ONE advertisability rule |
| `grooveshop-django-api/promotion/services.py` | `PromotionEngine`, `CouponService`, `ProductPromotionService`, `CouponPickerService` |
| `grooveshop-django-api/promotion/offers.py` | `offer_kind_expression`, `live_offer_promotions`, `scope_product_ids` — the ONE on-offer rule |
| `grooveshop-django-api/promotion/offer_sync.py` | Coalesced `on_offer` reindex queue and the window sweep |
| `grooveshop-django-api/promotion/signals.py` | Promotion, scope and usage-limit changes that queue the reindex |
| `grooveshop-django-api/promotion/tasks.py` | `reindex_offer_products_task`, `reindex_offer_window_changes_task` |
| `grooveshop-django-api/product/managers/product.py` | `ProductQuerySet.with_offer_kind()` |
| `grooveshop-django-api/product/models/product.py` | `Product.offer_kind`, the indexed `on_offer` field, `get_meilisearch_queryset` |
| `grooveshop-django-api/search/views.py` | The `onOffer` search filter |
| `grooveshop-django-api/promotion/views.py` | `PublicPromotionListView`, `ProductPromotionListView`, and their two gates |
| `grooveshop-django-api/cart/views/cart.py` | `apply_coupon`, `remove_coupon`, `list_coupons`, payment-intent evaluation |
| `grooveshop-django-api/order/services.py` | Locked evaluation, `record`, `clear_after_order` |
| `grooveshop-django-api/giftcard/models.py` | `GiftCard`, `GiftCardTransaction`, `GiftCardPurchase` |
| `grooveshop-django-api/giftcard/services.py` | Issue, plan, record, refund credit, expiry |
| `grooveshop-django-api/giftcard/signals.py` | Refund and cancel credit-back |
| `grooveshop-django-api/giftcard/tasks.py` | Delivery, receipts, reminders, expiry, refund credit |
| `grooveshop-django-api/giftcard/admin.py` | `save_model` issuing, Resend delivery action |
| `grooveshop-django-api/giftcard/views.py` | `check`, `purchase`, `purchase_status`, `mine` |
| `grooveshop-django-api/core/cache/surfaces.py` | The `promotions` surface, which declares no `invalidated_by` |
| `grooveshop-django-api/tenant/permissions.py` | The plan and runtime permission classes |
| `grooveshop-storefront-ui-node-nuxt/app/pages/offers/index.vue` | The offers page |
| `grooveshop-storefront-ui-node-nuxt/app/components/Offers/Card.vue` | One offer card |
| `grooveshop-storefront-ui-node-nuxt/app/composables/usePromotionOffer.ts` | Headline, conditions, expiry, rejection copy — shared by all three surfaces |
| `grooveshop-storefront-ui-node-nuxt/app/components/Product/Offers.vue` | The product page's offer panel |
| `grooveshop-storefront-ui-node-nuxt/app/components/Checkout/CouponPicker.vue` | The checkout coupon picker |
| `grooveshop-storefront-ui-node-nuxt/app/components/Product/Card.vue` | The `offerKind` badge |
| `grooveshop-storefront-ui-node-nuxt/app/components/Products/Filters/Availability.vue` | The **On offer** filter |
| `grooveshop-storefront-ui-node-nuxt/app/middleware/promotions-enabled.ts` | Two-tier route gate |
| `grooveshop-storefront-ui-node-nuxt/app/middleware/gift-cards-enabled.ts` | Two-tier route gate |
| `grooveshop-storefront-ui-node-nuxt/server/api/promotions/index.get.ts` | Cached offers proxy |
| `grooveshop-storefront-ui-node-nuxt/server/api/promotions/product/[productId].get.ts` | Cached per-product offers proxy |
| `grooveshop-storefront-ui-node-nuxt/server/api/cart/coupons.get.ts` | Coupon picker proxy — deliberately uncached |
| `grooveshop-storefront-ui-node-nuxt/server/api/giftcard/` | Check, purchase, status, mine |
| `grooveshop-storefront-ui-node-nuxt/server/plugins/sitemap-tenant-gate.ts` | `/offers` sitemap gating |
