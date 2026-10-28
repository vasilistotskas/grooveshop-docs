---
title: Storefront texts
description: Change the wording of your storefront's buttons, labels and notices in every language, see what changed and go back to the original at any time.
---

# Storefront texts

Every button, label, heading and notice of your storefront comes with ready-made wording, in each language the store serves. Here you replace any of them with your own words: "Add to cart" can become "Into the basket", the free-shipping notice can say it your way. Owners and Admins change texts; Staff can look but not change.

<span class="sidebar-path">Content → Storefront Texts</span>

## What you see

At the top, a search box, an **Area** list and two switches, **Changed only** and **Missing a translation**. Below them, how many texts match and how many your store has changed, then the texts themselves, twenty per page, with **Previous** and **Next** at the bottom.

The list holds only the texts your own store's design shows. Texts of pages or designs your store does not use are not there.

### One text

Each text is a card. Its heading is the wording as it reads today; under it, in small letters, the part of the site it belongs to and the text's code. On the right:

- the **area** it belongs to (for example **Checkout**);
- **Changed**, when your store has its own wording in at least one language;
- **Locked**, when only the platform can change it (see "Things to know" below).

Inside the card, one column per language:

| Part | What it is |
|---|---|
| **Original** | The ready-made wording, in grey. You cannot edit it. |
| The box below it | The wording your store shows. Until you change it, it holds the original. |
| **Your wording** | Shown next to the language when your store has its own text in it. |
| **No text** | Shown when the text has nothing at all in that language. |
| **Insert** buttons | The text's placeholders, such as `{n}` or `{name}`. Click one to put it where the cursor is. |
| The counter | How many characters you have written, against the limit. |

Under the columns: **View on the storefront**, **History**, **Use the original** (only on a text you changed) and **Save**.

### The areas

**Header**, **Footer**, **Legal and cookies**, **Shopping assistant**, **Home page sections**, **Product pages**, **Cart**, **Checkout**, **Account**, **Loyalty and gift cards**, **Search**, **Blog**, **Contact and forms**, and **Common** for everything that is used in many places. The list shows how many texts each area has and how many of them you changed. An area your store has no texts in is not listed.

## Tasks

### Find a text

1. Open <span class="sidebar-path">Content → Storefront Texts</span>.
2. Type a few words of the text as you see it on the site, in any language. The list narrows as you type. Every word must appear, in any order.
3. To narrow further, pick an **Area**, for example **Cart**.
4. Turn on **Changed only** to see just the texts your store has reworded.
5. Turn on **Missing a translation** to see the texts that have nothing in one of your languages.

If nothing matches, use fewer words or clear the filters.

### Change a text

1. Find the text.
2. In the box of the language you want, write your wording. While you type, the box is checked: under it you see **This text is fine.** or what is wrong.
3. Change the other languages in the same card if you want. Each language is separate: a language you leave as it was keeps its original.
4. Click **Save**. You see **Saved.**, and the language shows **Your wording**.

The change goes live on its own, with nothing else to do: within about ten seconds your site shows it. A page a visitor already has open shows it when it is reloaded.

A card saves all its languages together, or none of them. If one language has a problem, you see **Nothing was saved. Fix the marked texts.** and the problem under that language. Fix it and save again.

### Keep the placeholders

Some texts carry a value the site fills in, written in curly brackets: `{n}` for a number, `{name}` for a name, and so on. In "Only {n} left" the site puts the stock in place of `{n}`.

- Keep every placeholder of the original, spelled exactly the same. You can move it within the sentence.
- If you remove one, add one the original does not have, or misspell it, the text is not saved: you see **The text must keep the same placeholders as the original.**
- The **Insert** buttons type a placeholder for you, so you do not have to.
- A text that changes with the number (one item, two items) has several forms separated by `|`. The card says so: "This text has 2 forms, separated by |." Keep the same number of forms.
- Curly brackets, `|` and `@` have a meaning in these texts. If one is out of place, you see **The text is not valid. Check the braces { }, the | separators and the @ references.**

### Preview it on the storefront

Click **View on the storefront**. A new tab opens the page of the site where that area's texts appear (the cart for **Cart**, the home page for **Header**), in the admin's language when your storefront has it. Texts that are used in many places (**Common**) have no such button: look for them on the page you know them from.

### Go back to the original

1. On a changed text, click **Use the original**.
2. Confirm. Your wording is removed in every language of the card, and the site shows the original again. You see **Back to the default text.**

To go back in one language only, write the original wording back in that box, or copy it from the **Original** above it, and click **Save**. A text written exactly as the original is no longer counted as changed.

### See the history and restore an older version

1. Click **History** on the text. Every change appears, newest first: what happened (**Created**, **Edited** or **Reset**), the language, who did it and when, with the text **Before** and **After**.
2. To bring back an older version, click **Restore this** on it. You see **Restored.**
3. Click **Close** to hide the history.

The newest entry of each language is what the site shows now, so it has no **Restore this**. Restoring a **Reset** entry takes your wording away again. Before restoring, the old text is checked again: if the site has changed since, for example a placeholder was renamed, it is not restored and you are told why.

## Things to know

- **A text you never change keeps updating with the platform.** When the platform improves a ready-made wording, your site gets it. A text you changed stays exactly as you wrote it; the **Original** above it shows the platform's current wording, so you can compare.
- **Some texts are locked.** The site's legal and consent wording, the cookie banner and its settings, the titles of the legal pages, the lowest-price-of-30-days label next to a reduced price, form validation messages and error messages are managed by the platform. They are listed with **Locked** and the note "The platform manages this text (legal, consent, cookie or error wording), so it cannot be changed here.", and their boxes are greyed out. These wordings carry a legal obligation or must keep an exact meaning; if one looks wrong, [contact support](/admin/help/contact-support). The legal pages themselves are your own [Pages](/admin/content/pages).
- **Who can change texts.** Owners and Admins. Staff see the same page with the note "You can view these texts but you do not have permission to change them.", without **Save**, **Use the original**, **Restore this** or the **Insert** buttons. See [Roles & team](/admin/getting-started/roles-and-team).
- **An empty box is not allowed.** To remove your wording, use **Use the original**. In a language where the original itself has no text (**No text**), you may leave the box empty.
- **Length.** The counter turns red past the limit, and a text over it is not saved.
- **When the storefront cannot be reached** for a moment, the page says so and nothing is saved, so nothing unchecked ever reaches your site. Nothing is lost: try again in a moment.
- **"This text no longer exists in the storefront"** means a platform update removed or renamed that text. Your old wording for it no longer shows anywhere.
- **Your menus, pages and products are not here.** Menu links are edited in [Menus](/admin/content/menus), your own pages in [Pages](/admin/content/pages), product texts on each product. The admin's own texts cannot be changed by a store.
- **If a change does not show** after a minute, clear **Storefront texts** on the [Cache](/admin/settings/cache) page.

## Related

- [Pages](/admin/content/pages)
- [Menus](/admin/content/menus)
- [Languages & translations](/admin/settings/languages-and-translations)
- [Roles & team](/admin/getting-started/roles-and-team)
- [Cache](/admin/settings/cache)
