import type { DefaultTheme } from 'vitepress'

/**
 * Mirrors src/admin/**, grouped and ordered like the store admin's own
 * sidebar. The Greek sidebar (admin-el.ts) must keep the same paths under
 * /el/ so the language switcher lands on the translated page.
 */
export const adminSidebarEn: DefaultTheme.SidebarItem[] = [
  {
    text: 'Getting started',
    items: [
      { text: 'Welcome', link: '/admin/' },
      { text: 'Signing in', link: '/admin/getting-started/sign-in' },
      { text: 'Roles & team', link: '/admin/getting-started/roles-and-team' },
      { text: 'Dashboard', link: '/admin/getting-started/dashboard' },
      { text: 'Search & command palette', link: '/admin/getting-started/search-and-command-palette' },
    ],
  },
  {
    text: 'Sales',
    items: [
      { text: 'Orders', link: '/admin/sales/orders' },
      { text: 'Receipts & credit documents', link: '/admin/sales/receipts' },
      { text: 'Carts', link: '/admin/sales/carts' },
    ],
  },
  {
    text: 'Catalog',
    items: [
      { text: 'Products', link: '/admin/catalog/products' },
      { text: 'Categories', link: '/admin/catalog/categories' },
      { text: 'Attributes & values', link: '/admin/catalog/attributes-and-values' },
      { text: 'Variant groups', link: '/admin/catalog/variant-groups' },
      { text: 'Tags', link: '/admin/catalog/tags' },
      { text: 'Reviews', link: '/admin/catalog/reviews' },
    ],
  },
  {
    text: 'Customers',
    items: [
      { text: 'Customers & addresses', link: '/admin/customers/users-and-addresses' },
      { text: 'Messages & feedback', link: '/admin/customers/messages-and-feedback' },
      { text: 'Notifications', link: '/admin/customers/notifications' },
      { text: 'Business customers', link: '/admin/customers/business-customers' },
      { text: 'Customer groups & price lists', link: '/admin/customers/groups-and-price-lists' },
      { text: 'Loyalty', link: '/admin/customers/loyalty' },
      { text: 'Newsletter subscriptions', link: '/admin/customers/subscriptions' },
      { text: 'Data requests (GDPR)', link: '/admin/customers/data-exports' },
    ],
  },
  {
    text: 'Marketing',
    items: [
      { text: 'Promotions', link: '/admin/marketing/promotions' },
      { text: 'Coupon codes', link: '/admin/marketing/coupon-codes' },
      { text: 'Gift cards', link: '/admin/marketing/gift-cards' },
    ],
  },
  {
    text: 'Content',
    items: [
      { text: 'Pages', link: '/admin/content/pages' },
      { text: 'Menus', link: '/admin/content/menus' },
      { text: 'Page layouts', link: '/admin/content/page-layouts' },
      {
        text: 'Blog',
        items: [
          { text: 'Posts', link: '/admin/content/blog/posts' },
          { text: 'Categories, authors & tags', link: '/admin/content/blog/categories-authors-tags' },
          { text: 'Comments', link: '/admin/content/blog/comments' },
        ],
      },
    ],
  },
  {
    text: 'Shipping',
    items: [
      { text: 'ACS Courier', link: '/admin/shipping/acs' },
      { text: 'BoxNow', link: '/admin/shipping/boxnow' },
    ],
  },
  {
    text: 'Settings',
    items: [
      { text: 'Store settings', link: '/admin/settings/store-settings' },
      { text: 'Payment methods', link: '/admin/settings/payment-methods' },
      { text: 'Shipping providers', link: '/admin/settings/shipping-providers' },
      { text: 'VAT rates', link: '/admin/settings/vat-rates' },
      { text: 'Email templates', link: '/admin/settings/email-templates' },
      { text: 'Languages & translations', link: '/admin/settings/languages-and-translations' },
      { text: 'Cache', link: '/admin/settings/cache' },
    ],
  },
  {
    text: 'Help',
    items: [
      { text: 'What happens automatically', link: '/admin/help/automatic-tasks' },
      { text: 'FAQ & troubleshooting', link: '/admin/faq' },
    ],
  },
  {
    text: 'Platform team only',
    collapsed: true,
    items: [
      { text: 'Security & access', link: '/admin/settings/security-and-access' },
      { text: 'Audit & logs', link: '/admin/system/audit-and-logs' },
      { text: 'Reconciliation', link: '/admin/system/reconciliation' },
      { text: 'Countries & regions', link: '/admin/localization/countries-and-regions' },
    ],
  },
]
