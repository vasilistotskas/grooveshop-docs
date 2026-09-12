---
title: Search & command palette
description: Find any record fast with the command palette, the sidebar filter, list search boxes, filters and column sorting.
---

# Search & command palette

The admin offers four ways to find things: the command palette, the sidebar filter, the search box on every list, and the filters panel. This page explains what each one actually searches.

## Command palette

Press **Ctrl+K** (Windows, Linux) or **⌘K** (macOS) anywhere in the admin.

- Type part of a name, an email, an order number, a SKU or a voucher number. The palette searches **every model registered in your store's admin** at once, using the same fields each list's own search box uses (`UNFOLD["COMMAND"]` in `settings.py`, `core/utils/admin.py`).
- Results are grouped by model. Pick one with the arrow keys and **Enter** to open its edit page.
- The palette also keeps a **history** of records you recently opened, shown before you type.
- Pressing **Enter** with no results does nothing (a guard script prevents the palette from breaking).

Examples of what works: a customer's email, a product name in any language, an order id, an ACS voucher number, a BoxNow parcel id, a membership by email.

## Sidebar filter

The box above the sidebar sections narrows the menu entries as you type. It matches section and entry titles only; it does not search records.

## List search box

Every list has a search box at the top. It searches the fields defined for that list, for example:

| List | Searches |
|---|---|
| Orders | order id, customer email and name, and more |
| Products | name in every language, SKU |
| Users | email, username, name |
| Stock Logs | product name, SKU, order id, reason |
| Extra Settings | setting name and description |

The exact fields per list are documented on that list's page in this guide. Searching is case-insensitive and matches partial words.

## Filters

The filter panel on the right narrows the list by status, dates, related records and other facets. Two behaviours to know:

- Most lists apply a filter as soon as you pick it. On **Extra Settings** the panel has a **submit** button; pick several filters and apply them together.
- Date-range filters accept a from and a to value. Lists with a date hierarchy (Stock Logs, Meta CAPI Event Log) additionally show a year, month, day drill-down above the table.

Filters are reflected in the URL. Bookmark a filtered URL to return to the same view, for example the pending orders view the dashboard links to.

## Sorting

Click a column header to sort by it; click again to reverse. Hold the sort and click another header to sort by several columns. Sorting is also part of the URL, so a bookmarked link keeps it. There is no per-user saved ordering beyond that.

## Tabs across related lists

Some lists show a tab strip at the top so you can hop between related screens without going through the sidebar: Orders, Invoices (and, for platform operators, Stock Logs and Order History); BoxNow Shipments, Lockers, Events; ACS Shipments, Stations, Pickup Lists, COD Payouts, Tracking Events; Attributes, Attribute Values, Variant Groups; Blog Posts, Categories, Authors, Comments, Tags.

## Things to know

- The palette respects permissions: a Staff member does not get results from models they cannot open.
- Searching a translated field (product name, category name) finds the record whichever language the text was entered in.

## Related

- [Dashboard](/admin/getting-started/dashboard)
- [Orders](/admin/sales/orders)
- [Products](/admin/catalog/products)
