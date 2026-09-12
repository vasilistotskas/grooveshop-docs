---
title: Search & command palette
description: Find any record fast with the command palette, the sidebar filter, list search boxes, filters and column sorting.
---

# Search & command palette

The admin offers four ways to find things: the command palette, the sidebar filter, the search box on every list, and the filters panel. This page explains what each one actually searches.

## Command palette

Press **Ctrl+K** (Windows, Linux) or **⌘K** (macOS) anywhere in the admin.

- Type part of a name, an email, an order number, a SKU or a voucher number. The palette searches **every screen your role can open**, using the same fields each list's own search box uses. It also matches the names of the sidebar sections themselves.
- Results are grouped by screen. Pick one with the arrow keys and **Enter** to open its edit page.
- The palette also keeps a **history** of records you recently opened, shown before you type.
- Pressing **Enter** with no result highlighted does nothing.

Examples of what works: a customer's email, a product name in any language, an order id, an ACS voucher number, a BoxNow parcel id, a membership by email.

Results are held for about five minutes per person and per search term, so repeating a search is instant and a record created seconds ago may take a moment to appear.

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

Filters are reflected in the address. Bookmark a filtered address to return to the same view, for example the pending orders view the dashboard links to.

## Sorting

Click a column header to sort by it; click again to reverse. Hold the sort and click another header to sort by several columns. Sorting is also part of the address, so a bookmarked link keeps it. There is no per-user saved ordering beyond that.

## Tabs across related lists

Some lists show a tab strip at the top so you can hop between related screens without going through the sidebar:

| Where | Tabs |
|---|---|
| Orders | Orders, Invoices, and — for platform operators only — Stock Logs and Order History |
| BoxNow | BoxNow Shipments, BoxNow Lockers, and BoxNow Events for platform operators |
| ACS | ACS Shipments, ACS Stations, and ACS Pickup Lists, ACS COD Payouts and ACS Tracking Events for platform operators |
| Product options | Attributes, Attribute Values, Variant Groups |
| Blog | Blog Posts, Categories, Authors, Comments, Tags |

## Things to know

- The palette respects permissions: a Staff member does not get results from screens they cannot open.
- Searching a translated field (product name, category name) finds the record whichever language the text was entered in.

## Related

- [Dashboard](/admin/getting-started/dashboard)
- [Orders](/admin/sales/orders)
- [Products](/admin/catalog/products)
