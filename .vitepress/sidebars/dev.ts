import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import type { DefaultTheme } from 'vitepress'

/**
 * Written by scripts/sync-sources.mjs: one sidebar group per synced
 * service, listing the copied reference pages. Absent until the first
 * sync, in which case the reference groups are simply omitted.
 */
const manifestPath = fileURLToPath(new URL('../generated/reference-manifest.json', import.meta.url))

interface ManifestGroup {
  id: string
  title: string
  base: string
  items: { text: string, link: string }[]
}

function referenceGroups(): DefaultTheme.SidebarItem[] {
  if (!existsSync(manifestPath)) return []
  const groups = JSON.parse(readFileSync(manifestPath, 'utf8')) as ManifestGroup[]
  return groups.map(g => ({
    text: g.title,
    collapsed: true,
    items: g.items,
  }))
}

export const devSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'Start here',
    items: [
      { text: 'How to use these docs', link: '/dev/' },
    ],
  },
  {
    text: 'Platform',
    items: [
      { text: 'Overview', link: '/dev/platform/overview' },
      { text: 'Architecture', link: '/dev/platform/architecture' },
      { text: 'Multi-tenancy', link: '/dev/platform/multi-tenancy' },
      { text: 'Environments & domains', link: '/dev/platform/environments' },
      { text: 'Security model', link: '/dev/platform/security' },
    ],
  },
  {
    text: 'Flows',
    items: [
      { text: 'Checkout & payment', link: '/dev/flows/checkout-and-payment' },
      { text: 'Order lifecycle', link: '/dev/flows/order-lifecycle' },
      { text: 'Shipping', link: '/dev/flows/shipping' },
      { text: 'Notifications & email', link: '/dev/flows/notifications-and-email' },
      { text: 'Search', link: '/dev/flows/search' },
      { text: 'Recommendations', link: '/dev/flows/recommendations' },
      { text: 'Promotions & gift cards', link: '/dev/flows/promotions-and-gift-cards' },
      { text: 'B2B', link: '/dev/flows/b2b' },
      { text: 'Loyalty', link: '/dev/flows/loyalty' },
      { text: 'Agentic commerce', link: '/dev/flows/agentic-commerce' },
      { text: 'Analytics & consent', link: '/dev/flows/analytics-and-consent' },
      { text: 'Store-editable texts', link: '/dev/flows/store-texts' },
    ],
  },
  {
    text: 'Django API',
    items: [
      { text: 'App map', link: '/dev/django/app-map' },
      { text: 'Base classes & patterns', link: '/dev/django/patterns' },
      { text: 'API conventions', link: '/dev/django/api-conventions' },
      { text: 'Admin (Unfold)', link: '/dev/django/admin' },
      { text: 'Celery & background jobs', link: '/dev/django/celery' },
      { text: 'Testing', link: '/dev/django/testing' },
      { text: 'OpenAPI contract', link: '/dev/django/openapi-contract' },
    ],
  },
  ...referenceGroups(),
  {
    text: 'Platform operator',
    items: [
      { text: 'The control plane', link: '/dev/operator/' },
      { text: 'Onboarding a store', link: '/dev/operator/onboarding' },
      { text: 'The tenant record', link: '/dev/operator/tenants' },
      { text: 'Domains & certificates', link: '/dev/operator/domains' },
      { text: 'Plans, billing & dunning', link: '/dev/operator/billing' },
      { text: 'Suspend, export & destroy', link: '/dev/operator/lifecycle' },
      { text: 'Platform staff & access', link: '/dev/operator/team' },
      { text: 'Scheduled work & platform data', link: '/dev/operator/background-jobs' },
      { text: 'Audit & logs', link: '/dev/operator/audit-and-logs' },
      { text: 'Reconciliation', link: '/dev/operator/reconciliation' },
    ],
  },
  {
    text: 'Operations',
    items: [
      { text: 'Deploying', link: '/dev/operations/deploying' },
      { text: 'Staging', link: '/dev/operations/staging' },
      { text: 'Caches & purging', link: '/dev/operations/caches' },
      { text: 'Secrets', link: '/dev/operations/secrets' },
      { text: 'Backups', link: '/dev/operations/backups' },
      { text: 'Monitoring & alerting', link: '/dev/operations/monitoring' },
    ],
  },
  {
    text: 'API',
    items: [
      { text: 'REST API reference', link: '/dev/api/' },
    ],
  },
  {
    text: 'Other services',
    collapsed: true,
    items: [
      { text: 'Storefront (Nuxt)', link: '/dev/nuxt/' },
      { text: 'Agent gateway (Go)', link: '/dev/gateway/' },
      { text: 'Media stream (NestJS)', link: '/dev/media/' },
      { text: 'Infrastructure', link: '/dev/infra/' },
    ],
  },
]
