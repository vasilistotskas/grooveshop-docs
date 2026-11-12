---
title: Storefront rendering contracts
description: "How the storefront draws what depends on the visitor while its pages are cached anonymously: the session after hydration, the favourites hearts, cache keys of list routes, and the phone-target source rules."
---

# Storefront rendering contracts

The storefront serves most pages from Nitro's cache, rendered once without a
visitor and replayed to everyone (see [Caches and purging](/dev/operations/caches),
layer 3). Anything that depends on who is looking therefore has to appear
**after** the browser has mounted, as a patch over the HTML it was sent. A
component that draws the signed-in state in its first client render hydrates over
anonymous markup, and Vue does not repair that mismatch in production. This page
holds the rules that keep it so, each tied to the file that implements it and the
source rule that checks it.

## The anonymous-render contract

`shared/constants/prerender.ts` states it: while a render is being stored
(`event.context.cache`), `app/plugins/setup.ts` skips the session, account and
cart, and nuxt-auth-utils skips its session fetch, so the cached HTML and payload
are anonymous by construction. The session reaches the client once the app has
resolved.

## The session after hydration

`useSessionAfterHydration()` (`app/composables/useSessionAfterHydration.ts`)
returns `loggedIn` and `user` that stay the guest's (`false`, `null`) until the
component has mounted (`useMounted`), so the first render equals the server's and
the signed-in parts appear right after. Use it, not `useUserSession()`, for
anything that changes what a lazily hydrated component draws. A handler that runs
on a click may read either.

It holds for what the component renders itself, not for a `Lazy*` child. A
`Lazy*` element is an async component: it hydrates after its parent has mounted,
when the session is already the reader's. So a `Lazy*` element may name the
session **only in its own `v-if` / `v-else-if`**: false on the first render, the
element is created after mount and never hydrated. A state that follows the
session is two such elements, not one whose props follow it.

The article's comments block is the example. `app/components/Blog/Post/Comments/index.vue`
draws `<LazyEmptyState v-if="showEmptyState && !loggedIn">` for the guest and a
second `<LazyEmptyState>` for the signed-in reader, instead of one whose text
follows the session. The comment list is derived from the request's data plus the
pages it moved on from (`app/composables/useBlogPostComments.ts`), not copied from a
watcher, which a server render never runs again, so the comments and their count
are in the server HTML (`test/e2e/blogComments.ts` finds them on a real server in
both designs). `useBlogCommentList` (`app/composables/useBlogCommentList.ts`) puts
the reader's own comments first and marks them as theirs only after mount, by a
stable partition.

`test/unit/source-rules/session-after-hydration.spec.ts` holds this for every
user of the accessor, directly or through a composable that calls it: the session
names (`loggedIn`, `user`, under whatever alias) may appear on a `Lazy*` element
only in its own `v-if` / `v-else-if`.

## Cache keys of list routes

A cached list route's key is built from every parameter the handler forwards to
Django, by `queryCacheKey(event, schema)` (`server/utils/queryCacheKey.ts`): it
reads the route's own validated query schema, in the schema's order, so the key
does not depend on the order a caller wrote them in, a parameter that is
forwarded is always in it, and one that is dropped never is. A filter Django adds
is keyed the day the schema is regenerated. Use it as
``tenantCacheKey(event, `name:${queryCacheKey(event, schema)}`)``.

Before it, a post's comments were cached under a key built from parameters the
route drops (cursor, pagination type, language) and without the one it forwards
(`page`), so page 2 was answered from page 1's entry and "load more" loaded
nothing. The routes that use it:

- `server/api/blog/authors/index.get.ts`, `blog/categories/index.get.ts`,
  `blog/comments/index.get.ts`, `blog/posts/index.get.ts`,
  `blog/posts/[id]/comments.get.ts`, `blog/tags/index.get.ts`
- `server/api/content-pages/index.get.ts`, `countries/index.get.ts`,
  `regions/index.get.ts`

A spec holds every one of them to the rule, and an end-to-end spec reads page 2 of
a post's comments on a real server.

## Favourites hearts

Every product heart, in both designs, shows the signed-in shopper's favourite
without its caller asking, because the pages are cached anonymously. The files:
`app/composables/useProductFavouriteToggle.ts` (the heart's behaviour),
`app/stores/user.ts` (the lookups and their bookkeeping),
`app/components/Button/Product/AddToFavourite.vue` and
`app/components/variants/webside/Button/Product/AddToFavourite.vue` (the drawing),
`app/plugins/auth.ts`, and `FAVOURITES_LOOKUP_MAX_IDS`, `FAVOURITE_ID_UNKNOWN` in
`shared/constants/index.ts`.

- **One batched lookup.** Each heart registers its product when it mounts
  (`lookUpFavourites`). The user store collects the registrations of one tick
  (`queueMicrotask`) and sends them as one `POST
  products/favourites/favourites-by-products`, deduplicated and split at
  `FAVOURITES_LOOKUP_MAX_IDS` (100, the Django view's limit). A product is asked
  about once a session (`known`); a failed lookup is forgotten so the next heart
  asks again. It runs only in the browser, signed in, with the favourites feature
  on. The listing's and the product page's own lookups are gone.
- **A heart draws the guest's state until mounted.** It draws `drawnFavouriteId`
  from the shared toggle: none until the heart has mounted, the store's after. A
  heart that hydrates after another one asked (a section hydrated on scroll) would
  otherwise draw the store's answer over the anonymous HTML. The icon, colour,
  title and `aria-pressed` all follow it. The default design's hearts are inside
  `<ClientOnly>` and never hydrate.
- **A click waits for the session.** On a cached page the session reaches the
  client after the page has resolved, and a heart can be clicked first. The click
  waits for it (the heart shows it is busy) and then decides, so a signed-in
  shopper is never told to sign in.
- **The server already settled it.** `already_favourited` on an add means the
  product is a favourite whose id is not known yet: `FAVOURITE_ID_UNKNOWN`, the
  heart is pressed, no further request. A removal of an unknown id asks the server
  for it first (`resolveFavouriteId`), then deletes; a 404 on a removal means it
  is already gone. The shopper gets the toast of the change they wanted, not an
  error. The heart always says its favourite went, so the favourites page drops
  the card.
- **Answers land only in the session and question that asked.** The store counts
  its account resets (`session`), and a lookup's answer, a click's answer and the
  favourites list write nothing into a session that did not ask. Each product
  remembers the lookup that last asked about it (`latestLookup`) and only that
  lookup's answer is kept, so an older answer arriving last cannot overwrite a
  newer one; a click made while a lookup was out wins over its answer.
- **The account state follows the session's user.** `app/plugins/auth.ts` resets
  it (`clearAccountState`) when the session's user turns into another user, since
  a tab that missed another tab's sign-out takes the next shopper's session from an
  allauth answer with no sign-out event.
- The heart keeps one accessible name in both states, `Favourite: <product>`, and
  says its state in `aria-pressed`.

## One newsletter form a page

A page that draws the newsletter section (`PageSection/NewsletterSignup.vue`)
shows no footer form, in both designs; every other page keeps the footer's. It is
decided by the server's HTML and one CSS rule, not by component state:

- The section marks its band `data-newsletter-section`, and only when it is
  drawn (`available`: the feature on, the form available), so a section that
  draws nothing marks nothing.
- Every footer form carries `data-footer-newsletter`: the default design's
  `Chrome/FooterNewsletter.vue`, webside's `Footer/Newsletter.vue` and the phone
  wrapper in webside's `Chrome/Footer.vue` (which holds the lazily hydrated form).
- One rule in `app/assets/css/main.css` joins them:
  `:root:has([data-newsletter-section]) [data-footer-newsletter] { display: none; }`.

Why not component state. On the server the footer's async setup runs alongside
the page body's, so the footer cannot know which sections the page draws before it
renders; a state shared between them would be set too late for the footer's own
server render. With the rule, the first paint has one form, nothing moves after
hydration, and the server and client markup are the same, so there is no
hydration mismatch. A browser without `:has()` shows both forms, as before.
`test/unit/source-rules/one-newsletter-form.spec.ts` keeps the marker, the three
footer attributes and the rule together.

## Phone-target source rules

happy-dom lays nothing out, so the classes that size a control are the contract,
checked by two source rules. A control in the flow takes its real size below `sm`
(`max-sm:min-h-11`, with `max-sm:min-w-11` when it is an icon alone); a control
floating over a picture keeps its size and takes a 44px hit area from an `::after`
that no `overflow-hidden` ancestor clips.

- `test/unit/source-rules/product-page-targets.spec.ts`: the product page and
  gallery of both designs (`Storefront/ProductDetail.vue`,
  `variants/webside/Storefront/ProductDetail.vue`, `Product/Images.vue` and
  its webside twin).
- `test/unit/source-rules/default-design-phone-targets.spec.ts`: the default
  design's shared chrome and cards, and webside's cart line, which the first rule
  does not reach: `Product/Card.vue`, `Chrome/MobileMenu.vue`, `Chrome/Navbar.vue`,
  `Chrome/Footer.vue`, `Language/Switcher.vue`, `Search/Input.vue`, the listing's
  toolbar, category chips, active filters and pagination, `Cart/Drawer.vue`,
  `Cart/ItemCard.vue`, `Quantity/Selector.vue`, and webside's `Cart/ItemCard.vue`,
  `Quantity/Selector.vue` and `Chrome/CheckoutHeader.vue`. It also holds the
  layout choices that make 44px fit a 320px screen: the footer's link rows 44px
  apart with no gap, the pagination wrapping instead of overflowing, the cart
  line's stepper giving way before its 44px remove button, and the checkout
  header's side columns shrinking.

## Source

| File | What |
|---|---|
| `grooveshop-storefront-ui-node-nuxt/shared/constants/prerender.ts` | The anonymous-render contract |
| `grooveshop-storefront-ui-node-nuxt/app/composables/useSessionAfterHydration.ts` | The session as the first render may draw it |
| `grooveshop-storefront-ui-node-nuxt/app/components/Blog/Post/Comments/index.vue`, `app/composables/useBlogPostComments.ts`, `app/composables/useBlogCommentList.ts` | The comments block |
| `grooveshop-storefront-ui-node-nuxt/test/unit/source-rules/session-after-hydration.spec.ts` | Source rule: a `Lazy*` element names the session only in its own `v-if` |
| `grooveshop-storefront-ui-node-nuxt/server/utils/queryCacheKey.ts` | `queryCacheKey` |
| `grooveshop-storefront-ui-node-nuxt/app/composables/useProductFavouriteToggle.ts`, `app/stores/user.ts`, `app/plugins/auth.ts`, `shared/constants/index.ts` | The favourites hearts |
| `grooveshop-storefront-ui-node-nuxt/app/components/PageSection/NewsletterSignup.vue`, `app/components/Chrome/FooterNewsletter.vue`, `app/components/variants/webside/Footer/Newsletter.vue`, `app/components/variants/webside/Chrome/Footer.vue`, `app/assets/css/main.css`, `test/unit/source-rules/one-newsletter-form.spec.ts` | The one-newsletter-form rule |
| `grooveshop-storefront-ui-node-nuxt/test/unit/source-rules/product-page-targets.spec.ts`, `test/unit/source-rules/default-design-phone-targets.spec.ts` | Source rules for 44px targets |
