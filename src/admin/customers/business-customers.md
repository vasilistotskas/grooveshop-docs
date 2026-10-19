---
title: Business customers
description: Business customers' applications for wholesale prices, approving, rejecting and suspending them, and the VIES check of the VAT number.
---

# Business customers

Here you approve the customers who ask for wholesale prices. The customer applies from their account with their company details. You approve the application and give them a customer group, and from then on they see that group's prices.

<span class="sidebar-path">Customers → Wholesale → Business Customers</span>

Wholesale needs two things: the platform team must have switched it on for your store, and the `B2B_WHOLESALE_ENABLED` setting under <span class="sidebar-path">Settings → Store Settings</span> must be on. It is off by default. While the setting is off, the **Wholesale** menu shows the **Off** marker, so you can prepare groups and prices. The number next to the menu counts the applications waiting.

## What you see

| Column | Meaning |
|---|---|
| **Company name** | As the customer entered it. |
| **VAT number (ΑΦΜ)** | Nine digits, without the EL prefix. |
| **User** | The customer's account. One account has one business profile. |
| **Status** | Where the application stands (table below). |
| **Customer group** | The group you gave at approval. It sets their prices. |
| **VIES** | The result of the VAT-number check in the European VIES system. |
| **Created At** | When the application was made. |

Filters: **Status**, **VIES status**, **Customer group** and date. Search finds a company name, a VAT number or a customer email.

A customer's page has three tabs:

- **Company**: company name, VAT number, tax office, business activity and billing address. The customer fills these in; correct only an obvious typo here.
- **Review**: **Status**, **Customer group**, who reviewed it and when, and the **Rejection reason**.
- **VIES**: what VIES answered, with the name and address it has on record.

Top right: **Approve**, **Reject**, **Suspend**, **Re-check VIES**.

The statuses:

| Status | Meaning |
|---|---|
| **Pending review** | Waiting for you. A new application, a resubmission after a rejection, or an approved customer who changed the company name, VAT number, tax office or activity. |
| **Approved** | The customer sees wholesale prices. |
| **Rejected** | The customer got an email with the reason and may apply again. |
| **Suspended** | Wholesale prices are cut off. The customer cannot change this themselves. |

The VIES result:

| VIES | Meaning |
|---|---|
| **Not checked** | No check has run yet. |
| **Valid** | VIES confirmed the VAT number. |
| **Invalid** | VIES says the number is not registered for intra-EU trade. |
| **Service unavailable** | VIES did not answer. It is not a verdict; try **Re-check VIES** later. |

## Tasks

### Review an application

For every new application you receive an email at the store's contact address.

1. Filter **Status: Pending review**, or click **Business accounts to verify** on the [Dashboard](/admin/getting-started/dashboard).
2. Open the application and compare the **Company** tab with the **VIES** tab. **Valid** with the same company name is a good sign.
3. Click **Approve** and pick a **Customer group**. The customer gets an email that they were approved. The list shows active groups only, so create the group first if it is missing.
4. Or click **Reject** and write a **Reason**. The customer reads it in the email they receive.

### Change a customer's group

1. Open the customer, change **Customer group** on the **Review** tab and save.
2. The next time the customer opens the cart or checkout, they see the new group's prices.

### Stop wholesale prices

1. Click **Suspend**. There is no confirmation step and no email to the customer.
2. From the next time the customer opens the cart, they see retail prices.
3. To restore them, click **Approve** again with a group. The customer gets the approval email.

### Check VIES again

Click **Re-check VIES**. The result updates straight away.

## Things to know

- **Wholesale prices need four things at once:** wholesale switched on, the customer in status **Approved**, a **Customer group**, and that group **Active**. If one is missing, the customer sees retail prices with no message.
- **Prices are worked out again every time** the customer looks at the cart or checkout. Orders already placed do not change.
- **An address change** by the customer does not send the application back for review. A change to the company name, VAT number, tax office or activity does.
- **VIES is a help, not a decision.** The platform never approves or rejects on its own; you decide.
- **One account, one business profile.** A company with several buyers needs one account for each of them.
- **Wholesale orders stand out.** In [Orders](/admin/sales/orders), the **Wholesale: Wholesale-priced** filter lists them, and each order shows under **Wholesale pricing** the group and discount it got.

## Related

- [Customer groups & price lists](/admin/customers/groups-and-price-lists)
- [Orders](/admin/sales/orders)
- [Store settings](/admin/settings/store-settings)
