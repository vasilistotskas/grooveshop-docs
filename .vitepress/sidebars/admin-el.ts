import type { DefaultTheme } from 'vitepress'

/** Same paths as admin-en.ts under /el/ — keep the two in lockstep. */
export const adminSidebarEl: DefaultTheme.SidebarItem[] = [
  {
    text: 'Ξεκινώντας',
    items: [
      { text: 'Καλώς ήρθατε', link: '/el/admin/' },
      { text: 'Σύνδεση & MFA', link: '/el/admin/getting-started/login-and-mfa' },
      { text: 'Ρόλοι & ομάδα', link: '/el/admin/getting-started/roles-and-team' },
      { text: 'Πίνακας ελέγχου', link: '/el/admin/getting-started/dashboard' },
      { text: 'Αναζήτηση & παλέτα εντολών', link: '/el/admin/getting-started/search-and-command-palette' },
    ],
  },
  {
    text: 'Κατάλογος',
    items: [
      { text: 'Προϊόντα', link: '/el/admin/catalog/products' },
      { text: 'Κατηγορίες', link: '/el/admin/catalog/categories' },
      { text: 'Χαρακτηριστικά & τιμές', link: '/el/admin/catalog/attributes-and-values' },
      { text: 'Ομάδες παραλλαγών', link: '/el/admin/catalog/variant-groups' },
      { text: 'Κριτικές', link: '/el/admin/catalog/reviews' },
      { text: 'Ετικέτες', link: '/el/admin/catalog/tags' },
    ],
  },
  {
    text: 'Κατάστημα',
    items: [
      { text: 'Πλοήγηση', link: '/el/admin/storefront/navigation' },
      { text: 'Σελίδες περιεχομένου', link: '/el/admin/storefront/content-pages' },
      { text: 'Διατάξεις σελίδων', link: '/el/admin/storefront/page-layouts' },
      { text: 'Πρότυπα email', link: '/el/admin/storefront/email-templates' },
    ],
  },
  {
    text: 'Blog',
    items: [
      { text: 'Άρθρα', link: '/el/admin/blog/posts' },
      { text: 'Κατηγορίες, συντάκτες & ετικέτες', link: '/el/admin/blog/categories-authors-tags' },
      { text: 'Σχόλια', link: '/el/admin/blog/comments' },
    ],
  },
  {
    text: 'Πωλήσεις',
    items: [
      { text: 'Παραγγελίες', link: '/el/admin/sales/orders' },
      { text: 'Καλάθια', link: '/el/admin/sales/carts' },
      { text: 'Αποδείξεις', link: '/el/admin/sales/receipts' },
      { text: 'Τρόποι πληρωμής', link: '/el/admin/sales/payment-methods' },
      { text: 'Προσφορές', link: '/el/admin/sales/promotions' },
      { text: 'Κωδικοί κουπονιών', link: '/el/admin/sales/coupon-codes' },
      { text: 'Δωροκάρτες', link: '/el/admin/sales/gift-cards' },
      { text: 'Συντελεστές ΦΠΑ', link: '/el/admin/sales/vat-rates' },
      { text: 'Ειδοποιήσεις', link: '/el/admin/sales/notifications' },
      { text: 'Μηνύματα επικοινωνίας & feedback', link: '/el/admin/sales/contact-and-feedback' },
    ],
  },
  {
    text: 'B2B (χονδρική)',
    items: [
      { text: 'Επιχειρηματικοί πελάτες', link: '/el/admin/b2b/business-customers' },
      { text: 'Ομάδες πελατών & τιμοκατάλογοι', link: '/el/admin/b2b/groups-and-price-lists' },
    ],
  },
  {
    text: 'Αποστολές',
    items: [
      { text: 'Πάροχοι αποστολών', link: '/el/admin/shipping/providers' },
      { text: 'ACS Courier', link: '/el/admin/shipping/acs' },
      { text: 'BoxNow', link: '/el/admin/shipping/boxnow' },
    ],
  },
  {
    text: 'Πελάτες',
    items: [
      { text: 'Χρήστες & διευθύνσεις', link: '/el/admin/customers/users-and-addresses' },
      { text: 'Συνδρομές', link: '/el/admin/customers/subscriptions' },
      { text: 'Εξαγωγές δεδομένων (GDPR)', link: '/el/admin/customers/data-exports' },
    ],
  },
  {
    text: 'Πρόγραμμα επιβράβευσης',
    items: [
      { text: 'Βαθμίδες & πόντοι', link: '/el/admin/loyalty/tiers-and-points' },
    ],
  },
  {
    text: 'Τοπικοποίηση',
    items: [
      { text: 'Γλώσσες & μεταφράσεις', link: '/el/admin/localization/languages-and-translations' },
      { text: 'Χώρες & περιοχές', link: '/el/admin/localization/countries-and-regions' },
    ],
  },
  {
    text: 'Ρυθμίσεις',
    items: [
      { text: 'Ρυθμίσεις καταστήματος', link: '/el/admin/settings/store-settings' },
      { text: 'Ασφάλεια & πρόσβαση', link: '/el/admin/settings/security-and-access' },
    ],
  },
  {
    text: 'Σύστημα',
    items: [
      { text: 'Έλεγχος & αρχεία καταγραφής', link: '/el/admin/system/audit-and-logs' },
      { text: 'Εργασίες παρασκηνίου', link: '/el/admin/system/background-jobs' },
      { text: 'Cache', link: '/el/admin/system/cache' },
      { text: 'Συμφωνίες', link: '/el/admin/system/reconciliation' },
    ],
  },
  {
    text: 'Βοήθεια',
    items: [
      { text: 'Συχνές ερωτήσεις & επίλυση προβλημάτων', link: '/el/admin/faq' },
    ],
  },
]
