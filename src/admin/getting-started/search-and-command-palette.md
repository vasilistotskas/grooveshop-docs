---
title: Search & command palette
description: Reach any page or record fast with the command palette, which lists sidebar pages first, then other screens, then records; plus the sidebar filter, list search boxes, filters and column sorting.
---

# Search & command palette

The admin offers four ways to find things: the command palette, the sidebar filter, the search box on every list, and the filters panel. This page explains what each one actually searches.

## Command palette

Press **Ctrl+K** (Windows, Linux) or **⌘K** (macOS) anywhere in the admin and start typing. The results come in three groups, in this order:

1. **Pages of the sidebar.** Every sidebar page you can open whose name matches what you typed. Names are matched in the language the admin is shown in, ignoring case and Greek accents: in the Greek admin, «παραγγελιες» finds **Παραγγελίες**. The best matches come first: the name itself, then names that start with what you typed, then names with a word that starts with it, then names that contain it anywhere. Typing the name of a section or a sub-menu, such as **Customers** or **Wholesale**, also lists every page in it, after the direct matches.
2. **Other screens you can open**, the ones the sidebar leaves out, such as **Order Items**, **Cart Items** or **Tagged Items**. These are matched by their own name only.
3. **Records**, once you have typed at least two characters. Each screen gives up to five records that its own list search box would find, with the sidebar's screens first. When a screen has more than five, a **View all** result opens that list already searched for your term.

After its name, each result shows where it sits in the sidebar (a page), the area it belongs to (another screen) or what kind of record it is. Pick one with the arrow keys and **Enter**, or click it.

- Screens and records of a feature your store does not have are not offered, just as the sidebar leaves them out. That means a feature off your plan, or a courier that is not active. A feature on your plan but switched off in **Store Settings** is still found. So are the pages that leave the sidebar while their setting is off (Reviews, Feedback, Favourites, Newsletter, Blog Comments): type their name.
- The palette keeps a **history** of what you recently opened from it, shown before you type.
- Pressing **Enter** with no result highlighted does nothing.

Examples of records it finds: a customer's email, a product name in any language, an order id, an ACS voucher number, a BoxNow parcel id, a membership by email.

Every search runs afresh, so a record saved a moment ago is found straight away.

## Sidebar filter

The search box at the top of the sidebar narrows the menu entries as you type. It matches section and entry titles only; it does not search records. The sidebar only ever lists the screens your role can open and the features your store has, so a screen missing from it is not hidden by the filter; see [Welcome](/admin/).

## List search box

Every list has a search box at the top. It searches the fields defined for that list, for example:

| List | Searches |
|---|---|
| Orders | order id, customer email and name, and more |
| Products | name in every language, SKU |
| Customers | email, username, name |
| Stock Logs | product name, SKU, order id, reason |
| Store Settings | setting name and description |

The exact fields per list are documented on that list's page in this guide. Searching is case-insensitive and matches partial words.

## Filters

The filter panel on the right narrows the list by status, dates, related records and other facets. Two behaviours to know:

- Most lists apply a filter as soon as you pick it. On **Store Settings** the panel has a **submit** button; pick several filters and apply them together.
- Date-range filters accept a from and a to value. Lists with a date hierarchy (Stock Logs, Meta CAPI Event Log) additionally show a year, month, day drill-down above the table.

Filters are reflected in the address. Bookmark a filtered address to return to the same view, for example the pending orders view that **Orders to process** on the dashboard links to.

## Sorting

Click a column header to sort by it; click again to reverse. Hold the sort and click another header to sort by several columns. Sorting is also part of the address, so a bookmarked link keeps it. There is no per-user saved ordering beyond that.

## Tabs across related lists

Some lists show a tab strip at the top so you can hop between related screens without going through the sidebar:

| Where | Tabs |
|---|---|
| Orders | Orders, Order Items, Receipts, Credit Documents, and — for platform operators only — Stock Logs and Order History. **Order Items** has no sidebar entry; it lists every order line, and filtering it by product shows who bought that product. |
| BoxNow | BoxNow Shipments, BoxNow Lockers, and BoxNow Events for platform operators |
| ACS | ACS Shipments, ACS Stations, and ACS Pickup Lists, ACS COD Payouts and ACS Tracking Events for platform operators |
| Product options | Attributes, Attribute Values, Variant Groups |
| Blog | Blog Posts, Categories, Authors, Comments, Tags |

## Things to know

- The palette respects permissions: a Staff member gets no page, screen or record from a screen they cannot open.
- Searching a translated field (product name, category name) finds the record whichever language the text was entered in.

## Related

- [Dashboard](/admin/getting-started/dashboard)
- [Orders](/admin/sales/orders)
- [Products](/admin/catalog/products)
