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
      { text: 'First steps', link: '/admin/getting-started/first-steps' },
      { text: 'Sign-in & password', link: '/admin/getting-started/sign-in' },
      { text: 'Roles & team', link: '/admin/getting-started/roles-and-team' },
      { text: 'Dashboard', link: '/admin/getting-started/dashboard' },
      { text: 'Search & command palette', link: '/admin/getting-started/search-and-command-palette' },
    ],
  },
  {
    text: 'Sales',
    items: [
      { text: 'Orders', link: '/admin/sales/orders' },
      { text: 'Refunds and disputes', link: '/admin/sales/refunds-and-disputes' },
      { text: 'Order source', link: '/admin/sales/order-source' },
      { text: 'Receipts and credit documents', link: '/admin/sales/receipts' },
      { text: 'Carts', link: '/admin/sales/carts' },
    ],
  },
  {
    text: 'Catalog',
    items: [
      { text: 'Products', link: '/admin/catalog/products' },
      { text: 'Categories', link: '/admin/catalog/categories' },
      { text: 'Brands', link: '/admin/catalog/brands' },
      { text: 'Attributes & values', link: '/admin/catalog/attributes-and-values' },
      { text: 'Variant groups', link: '/admin/catalog/variant-groups' },
      { text: 'Images', link: '/admin/catalog/images' },
      { text: 'Tags', link: '/admin/catalog/tags' },
      { text: 'Reviews', link: '/admin/catalog/reviews' },
    ],
  },
  {
    text: 'Customers',
    items: [
      { text: 'Customers & addresses', link: '/admin/customers/users-and-addresses' },
      { text: 'Messages & Feedback', link: '/admin/customers/messages-and-feedback' },
      { text: 'Favourites', link: '/admin/customers/favourites' },
      { text: 'Product alerts', link: '/admin/customers/product-alerts' },
      { text: 'Notifications', link: '/admin/customers/notifications' },
      { text: 'Business customers', link: '/admin/customers/business-customers' },
      { text: 'Customer groups & price lists', link: '/admin/customers/groups-and-price-lists' },
      { text: 'Loyalty', link: '/admin/customers/loyalty' },
      { text: 'Newsletter subscriptions', link: '/admin/customers/subscriptions' },
      { text: 'Data export (GDPR)', link: '/admin/customers/data-exports' },
    ],
  },
  {
    text: 'Marketing',
    items: [
      { text: 'Promotions', link: '/admin/marketing/promotions' },
      { text: 'Coupon codes', link: '/admin/marketing/coupon-codes' },
      { text: 'Redemptions', link: '/admin/marketing/redemptions' },
      { text: 'Gift cards', link: '/admin/marketing/gift-cards' },
      { text: 'Recommendations', link: '/admin/marketing/recommendations' },
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
      { text: 'Daily shipping routine', link: '/admin/shipping/daily-routine' },
      { text: 'ACS Courier', link: '/admin/shipping/acs' },
      { text: 'BoxNow', link: '/admin/shipping/boxnow' },
    ],
  },
  {
    text: 'Settings',
    items: [
      { text: 'Store profile', link: '/admin/settings/store-profile' },
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
      { text: 'Automatic tasks', link: '/admin/help/automatic-tasks' },
      { text: 'FAQ', link: '/admin/faq' },
      { text: 'When to contact support', link: '/admin/help/contact-support' },
    ],
  },
]
