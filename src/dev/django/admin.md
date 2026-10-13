---
title: Admin (Unfold)
description: The two Unfold admin sites, BaseModelAdmin and the guarantees its tests enforce (filters, foreign keys, query growth, templates, inlines), withholding, actions and dialogs, datasets, JSON Schema fields, the dashboards, the per-request store sidebar and site menu, the ⌘K command palette, the header and footer, and how to add an admin section.
---

# Admin (Unfold)

The admin is django-unfold on top of Django's admin, and there are two of
them. The store admin (`admin.site`, class `MyAdminSite`) serves merchants
on their own tenant host and reads tenant-schema tables. The control-plane
admin (`platform_admin_site`, class `PlatformAdminSite`) serves platform
superusers on the platform host and reads only public-schema tables. They
share `BaseModelAdmin` and most `ModelAdmin` classes; they do not share
URLs, dashboards, sidebars or settings blocks.

## Two AdminSites

| | Store admin | Platform admin |
|---|---|---|
| Class | `admin/admin.py: MyAdminSite` | `admin/platform_site.py: PlatformAdminSite` |
| Instance name | `admin` | `platform_admin` |
| Mounted by | `core/urls.py` (`ROOT_URLCONF`, locale-prefixed `admin/`) | `tenant/urls_public.py` (`PUBLIC_SCHEMA_URLCONF`, bare `admin/`) |
| Unfold settings | `UNFOLD` in `settings.py` | `UNFOLD_PLATFORM` (`settings_name = "UNFOLD_PLATFORM"`) |
| Dashboard | `admin/index.html`, widgets in `admin/dashboard/store/` | `admin/platform_index.html`, widgets in `admin/dashboard/platform.py` |
| Who passes `has_permission` | a platform-staff session with an active staff-capable `UserTenantMembership` in the current tenant, or a superuser | a platform-staff session that is a superuser |

Both sites use `PlatformAdminAuthenticationForm`, so credentials are always
checked against the public schema's user table. `MyAdminSite.has_permission`
first requires `is_platform_staff_session(request)` (the provenance stamp
from `tenant/auth_backends.py`) and then a membership; `is_staff` alone
never opens a store's admin. `PlatformAdminSite.has_permission` requires
`is_superuser` because the control-plane dashboard renders every store's
name, domain, plan and order count. The membership is read once per
request: `tenant.membership.get_membership` remembers its answer on the
user object, keyed by tenant.

`register_platform_models()` (`admin/platform_site.py`), called from
`MyAdminConfig.ready()` in `admin/apps.py`, mirrors the control-plane
models onto the platform site after autodiscovery. The store site is not
mounted on the public host at all
(`tests/unit/tenant/test_platform_host_serves_only_the_platform_admin.py`).

Branding comes from `admin/branding.py`: a store shows its own logo and
favicon, and only the platform's own storefront falls back to the platform
assets; any other store without a logo shows Unfold's symbol and its name.

### urlconf pinning

Under django-tenants a request resolves against one urlconf, so a
`reverse_lazy` without an explicit `urlconf` can only be cast on the host
that registers its namespace. Every link left in the two settings blocks
(the platform sidebar and the `TABS` strips) is pinned
(`reverse_lazy(..., urlconf=ROOT_URLCONF)` or
`urlconf=PUBLIC_SCHEMA_URLCONF`), and
`tests/unit/core/test_unfold_links_resolve.py` casts every one under both
urlconfs. The store sidebar is not in settings: it is built per request
on the store host (below), so its plain `reverse()` calls always resolve
against the urlconf serving them.

## `BaseModelAdmin` (`admin/base.py`)

Every first-party admin extends `BaseModelAdmin` (or
`BaseTranslatableAdmin` / `BaseTranslatableTabularInline` for parler
models); `tests/unit/admin/test_actions_declare_permissions.py` fails for
one that does not. It sets the shared defaults once — `compressed_fields`,
`warn_unsaved_form`, `list_fullwidth`, `list_filter_submit`,
`list_filter_sheet`, `save_on_top`, `list_per_page = 25` — and:

- **Action permissions.** `__init_subclass__` stamps
  `allowed_permissions = ["change"]` on any action that declares none,
  because Django and Unfold both fail open on an undeclared action. An
  inherited action (a mixin's) gets its own wrapper on the inheriting
  class, so one subclass cannot set the policy for every other. A
  read-only action says `permissions=["view"]` (the CSV/XML export
  actions do).
- **One kind of list filter.** `get_list_filter` turns every plain field
  name into its Unfold filter (`unfold_filter_for`: choices → dropdown,
  boolean → radio, date/datetime → range, relation → related dropdown,
  anything else → all-values checkboxes). Django's own filters are links
  that apply on click; in a sheet with `list_filter_submit` they
  navigated away and dropped every selection not yet applied.
- **JSON Schema fields.** `formfield_for_dbfield` gives a `JSONField`
  whose validators include a `core.json_schema.JSONSchemaValidator`
  Unfold's schema editor — see below.
- **HTML fields.** `formfield_overrides` maps `tinymce.models.HTMLField`
  to TinyMCE; without it Unfold's `TextField` override wins the MRO walk.

Shared helpers: `admin/displays.py` (`money`, `format_dt`,
`relative_time` — all locale-aware; `header_two_line` for
`@display(header=True)` rows, with `contained=True` for logos and flags;
`change_link`, which reverses on the serving site's namespace;
`link_cell` / `label_cell` for Unfold's escaping table component),
`admin/filters.py` (`AnnotatedRangeFilter`, which annotates only when a
bound is set, and `LikesCountFilter`), `admin/datasets.py`.

### Guarantees the tests enforce

| Test | Fails when |
|---|---|
| `tests/unit/admin/test_changelist_query_growth.py` | any changelist runs more queries for 6 rows than for 2 (an N+1) |
| `tests/unit/admin/test_large_foreign_keys.py` | a writable form renders a plain select over users, products, orders, order items, carts, posts or gift cards |
| `tests/unit/admin/test_list_filters.py` | a filter in any sheet is not an Unfold filter |
| `tests/unit/admin/test_inlines_are_unfold.py` | a first-party inline is Django's own |
| `tests/unit/admin/test_ui_guards.py` | an admin module or template carries inline styles, `<style>`, raw gray tokens, hand-rolled pills, hex colours or emoji |

## Withholding on a tenant host

`WithheldOnTenantHostModelAdmin` (`admin/mixins.py`), a base of
`BaseModelAdmin`, refuses on a store host every model whose app label is
in `tenant/app_labels.py: shared_only_app_labels()` — in `SHARED_APPS`,
not in `TENANT_APPS` — so a store never sees the platform's rows dressed
as its own. It overrides `has_module_permission` and the four object
permissions; `has_module_permission` returning `False` drops the model
from the app list and turns the typed URL into a 403.

Exceptions:

- `tenant` (`STORE_SELF_SERVICE_APP_LABELS`): `TenantAdmin` scopes an
  operator to their own row and allowlists
  `role_scopes.TENANT_SELF_EDITABLE_FIELDS`.
- `country` and `region` (`role_scopes.REFERENCE_DATA_APP_LABELS`):
  reference data a store's forms pick from. They stay out of the store
  sidebar and are never editable there, but view is allowed, and every
  store role is granted `view` on them, so the country and region
  autocompletes answer on a store host.

`tests/integration/admin/test_tenant_host_model_visibility.py` walks the
live registry to confirm both.

## Actions

Unfold registers `actions_row`, `actions_list` and `actions_detail` as URL
patterns and does not turn `None` into a response, so every URL-backed
action returns one on every path
(`tests/unit/shipping_acs/test_admin_action_responses.py` checks by `ast`).
An action over the whole table (ACS COD reconciliation, BoxNow locker
sync) is an `actions_list` button, not a row action.

**Dialogs.** `@action(dialog=ActionDialog(title=..., form_class=...))`
opens an Unfold dialog; the decorator builds the form from `request.POST`
and calls the body as `func(request, form, object_id=...)` only once it
validates, and the body answers with an `HX-Redirect`. Drive them in tests
with a real POST including `_form_submitted`. Custom permissions are
`permissions=["change", "adjust_loyalty_points"]` plus a
`has_adjust_loyalty_points_permission` method; the decorator enforces them
on the URL too. Dialogs exist for list, row, detail and submit-line
actions only — a bulk action over a selection
(`apply_custom_discount`, `destroy_tenants`) keeps Django's intermediate
page, built from Unfold components.

## Change forms

- **Tabs.** Long forms are fieldset tabs; Unfold gives each tabbed
  fieldset its own tab and the bar does not wrap, so `TenantAdmin` groups
  its fields into eight.
- **Summary header.** `OrderAdmin` renders status, payment, total,
  customer, shipment and invoice above its tabs
  (`change_form_before_template = "admin/order/order_summary.html"`,
  context from `render_change_form`).
- **Datasets.** A related list that grows without bound is a dataset,
  not an inline (an inline's `max_num` caps new rows, not shown ones):
  `admin/datasets.py: RelatedDatasetAdmin` pages the rows belonging to
  the change form's object and shows nothing without view permission.
  Used for a product's stock activity, a customer's orders and a gift
  card's ledger.
- **Inlines** are Unfold's, tabbed; non-sortable ones page with
  `per_page`. A sortable inline stays whole, since a page break would
  split its drag-and-drop order.
- **Large foreign keys** are `autocomplete_fields`, or read-only.

## JSON Schema fields

A structured `JSONField` names its schema with
`validators=[JSONSchemaValidator("app.json_schemas.name")]`
(`core/json_schema.py`). The path points at a function returning a Draft
2020-12 schema, so migrations record the path, not a copy, and a schema
built from runtime data (the storefront locales, strategy codes) is built
when used. The one schema validates writes (`full_clean`, the admin form,
DRF serializers, which copy model validators) and drives Unfold's editor.
Errors name the offending entry (`colors.primaryScale.500: ...`).

Schemas are self-contained, with no `$ref`: Unfold creates its editor
without a reference resolver. Fields covered: `Tenant.theme_metadata`,
`available_locales`, `allowed_csp_sources` (`tenant/json_schemas.py`),
`RecommendationSlot.strategy_chain` and `weights`
(`recommendation/json_schemas.py`).

Page sections are the dynamic case: a section's schema depends on its
`component_type`, so `page_config/section_schemas.py` holds one schema per
type (props, plus the derived per-locale `i18n` override), validated in
`PageSection.clean()` and the serializer, and `PageSectionForm` swaps in
the type's editor for a saved section. See
[OpenAPI contract](/dev/django/openapi-contract) for how they are
published to the storefront.

## Dashboards

Both dashboards are Unfold component widgets
(`admin/dashboard/base.py: DashboardWidget`); the page templates are
layouts of `{% component ... with component_class="..." %}` tags, and
`DASHBOARD_CALLBACK` is not used. A widget's figures come from a
`@dashboard_query` (`admin/dashboard/cache.py`):

```python
@dashboard_query(
    "store:overview:v1",
    ttl=300,
    depends_on=("order.Order",),
    variants=PERIOD_KEYS,
)
def overview(key: str) -> dict[str, Any]: ...
```

Each query caches one language-neutral payload per tenant (`per_language=True`
where it carries translated names; one key per entry of `variants`, so a
request computes only the window it shows) and is deleted on commit of any
save or delete of a model it `depends_on`, every variant at once.
`UserAccount` is never a dependency — every login saves it. Widgets build
their labels, colours (theme tokens, never hex) and chart JSON per request.

The store dashboard (`admin/dashboard/store/widgets.py`, laid out by
`core/templates/admin/index.html`) shows one period at a time, picked by
`?period=` (`7d`, `30d` default, `13w`, `12m`: `queries.PERIODS`, whole
calendar buckets ending with the current one, compared with the span of
equal length before), and its sales chart one measure, picked by
`?metric=` (`revenue` default, `orders`). Both are links, not script, so
the address can be shared. A widget for a feature `admin.features` reports
absent or switched off is not drawn, and a link is drawn only when
`admin.navigation.changelist_link` says the viewer may open it.
`queries.attention_counts` (60 s, cleared by orders, receipts, products,
reviews, blog comments, contact messages and business profiles) feeds both
the **Needs attention** card and the sidebar badges, read once per request.
Receipts myDATA rejected are a card row only, gated on
`StoreFeatures.mydata` (`MYDATA_ENABLED`); no sidebar entry carries them.
The row counts every `Invoice` whose `mydata_status` is `REJECTED`, with
no time window: the status is terminal until the receipt is corrected and
resent or cancelled, either of which changes it, so an old rejection must
not drop off the card unhandled. **New messages** counts a rolling window
(`NEW_MESSAGES_DAYS`) and links its changelist with the same cutoff
(`created_at__gte`), so the list it opens holds exactly what it counted.
`StoreAlerts._mydata` keeps only the superuser-facing configuration alerts
(missing credentials, sandbox environment).
`StoreKpis` renders **Average order** as "—" with no trend when the period
has no paid orders.

The platform dashboard reads `tenant.TenantStatsSnapshot`, refreshed every
30 minutes by `tenant.tasks.fanout_refresh_stats_snapshots`, instead of
switching into every store's schema per request.

## Sidebar and site menu

`UNFOLD["SIDEBAR"]["navigation"]` is the callable
`admin.navigation.store_sidebar`, which Unfold calls with the request on
every store-admin page. Every entry is decided there:

- a model page is listed only when its `ModelAdmin` would open for this
  user (`changelist_link`: `has_module_permission` and
  `has_view_or_change_permission`), so a role never sees a link that
  answers 403;
- an optional feature follows `admin/features.py: StoreFeatures`, read
  once per request. A plan-gated feature (loyalty, promotions, gift
  cards, B2B, recommendations) is an `Availability`: `UNAVAILABLE` when
  the `Tenant` plan flag is off (`tenant_plan_allows`) hides it,
  `SETTING_OFF` keeps its setup pages with an "Off" badge and drops its
  counters, `LIVE` shows everything. Each switch is read through the code
  that enforces it for shoppers (the service's `is_enabled()`, the
  permission classes' flag and setting names). The blog follows its plan
  flag only; reviews, feedback, favourites, newsletter and blog comments
  follow their setting (`StoreFeatures.absent_models`, which `page()`
  drops and the ⌘K palette also reads); a carrier's pages follow its
  active `ShippingProvider`;
- a sub-menu (`_menu`) left with one child is replaced by that child;
- badges count waiting work only, from `queries.attention_counts`.

The titles there are what the admin guide names as `Sales → Orders`; the
Greek guide uses their `locale/el` translations.
`tests/integration/admin/test_store_navigation.py` covers the plan and
setting states, the roles, the badges, and that every registered store
page is reachable from the sidebar or a tab strip, or is named in the test
with the reason it is not (`test_every_store_page_is_reachable`).

The platform sidebar stays a static list in `UNFOLD_PLATFORM`; groups
there may carry a `permission` dotted path, and `admin/permissions.py`
provides `is_superuser` and `platform_environment` (the control-plane
badge).

`SITE_DROPDOWN` on both sites is `admin.navigation.ops_site_dropdown`,
built per request because Unfold renders dropdown items unchecked:
`ADMIN_OPS_LINKS` (Flower, Mailpit, Meilisearch, RabbitMQ, each only
when its `ADMIN_*_URL` is set) for platform superusers, nothing for
anyone else. The store tools it used to hold are sidebar entries in the
store's **Settings** group: Email Templates for `order.view_order`,
Translations (Rosetta) where `core.rosetta_access.tenant_scoped_rosetta_access`
allows it, Cache for `core.purge_cache` holders (store ADMIN and OWNER;
STAFF may not change store settings).

## Command palette

Both sites answer ⌘K through `admin/search.py: CommandSearchMixin`, which
overrides Unfold's `search` view and renders Unfold's own
`command_results.html`, so only what is found changes. Unfold's version
matched the term against app names as well as model names (typing
"orders" listed every model of the `order` app before the Orders page),
compared accents exactly, offered the screens of features a store does
not have, read every match of every model unbounded, and cached results.
In order:

1. **Sidebar pages**, from `get_sidebar_list` (the same per-request menu,
   permissions applied), compared through `fold()` (casefold, accents
   stripped) and ranked: exact title, title prefix, word prefix, anywhere,
   then every page of a section or sub-menu whose name matches.
2. **Other screens** the viewer can open (Django's app list), by their own
   name only.
3. **Records**, for terms of at least `MIN_RECORD_TERM` characters: up to
   `RECORDS_PER_MODEL` per model through that model's own admin
   `get_search_results` and ordering, the sidebar's models first, plus a
   "View all" result linking the changelist with `?q=` when there are more.

`sidebar_icons(sidebar)` maps every page the sidebar lists (its address
without a query, in sidebar order) to its icon; it orders the records and
marks which screens the sidebar lists. `command_hidden(request)` names the
app labels (`"blog"`) and model labels (`"blog.BlogComment"`) to leave out
of 2 and 3, except a screen the sidebar lists, which stays searchable (a
platform superuser's System section keeps the ACS logs while ACS is
inactive). The platform site hides nothing; the store site returns
`StoreFeatures.absent_apps() | StoreFeatures.absent_models()`
(`admin/features.py`): the apps of plan features that are not
configurable and of inactive carriers, and the shopper-input pages whose
setting is off. `absent_models` is the same list `store_sidebar` drops, so
the sidebar and the palette cannot disagree. `UNFOLD["COMMAND"]` and
`UNFOLD_PLATFORM["COMMAND"]` keep only `show_history`.
`tests/integration/admin/test_command_search.py` covers the ranking,
accent folding, section and sub-menu matches, the hidden apps and
switched-off pages, what the sidebar lists staying searchable, the record
cap and order, and the two-character minimum.

## Header and footer

`core/templates/admin/base_site.html` overrides Unfold's file through two
blocks Unfold leaves empty: `nav-global-side` renders a **View store**
link to `storefront_url` (set by `MyAdminSite.each_context` from
`UNFOLD["SITE_URL"]`, `admin.navigation.storefront_url`), and `footer`
includes `core/templates/admin/footer.html` on every non-popup page. The
footer context comes from `admin/mixins.py: AdminFooterMixin`, shared by
both sites: the site header, `RELEASE_VERSION`, a **Help & Guides** link
when `ADMIN_DOCS_URL` is set, and **API docs** (`api_docs_url_name`,
`swagger-ui`, which both sites' URLconfs serve) for platform superusers.

`admin/environment.py` supplies `ENVIRONMENT` and
`ENVIRONMENT_TITLE_PREFIX` for the store site. Both return `None` on
production unless the viewer `is_platform_superuser`, since a store's own
staff only ever work in production; every other environment is labelled
for everyone.

The cache page (`admin/admin.py: MyAdminSite.clear_cache_view`) requires
`core.purge_cache`; purges are scoped to the store's own keys, host and
edge zone. See [Caches & purging](/dev/operations/caches).

## Template overrides

- `core/templates/admin/base_site.html`, `footer.html`: the header link
  and the footer (above).
- `core/templates/admin/index.html`, `platform_index.html` and
  `admin/dashboard/`: the dashboards.
- `core/templates/admin/clear_cache.html`,
  `email_template_management.html` (+ `email_templates/preview.html`,
  the htmx preview fragment), `platform_billing.html`: custom pages.
- `admin/order/order_summary.html`, `product/apply_discount.html`,
  `product/stock_history.html`, `tenant/destroy_confirmation.html`.

Everything is Unfold components and the project's Tailwind build
(`tailwind/input.css`); the UI guard fails on hand-rolled markup.

## Translations

The admin is Greek-first (`el`, with `en` as the source language; `de`
is out of scope for the admin). Three catalogues meet on one page:

- **The project's own**, `locale/<lang>/LC_MESSAGES/django.po`, from
  `manage.py makemessages -l el -l en` (ignore `node_modules`, `htmlcov`,
  `staticfiles`, `mediafiles`, `web`, `tests`, `tests_mt`).
- **django-unfold's strings**, `locale_vendor/unfold/`, from
  `manage.py makemessages_unfold -l el`. Unfold ships no translations
  and leaves them to each project; the command walks the installed
  package, leaves out what Django's own Greek catalogues already
  translate, and is rerun after every Unfold upgrade, with gettext 0.23
  or later: older xgettext skips calls inside f-strings (Unfold's
  `f"{_('Welcome')} {username}"`) and would drop them.
- **Django's and the other packages'**, which win wherever they
  translate a string.

Guards: `tests/unit/test_locale_catalogue.py` fails on an untranslated
or fuzzy Greek entry in either catalogue, and when the installed Unfold
has strings its catalogue lacks (one way only, since what xgettext finds
depends on its version); `tests/unit/test_model_field_labels.py`
fails on a model field whose label Django derived from its name. Text
built for display goes through gettext (`ngettext` for counts), never an
f-string; `admin/displays.py: relative_time` passes its own translated
units, because Django's Greek catalogue leaves `timesince`'s empty.
CI compiles every catalogue before the tests, and tests run in `el`:
a test asserting English text takes `pytest.mark.assert_english`, and an
API test asserts the rendered `response.json()`, since `response.data`
holds lazy strings evaluated after the request has reset the language.

## Adding a new admin section

1. Write the `ModelAdmin` extending `BaseModelAdmin` (or
   `BaseTranslatableAdmin`); give custom actions `permissions=[...]` where
   `change` is wrong; make URL-backed actions return a response.
2. Keep it flat in queries (`list_select_related`, prefetches, annotations
   read through `__dict__`), large foreign keys as autocompletes, filters
   as field names or Unfold filter classes. The guards above say what
   they expect when one fails.
3. Register it for the store site; add public-schema models to
   `register_platform_models()`.
4. Add the sidebar entry: a `page(...)` call in
   `admin/navigation.py: store_sidebar`, under its group or sub-menu and
   gated on `admin.features` if it belongs to an optional feature; or, for
   the platform site, an item in `UNFOLD_PLATFORM` with its pinned
   `urlconf=`. A page reached only from a tab strip goes in `TABS`.
5. Run `uv run pytest tests/unit/admin tests/integration/admin`; add the
   admin guide page in the docs repo in both locales.

## Failure modes

- **Link without `urlconf=`**: every 500 page on one host becomes
  `NoReverseMatch`; caught by the resolve test.
- **Action returns `None`**: the side effect runs, the operator sees a
  500; caught by the AST test.
- **Platform-only model opened on a store host**: 403 by design, except
  the exemptions above.
- **Dashboard figure stale**: the query's `depends_on` misses the model it
  reads; add it and bump the query's version suffix.
- **A fieldset description or help text containing `<tag>`**: Django
  renders fieldset descriptions as HTML. A literal `<title>` in the page
  layout admin once opened a real `<title>` element and swallowed the rest
  of the page.

## Source

| File | Role |
|---|---|
| `grooveshop-django-api/admin/admin.py` | `MyAdminSite`, cache page |
| `grooveshop-django-api/admin/platform_site.py` | `PlatformAdminSite`, `register_platform_models` |
| `grooveshop-django-api/admin/base.py` | `BaseModelAdmin`, action permissions, filter mapping, JSON Schema editor |
| `grooveshop-django-api/admin/mixins.py` | `WithheldOnTenantHostModelAdmin`, `IsSuperuserOnlyModelAdmin`, `AdminSiteLoginNextMixin`, `AdminFooterMixin` |
| `grooveshop-django-api/admin/displays.py`, `admin/filters.py`, `admin/datasets.py` | Shared displays, filters, datasets |
| `grooveshop-django-api/admin/dashboard/` | Dashboard widgets and the cached queries |
| `grooveshop-django-api/admin/navigation.py` | Per-request store sidebar, `changelist_link`, site menu, storefront link |
| `grooveshop-django-api/admin/features.py` | `StoreFeatures`, `Availability`: plan flag and store setting per optional feature; `absent_apps`, `absent_models` |
| `grooveshop-django-api/admin/search.py` | `CommandSearchMixin`: the ⌘K palette on both sites |
| `grooveshop-django-api/tests/integration/admin/test_command_search.py` | The palette's ordering, folding, hidden screens and record cap |
| `grooveshop-django-api/admin/environment.py` | Environment label and tab-title prefix |
| `grooveshop-django-api/core/templates/admin/base_site.html`, `core/templates/admin/footer.html` | Header link, footer |
| `grooveshop-django-api/admin/branding.py` | Logo, icon and favicons per store |
| `grooveshop-django-api/core/json_schema.py` | `JSONSchemaValidator`, `wire_schema` |
| `grooveshop-django-api/tenant/role_scopes.py`, `tenant/auth_backends.py` | Role grants, reference data, `core.purge_cache` |
| `grooveshop-django-api/settings.py` | `UNFOLD`, `UNFOLD_PLATFORM`, `ADMIN_DOCS_URL`, `ADMIN_OPS_LINKS` |
| `grooveshop-django-api/tests/integration/admin/test_store_navigation.py` | The store sidebar's states, roles, badges and reachability |
| `grooveshop-django-api/core/management/commands/makemessages_unfold.py` | Extracts Unfold's strings into `locale_vendor/unfold` |
| `grooveshop-django-api/tests/unit/admin/` | The guarantees above |
