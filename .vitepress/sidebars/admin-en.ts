import type { DefaultTheme } from 'vitepress'

/**
 * Mirrors src/admin/**. The Greek sidebar (admin-el.ts) must keep the same
 * paths under /el/ so the language switcher lands on the translated page.
 */
export const adminSidebarEn: DefaultTheme.SidebarItem[] = [
  {
    text: 'Getting started',
    items: [
      { text: 'Welcome', link: '/admin/' },
      { text: 'Signing in & MFA', link: '/admin/getting-started/login-and-mfa' },
      { text: 'Roles & team', link: '/admin/getting-started/roles-and-team' },
      { text: 'Dashboard', link: '/admin/getting-started/dashboard' },
      { text: 'Search & command palette', link: '/admin/getting-started/search-and-command-palette' },
    ],
  },
  {
    text: 'Catalog',
    items: [
      { text: 'Products', link: '/admin/catalog/products' },
      { text: 'Categories', link: '/admin/catalog/categories' },
      { text: 'Attributes & values', link: '/admin/catalog/attributes-and-values' },
      { text: 'Variant groups', link: '/admin/catalog/variant-groups' },
      { text: 'Reviews', link: '/admin/catalog/reviews' },
      { text: 'Tags', link: '/admin/catalog/tags' },
    ],
  },
  {
    text: 'Storefront',
    items: [
      { text: 'Navigation', link: '/admin/storefront/navigation' },
      { text: 'Content pages', link: '/admin/storefront/content-pages' },
      { text: 'Page layouts', link: '/admin/storefront/page-layouts' },
      { text: 'Email templates', link: '/admin/storefront/email-templates' },
    ],
  },
  {
    text: 'Blog',
    items: [
      { text: 'Posts', link: '/admin/blog/posts' },
      { text: 'Categories, authors & tags', link: '/admin/blog/categories-authors-tags' },
      { text: 'Comments', link: '/admin/blog/comments' },
    ],
  },
  {
    text: 'Sales',
    items: [
      { text: 'Orders', link: '/admin/sales/orders' },
      { text: 'Carts', link: '/admin/sales/carts' },
      { text: 'Invoices', link: '/admin/sales/invoices' },
      { text: 'Payment methods', link: '/admin/sales/payment-methods' },
      { text: 'Promotions', link: '/admin/sales/promotions' },
      { text: 'Coupon codes', link: '/admin/sales/coupon-codes' },
      { text: 'Gift cards', link: '/admin/sales/gift-cards' },
      { text: 'VAT rates', link: '/admin/sales/vat-rates' },
      { text: 'Notifications', link: '/admin/sales/notifications' },
      { text: 'Contact messages & feedback', link: '/admin/sales/contact-and-feedback' },
    ],
  },
  {
    text: 'B2B (wholesale)',
    items: [
      { text: 'Business customers', link: '/admin/b2b/business-customers' },
      { text: 'Customer groups & price lists', link: '/admin/b2b/groups-and-price-lists' },
    ],
  },
  {
    text: 'Shipping',
    items: [
      { text: 'Shipping providers', link: '/admin/shipping/providers' },
      { text: 'ACS Courier', link: '/admin/shipping/acs' },
      { text: 'BoxNow', link: '/admin/shipping/boxnow' },
    ],
  },
  {
    text: 'Customers',
    items: [
      { text: 'Users & addresses', link: '/admin/customers/users-and-addresses' },
      { text: 'Subscriptions', link: '/admin/customers/subscriptions' },
      { text: 'Data exports (GDPR)', link: '/admin/customers/data-exports' },
    ],
  },
  {
    text: 'Loyalty',
    items: [
      { text: 'Tiers & points', link: '/admin/loyalty/tiers-and-points' },
    ],
  },
  {
    text: 'Localization',
    items: [
      { text: 'Languages & translations', link: '/admin/localization/languages-and-translations' },
      { text: 'Countries & regions', link: '/admin/localization/countries-and-regions' },
    ],
  },
  {
    text: 'Settings',
    items: [
      { text: 'Store settings', link: '/admin/settings/store-settings' },
      { text: 'Security & access', link: '/admin/settings/security-and-access' },
    ],
  },
  {
    text: 'System',
    items: [
      { text: 'Audit & logs', link: '/admin/system/audit-and-logs' },
      { text: 'Background jobs', link: '/admin/system/background-jobs' },
      { text: 'Cache', link: '/admin/system/cache' },
      { text: 'Reconciliation', link: '/admin/system/reconciliation' },
    ],
  },
  {
    text: 'Help',
    items: [
      { text: 'FAQ & troubleshooting', link: '/admin/faq' },
    ],
  },
]
