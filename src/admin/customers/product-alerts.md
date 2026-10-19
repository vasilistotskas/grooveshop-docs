---
title: Product alerts
description: The "back in stock" and "price drop" alerts your customers request for a product, what email they get, how to offer price-drop alerts on a product, and how an alert is removed.
---

# Product alerts

A customer can ask you to send them one email when a sold-out product is back, or when its price drops to an amount they choose. This page explains where these options appear and what you do.

Alerts have no screen of their own in the admin. The only per-product setting is under <span class="sidebar-path">Catalog → Products</span>.

## What you see

On the store, the customer sees:

| Alert | Where it appears | When the email goes out |
|---|---|---|
| **Back in stock** | A **Notify me** button on the page of a sold-out product, and **Notify me when it's back** on its card in product lists. | When the product's stock goes from zero to more than zero. |
| **Price drop** | A **Price-drop alert** button on the product page, only if you have switched it on for that product. | When the final price falls to the price the customer chose, or lower. |

In the window that opens, the customer enters their email. If they are signed in, their account email is used. For a price drop they also enter a **Target price**, which must be below today's price.

Each alert sends **one** email and then switches itself off. The customer cannot ask again for the same alert on the same product.

## Tasks

### Offer price-drop alerts on a product

Price-drop alerts are off on every new product. Switch them on only where you plan to lower the price.

1. Open the product under <span class="sidebar-path">Catalog → Products</span>.
2. On the **Customer Alerts** tab, tick **Price-drop Alerts Enabled**.
3. Click **Save**.

If you untick it later, customers cannot request new alerts. Alerts already requested stay active.

### Remove an alert on request

1. If the customer has an account, they sign in, open the product and click the alert button again. They see the alert is active and click **Turn the alert off**.
2. If they requested it as a visitor, with only an email, ask the platform team to remove it. Send the email and the product. See [When to contact support](/admin/help/contact-support).

## Things to know

- **What counts as a price drop:** the price the customer pays for the product itself, that is its price with the product's discount and VAT. The alert starts when you change the price or the discount on the product.
- **To switch all alerts off**, turn off the `PRODUCT_ALERTS_ENABLED` setting under <span class="sidebar-path">Settings → Store Settings</span>. It is on from the start. While it is off, the buttons leave the store and no email is sent.
- **Email language:** a customer with an account gets it in the language they chose. A visitor gets it in the platform's main language, whatever language they were browsing in.
- **[Favourites](/admin/customers/favourites) are a different thing.** A customer with a product in their favourites sees a notification in their account, not an email.
- **When a customer deletes their account**, the alerts on their account are deleted too. Alerts are included in their [data export](/admin/customers/data-exports).

## Related

- [Favourites](/admin/customers/favourites)
- [Products](/admin/catalog/products)
- [Email templates](/admin/settings/email-templates)
- [When to contact support](/admin/help/contact-support)
