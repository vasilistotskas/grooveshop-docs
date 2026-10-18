import type { DefaultTheme } from 'vitepress'

/** Same paths as admin-en.ts under /el/ — keep the two in lockstep. */
export const adminSidebarEl: DefaultTheme.SidebarItem[] = [
  {
    text: 'Ξεκινώντας',
    items: [
      { text: 'Καλώς ήρθατε', link: '/el/admin/' },
      { text: 'Σύνδεση', link: '/el/admin/getting-started/sign-in' },
      { text: 'Ρόλοι & ομάδα', link: '/el/admin/getting-started/roles-and-team' },
      { text: 'Πίνακας ελέγχου', link: '/el/admin/getting-started/dashboard' },
      { text: 'Αναζήτηση & παλέτα εντολών', link: '/el/admin/getting-started/search-and-command-palette' },
    ],
  },
  {
    text: 'Πωλήσεις',
    items: [
      { text: 'Παραγγελίες', link: '/el/admin/sales/orders' },
      { text: 'Αποδείξεις & πιστωτικά', link: '/el/admin/sales/receipts' },
      { text: 'Καλάθια', link: '/el/admin/sales/carts' },
    ],
  },
  {
    text: 'Κατάλογος',
    items: [
      { text: 'Προϊόντα', link: '/el/admin/catalog/products' },
      { text: 'Κατηγορίες', link: '/el/admin/catalog/categories' },
      { text: 'Χαρακτηριστικά & τιμές', link: '/el/admin/catalog/attributes-and-values' },
      { text: 'Ομάδες παραλλαγών', link: '/el/admin/catalog/variant-groups' },
      { text: 'Ετικέτες', link: '/el/admin/catalog/tags' },
      { text: 'Κριτικές', link: '/el/admin/catalog/reviews' },
    ],
  },
  {
    text: 'Πελάτες',
    items: [
      { text: 'Πελάτες & διευθύνσεις', link: '/el/admin/customers/users-and-addresses' },
      { text: 'Μηνύματα & feedback', link: '/el/admin/customers/messages-and-feedback' },
      { text: 'Ειδοποιήσεις', link: '/el/admin/customers/notifications' },
      { text: 'Εταιρικοί πελάτες', link: '/el/admin/customers/business-customers' },
      { text: 'Ομάδες πελατών & τιμοκατάλογοι', link: '/el/admin/customers/groups-and-price-lists' },
      { text: 'Πιστότητα', link: '/el/admin/customers/loyalty' },
      { text: 'Συνδρομές newsletter', link: '/el/admin/customers/subscriptions' },
      { text: 'Αιτήματα δεδομένων (GDPR)', link: '/el/admin/customers/data-exports' },
    ],
  },
  {
    text: 'Marketing',
    items: [
      { text: 'Προσφορές', link: '/el/admin/marketing/promotions' },
      { text: 'Κωδικοί κουπονιών', link: '/el/admin/marketing/coupon-codes' },
      { text: 'Δωροκάρτες', link: '/el/admin/marketing/gift-cards' },
    ],
  },
  {
    text: 'Περιεχόμενο',
    items: [
      { text: 'Σελίδες', link: '/el/admin/content/pages' },
      { text: 'Μενού', link: '/el/admin/content/menus' },
      { text: 'Διατάξεις σελίδων', link: '/el/admin/content/page-layouts' },
      {
        text: 'Blog',
        items: [
          { text: 'Άρθρα', link: '/el/admin/content/blog/posts' },
          { text: 'Κατηγορίες, συντάκτες & ετικέτες', link: '/el/admin/content/blog/categories-authors-tags' },
          { text: 'Σχόλια', link: '/el/admin/content/blog/comments' },
        ],
      },
    ],
  },
  {
    text: 'Μεταφορικά',
    items: [
      { text: 'ACS Courier', link: '/el/admin/shipping/acs' },
      { text: 'BoxNow', link: '/el/admin/shipping/boxnow' },
    ],
  },
  {
    text: 'Ρυθμίσεις',
    items: [
      { text: 'Ρυθμίσεις καταστήματος', link: '/el/admin/settings/store-settings' },
      { text: 'Μέθοδοι πληρωμής', link: '/el/admin/settings/payment-methods' },
      { text: 'Πάροχοι αποστολών', link: '/el/admin/settings/shipping-providers' },
      { text: 'Συντελεστές ΦΠΑ', link: '/el/admin/settings/vat-rates' },
      { text: 'Πρότυπα email', link: '/el/admin/settings/email-templates' },
      { text: 'Γλώσσες & μεταφράσεις', link: '/el/admin/settings/languages-and-translations' },
      { text: 'Cache', link: '/el/admin/settings/cache' },
    ],
  },
  {
    text: 'Βοήθεια',
    items: [
      { text: 'Τι γίνεται αυτόματα', link: '/el/admin/help/automatic-tasks' },
      { text: 'Συχνές ερωτήσεις & προβλήματα', link: '/el/admin/faq' },
    ],
  },
  {
    text: 'Μόνο για την ομάδα της πλατφόρμας',
    collapsed: true,
    items: [
      { text: 'Ασφάλεια & πρόσβαση', link: '/el/admin/settings/security-and-access' },
      { text: 'Καταχωρήσεις & Logs', link: '/el/admin/system/audit-and-logs' },
      { text: 'Συμφωνίες', link: '/el/admin/system/reconciliation' },
      { text: 'Χώρες & περιοχές', link: '/el/admin/localization/countries-and-regions' },
    ],
  },
]
