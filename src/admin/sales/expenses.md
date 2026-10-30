---
title: Expenses
description: Enter the costs of running the store, such as courier invoices, marketing, software, rent and payroll, so the profit page can subtract them.
---

# Expenses

<span class="sidebar-path">Sales → Expenses</span>

The costs of running the store that are not the price of a product: the courier's invoice, advertising, software, rent, salaries. The [Profit](/admin/sales/profit) page subtracts them. Only the **Owner** role sees this page.

## What you see

A list with one row for each expense, newest first. Columns: **Date**, **Category**, **Description**, **Net amount**, **VAT**, **Attachment** and **Created By**. You can filter by **Category** and by **Date**, and search by description.

## Tasks

### Add an expense
1. Open <span class="sidebar-path">Sales → Expenses</span> and press **Add**.
2. Set the **Date** the cost belongs to, usually the invoice date. The profit page counts it in that month.
3. Choose the **Category** (see below) and write a short **Description**, for example "ACS invoice, September".
4. Enter the **Amount (net of VAT)** and the **VAT amount** shown on the invoice. The profit page uses the net amount only: you get the VAT back.
5. Optionally attach the invoice (**Attachment**: a PDF or an image).
6. Press **Save**.

### Enter a courier invoice
Courier invoices usually arrive once a month. Add one expense with the **Shipping (carrier invoices)** category for each invoice, dated the invoice date, with the net total of the invoice. The profit page shows it as **Delivery costs**, next to what customers paid you for shipping.

### Open an attached invoice
Press **Download** in the **Attachment** column. The file is private: only an Owner who is signed in can open it.

### Fix or delete an expense
Open the row, change the fields and **Save**, or delete it. The profit page recalculates at once.

## The categories

| Category | Use it for |
|---|---|
| **Shipping (carrier invoices)** | What the couriers (ACS, BoxNow and others) invoice you. Shown as **Delivery costs**. |
| **Marketing** | Advertising, influencers, samples. |
| **Packaging** | Boxes, tape, labels. |
| **Software and subscriptions** | The store's tools and services. |
| **Rent and utilities** | Office, warehouse, electricity, internet. |
| **Payroll** | Salaries and contributions. |
| **Other** | Anything else. |

Payment fees are not an expense category: Viva Wallet and Stripe report them for each payment, and the profit page adds them for you.

## Things to know

- **The net amount must be above zero**, and the VAT amount cannot be negative.
- **Enter a cost once.** If you enter the same invoice twice the profit is lowered twice.
- **Payroll descriptions are personal data.** Write "Payroll, September" rather than a person's name.

## Related

- [Profit](/admin/sales/profit)
- [Monthly turnover](/admin/sales/turnover)
- [Roles & team](/admin/getting-started/roles-and-team)
