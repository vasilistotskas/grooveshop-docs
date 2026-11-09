---
title: Connect your AI app
description: Ask Claude, ChatGPT or another AI app about your store's orders, sales, stock, customers, reviews and messages, with the access your role gives you. It can look, never change.
---

# Connect your AI app

You and your team can connect your own AI app (Claude, ChatGPT and others that support connectors) to your store. You then ask it questions in plain words: "which orders are still waiting to ship?", "how did sales go last month compared to the month before?", "which products are about to run out?".

The app can **only look**. It cannot change an order, a price, stock or anything else in your store.

It is **off until your store turns it on**, because what the app reads goes to the company behind it.

<span class="sidebar-path">Settings → Store Settings</span> → `STAFF_AI_ACCESS_ENABLED`

## What the app can see

Each person sees only what their [role](/admin/getting-started/roles-and-team) allows, and only the areas they approve when they connect:

| Area | Staff | Admin | Owner |
|---|---|---|---|
| Orders, with their lines, totals, payment and shipping | yes | yes | yes |
| Products, prices and stock, including low stock | yes | yes | yes |
| Customers: name, email, when they joined, their orders | yes | yes | yes |
| Product reviews | yes | yes | yes |
| Contact messages | yes | yes | yes |
| Sales and turnover, as in the **Turnover** report | no | yes | yes |
| Profit and costs, as in the **Profit** report | no | no | yes |

A customer's street address and phone number are never shown to the app.

## Turn it on for your store

An Owner or Admin opens <span class="sidebar-path">Settings → Store Settings</span>, finds `STAFF_AI_ACCESS_ENABLED` (under **Agent Commerce**), ticks it and saves. It can take up to five minutes before the first app can connect.

Turning it off again disconnects every app at once: their next question is refused.

## Connect

You need the address of your store's admin connector. It is your store's web address followed by `/mcp/admin`, for example `https://your-store.gr/mcp/admin`.

1. In your AI app, add a custom connector (some apps call it an "MCP server"). Paste the address above. In Claude Code, for example: `claude mcp add --transport http my-store-admin https://your-store.gr/mcp/admin`.
2. The app opens a sign-in page on `connect.grooveshop.space`, showing your store's name and logo. Sign in with the **same email and password you use for your store's admin**. If you sign in to the admin with an authenticator code, you give it here too.
3. The next page lists what the app asks to see, limited to what your role allows. Untick anything you do not want it to see, then click **Authorize**.
4. Back in your app, ask your question.

Every person on your team connects with their own account, so each one sees only what their own role allows.

## Disconnect

- Remove the connector in your AI app. That person's app can no longer read anything.
- To stop every app at once, turn `STAFF_AI_ACCESS_ENABLED` off.
- To cut off someone else, untick **Active** for them or remove them in <span class="sidebar-path">Settings → Team</span>. Their app stops reading your store from its next question. Lowering their role takes effect from the next question too.

## Good to know

- **Your customers' details go to the AI app's provider.** What the app reads (names, emails, orders, messages) is sent to the company behind it, under its own terms. Connect only an app your store has agreed to use, and only areas you need.
- **What customers write is treated as text, not commands.** Reviews, contact messages and order notes are passed to the app marked as written by a customer. Still read the app's answer with care if a message asks it to do something.
- **Not every app or plan supports connectors.** At the time of writing, ChatGPT offers custom connectors on its business plans; the Gemini app offers them only on the web, in some countries and in English. Check your app's own help pages.
- **"Not allowed" or "not granted" answers.** "Not allowed" means your role does not include that area. "Not granted" means you did not approve it when connecting: remove the connector and connect again to approve it.
- The app cannot sign you in to the admin, and the admin is not reachable through the app.

## Related

- [Roles & team](/admin/getting-started/roles-and-team)
- [Sign-in & password](/admin/getting-started/sign-in)
