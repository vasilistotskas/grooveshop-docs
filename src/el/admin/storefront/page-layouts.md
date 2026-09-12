---
title: Διατάξεις σελίδων
description: Σύνθεση της αρχικής σελίδας και των επώνυμων ζωνών άλλων σελίδων του καταστήματος από ενότητες, ορισμός κειμένων SEO ανά σελίδα, και δημοσίευση.
---

# Διατάξεις σελίδων

<span class="sidebar-path">Δεν υπάρχει στο πλάγιο μενού. Ανοίξτε την παλέτα εντολών (Ctrl+K / ⌘K) και γράψτε «Page Layout», ή πηγαίνετε στο `/admin/page_config/pagelayout/`.</span>

Μια διάταξη σελίδας είναι μια λίστα **ενοτήτων** που το κατάστημα αποδίδει με τη σειρά για έναν τύπο σελίδας. Η αρχική σελίδα χτίζεται εξ ολοκλήρου από τη διάταξή της· οι άλλοι τύποι σελίδας παίρνουν μόνο μια προαιρετική επώνυμη ζώνη πάνω από το δικό τους περιεχόμενο.

## Τι βλέπετε

| Στήλη | Σημασία |
|---|---|
| **Page Type** | Το αναγνωριστικό που ζητά το κατάστημα (`home`, `products`, `blog`, `about`, `contact`, `feedback`, `vision` και οι δύο σελίδες microlearning). |
| **Τίτλος** | Όνομα εμφάνισης στο admin. |
| **Δημοσιευμένο** | Επεξεργάσιμο στη λίστα· τσεκάρετε και πατήστε **Αποθήκευση**. |
| **Updated at** | Τελευταία αλλαγή. |

Η **αναζήτηση** ψάχνει σε τύπο σελίδας και τίτλο. **Φίλτρα**: Δημοσιευμένο, Page Type.

Η φόρμα διάταξης:

| Ενότητα | Πεδία |
|---|---|
| **Σελίδα** | **Page Type** (μοναδικό), **Τίτλος**. |
| **Δημοσίευση** | **Δημοσιευμένο**. |
| **SEO** | **Τίτλος SEO**, **Περιγραφή SEO**, **Λέξεις-κλειδιά SEO**. Κενά, η σελίδα κρατά τον ενσωματωμένο τίτλο της και την περιγραφή του καταστήματος. |
| **Μεταδεδομένα** (συμπτυγμένο) | Ελεύθερο JSON, δεν χρησιμοποιείται από το κατάστημα. |
| **Σύστημα** (συμπτυγμένο) | ids και χρονοσφραγίδες. |

Κάτω από τη φόρμα, ο πίνακας **Page Sections** δείχνει τις ενότητες με σειρά απόδοσης και:

| Πεδίο | Σημασία |
|---|---|
| **Component Type** | Ποιο μπλοκ αποδίδεται (λίστα παρακάτω). |
| **Τίτλος** | Προαιρετική επικεφαλίδα, την εμφανίζουν τα μπλοκ που έχουν τέτοια. |
| **Is Visible** | Ξετσεκάρετε για να κρύψετε ενότητα χωρίς διαγραφή. |
| **Props** | Ρυθμίσεις του μπλοκ σε JSON. |
| **Locale Overrides** | Κείμενα ανά γλώσσα: `{"en": {"title": "...", "props": {...}}}`. Μόνο τα κλειδιά που διαφέρουν· η προεπιλεγμένη γλώσσα είναι τα ίδια τα πεδία. |
| **Σειρά ταξινόμησης** | Μόνο για ανάγνωση εδώ· οι νέες ενότητες μπαίνουν στο τέλος. |

### Τύποι ενοτήτων

| Τύπος | Props που δέχεται |
|---|---|
| Hero Banner | heading, subheading, eyebrow, image_url, cta_text, cta_link, secondary_cta_text, secondary_cta_link, stats, overlay_opacity, decor |
| Hero Carousel | images, mobile_images, link |
| Products Slider | page_size (1-24) |
| Products Grid | page_size (1-48) |
| Featured Products | page_size (1-24), columns (1-6) |
| Product Categories | κανένα |
| Blog Categories Rail, Blog Posts Carousel (count 1-12), Blog Posts Grid (count 1-24), Blog Posts List (page_size 1-24) | όπως αναγράφονται |
| Recently Viewed Rail | κανένα· χρειάζεται και τη ρύθμιση καταστήματος `RECENTLY_VIEWED_ENABLED` |
| Rich Text Block | content (HTML, έως 20000 χαρακτήρες) |
| Call to Action Banner | heading, description, button_text, button_link, background_color, surface |
| Newsletter Signup | heading, description, placeholder |
| Testimonials | items (name, text, avatar) |
| Spacer (height), Divider (variant) | βοηθητικά διάταξης |
| Loyalty Program Hero, Search Bar, Business Hours | κανένα |
| Location Map | embed_url, lat, lng, address |
| Features Grid, Media + Text, Image Gallery, Story Timeline, FAQ Accordion, Partner Strip, Pull Quote, Reference Cards, Page Hero, Feature Lists, Option Selector, Comparison Table, Flow Steps, Project Register, Vendor Cards, Contact Panel | γενικά μπλοκ marketing· καθένα δέχεται το δικό του σύνολο props κειμένου, στοιχείων και συνδέσμων |
| About Content, Vision Content, What Is Microlearning, Why Microlearning | επώνυμα μπλοκ χωρίς props· το περιεχόμενο ζει στο κατάστημα |

Τα props ελέγχονται στην αποθήκευση με βάση το συμβόλαιο κάθε μπλοκ: άγνωστα κλειδιά, λάθος τύποι και υπερβολικά μεγάλα κείμενα απορρίπτονται με μήνυμα που κατονομάζει το κλειδί. Οι σύνδεσμοι στα props (`cta_link`, `button_link`, `link`) πρέπει να είναι εσωτερικές διαδρομές ή URL `https://`.

## Προσπαρμένες διατάξεις

Κάθε κατάστημα ξεκινά με δημοσιευμένη διάταξη `home` τεσσάρων ενοτήτων: Blog Categories Rail, Hero Carousel (χωρίς εικόνες), Recently Viewed Rail, Blog Posts List. Οι άλλοι τύποι σελίδας δεν σπέρνονται: τα `products`, `blog`, `contact` και `feedback` αποδίδουν την κανονική τους σελίδα και δείχνουν διάταξη μόνο ως ζώνη πάνω από αυτή, ενώ τα `about`, `vision` και οι σελίδες microlearning δεν δείχνουν τίποτα μέχρι να δημοσιευτεί διάταξη.

## Εργασίες

### Banner στην αρχική σελίδα
1. Ανοίξτε τη διάταξη `home` και βρείτε την ενότητα **Hero Carousel**.
2. Στα **Props**, ορίστε `{"images": ["/img/banner.png"], "mobile_images": ["/img/banner-mobile.png"], "link": "/products/123/my-product"}`. Οι εικόνες πρέπει να είναι ήδη προσβάσιμες στο κατάστημα.
3. Αποθηκεύστε και καθαρίστε την επιφάνεια **Pages & navigation** στο εργαλείο [Cache](/el/admin/system/cache).

### Προσθήκη ενότητας
1. Στο **Page Sections** πατήστε προσθήκη, επιλέξτε **Component Type**, συμπληρώστε **Τίτλο** και **Props**.
2. Αποθηκεύστε. Η ενότητα μπαίνει τελευταία. Η σειρά δεν επεξεργάζεται σε αυτόν τον πίνακα· για αναδιάταξη, διαγράψτε και ξαναπροσθέστε ενότητες με τη σειρά που θέλετε.

### Μετάφραση ενότητας
Βάλτε το κείμενο της άλλης γλώσσας στο **Locale Overrides**: `{"en": {"title": "Our story", "props": {"heading": "..."}}}`. Τα δομικά props (πλήθη, στήλες, σύνδεσμοι) μένουν στα **Props** ώστε να μη διαφέρουν μεταξύ γλωσσών.

### Δημιουργία σελίδας «Σχετικά»
1. Πατήστε **Προσθήκη**, ορίστε **Page Type** `about`, έναν **Τίτλο**, και τσεκάρετε **Δημοσιευμένο**.
2. Προσθέστε ενότητες όπως **Page Hero**, **Media + Text** και **FAQ Accordion**, συμπληρώστε τα props τους, αποθηκεύστε.
3. Συμπληρώστε **Τίτλο SEO** και **Περιγραφή SEO**· χωρίς αυτά η σελίδα χρησιμοποιεί τον ενσωματωμένο τίτλο και την περιγραφή του καταστήματος.
4. Καθαρίστε την cache. Συνδέστε τη σελίδα από μενού με `"to": "/about"`.

## Καλό είναι να ξέρετε

- Σερβίρονται μόνο **δημοσιευμένες** διατάξεις· οι επισκέπτες δεν βλέπουν ποτέ αδημοσίευτη διάταξη ή κρυφή ενότητα.
- **Cache**: οι διατάξεις και οι αποδοσμένες σελίδες αρχική, about, contact, feedback και info κρατιούνται στο κατάστημα. Η αποθήκευση διάταξης δεν τις καθαρίζει. Καθαρίστε το **Pages & navigation** για να δημοσιευτεί μια αλλαγή.
- Οι τύποι σελίδας είναι σταθεροί από το κατάστημα. Διάταξη με τύπο που το κατάστημα δεν ζητά ποτέ αποθηκεύεται αλλά δεν αποδίδεται ποτέ.
- Οι θέσεις προτάσεων προϊόντων ρυθμίζονται αλλού, όχι στις διατάξεις σελίδων.

## Σχετικά

- [Πλοήγηση](/el/admin/storefront/navigation)
- [Σελίδες περιεχομένου](/el/admin/storefront/content-pages)
- [Κατηγορίες](/el/admin/catalog/categories)
- [Cache](/el/admin/system/cache)
