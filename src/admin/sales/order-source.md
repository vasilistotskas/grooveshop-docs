---
title: Order source
description: Where your customers came from before they ordered or started a cart, how the platform names the channel, and how to tag your own links.
---

# Order source

<span class="sidebar-path">Sales → Orders</span> · <span class="sidebar-path">Sales → Carts</span>

Every new order records where the customer came from: an ad, a post, a search result or another website. Use it to see which channels bring you sales.

## What you see

Each order keeps two sources:

- **Order source**: where the visit that ended in the order came from. It is set when the order is placed and never changes.
- **Cart source**: where the customer came from when they put the first product in their cart. A customer can find you on Instagram, leave, and come back from Google days later to buy.

Both appear as a coloured badge with the channel's name (Instagram, Google, a website's address) in the order list. The order page shows them on the **Additional Information** tab, together with **Traffic medium**, **Campaign name**, **Referrer host** (the website the customer came from) and **Landing page** (the first page they saw).

The cart list shows the cart's source in its own column, which is also headed **Order source**.

### Source types

| Source type | What it means |
|---|---|
| **Direct** | No trace of where the visit came from: a typed address, a bookmark, or an app that hides the link. |
| **Campaign** | A link you tagged yourself (see below), not marked as paid. |
| **Paid** | A click on a paid ad (Google, Microsoft, TikTok, X, LinkedIn or Pinterest ads), or a tagged link marked as paid. |
| **Social** | Instagram, Facebook, TikTok, Pinterest, YouTube, X, LinkedIn or Reddit, including their in-app browsers. |
| **Search** | Google, Bing, DuckDuckGo or Yahoo search results. |
| **Referral** | Any other website that linked to you, and AI assistants such as ChatGPT and Perplexity. |
| **AI agent** | An order placed by an AI agent through the store's agent checkout, not by a person in the store. |

## Tasks

### Tag a link so its orders are recognised
1. Add three tags to the link you share, for example:
   `?utm_source=newsletter&utm_medium=email&utm_campaign=autumn-sale`
2. Orders from that visit show the source `newsletter`, type **Campaign**, and the campaign name on the order page.
3. For a paid ad, set `utm_medium` to `cpc` or `paid_social`, so its orders read as **Paid**. Google and Microsoft ads are recognised as paid without it.

### See the orders from one channel
1. Open <span class="sidebar-path">Sales → Orders</span>.
2. In the filters, pick the channel in **Order source**, or a whole kind in **Source type** (for example every **Social** order).
3. Direct orders have no channel name, so find them with **Source type → Direct**.

### Compare where carts start and where orders come from
1. In the order list, filter by **Cart source** or **Cart source type**.
2. You see the orders whose cart was started from that channel, wherever the final visit came from.
3. In <span class="sidebar-path">Sales → Carts</span>, the **Source type** and **Order source** filters show the carts not yet ordered, by where they were started.

## Things to know

- **A source is a guide, not proof.** Anyone can add tags to a link, and some apps hide where a visit came from, so a real Instagram visit can show as **Direct**.
- **It is counted per browser tab.** The first page the customer opens in a tab sets the source. Only a later tagged link or ad click in the same tab replaces it.
- **Returning from the card payment page never changes it.** Viva Wallet or Stripe is never counted as a source.
- **Facebook and Instagram** mark ordinary shared links the same way as their ads. A Meta ad reads as **Paid** only when you tag its link with a paid `utm_medium`.
- **Older orders and carts** placed before the store started recording sources show "-". A cart emptied and filled again starts a new cart source.
- The [Dashboard](/admin/getting-started/dashboard) card **Where orders come from** shows the share of each source for the period you choose: the five biggest by name, the rest together.

## Related

- [Orders](/admin/sales/orders)
- [Carts](/admin/sales/carts)
- [Dashboard](/admin/getting-started/dashboard)
