import { defineConfig } from 'vitepress'
import { mermaidPlugin } from './plugins/mermaid/index.ts'
import { syncedSourcesPlugin } from './plugins/synced-sources/index.ts'
import { adminSidebarEn } from './sidebars/admin-en.ts'
import { adminSidebarEl } from './sidebars/admin-el.ts'
import { devSidebar } from './sidebars/dev.ts'
import { searchLocaleEl } from './locales/el.ts'

export default defineConfig({
  title: 'GrooveShop Docs',
  description: 'GrooveShop platform documentation: tenant admin guide and developer reference.',
  srcDir: 'src',
  outDir: 'dist',
  cleanUrls: true,
  // Deliberately off. VitePress reads per-page timestamps by shelling out to
  // `git log`, which makes the build depend on a git binary AND on full
  // history: the release image builds from a context with no `.git` (it fails
  // with `spawnSync git ENOENT`), and CI checks out shallow, which would stamp
  // every page with the same commit date. Off everywhere keeps local, CI and
  // image builds byte-identical; the "Edit this page on GitHub" link is the
  // route to real history.
  lastUpdated: false,
  // No `editLink` either: the source repository is private, so "Edit this page"
  // would 404 for every tenant admin reading the public guide. Developers work
  // in the repository directly and each dev page names its source files.
  // No `sitemap` option: on this VitePress line it logs success and writes
  // nothing, and it would list the credentialed /dev/ pages. scripts/postbuild.mjs
  // emits sitemap.xml (public pages only, with hreflang pairs) and robots.txt.
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
  ],

  markdown: {
    config(md) {
      md.use(mermaidPlugin)
      md.use(syncedSourcesPlugin)
    },
    // Query languages Shiki has no grammar for. The fences keep their real
    // name (media-stream's observability reference labels them), and render
    // as plain text instead of logging a fallback warning on every build.
    languageAlias: {
      logsql: 'txt',
      promql: 'txt',
    },
  },

  vite: {
    build: {
      // Vite's chunk warning cannot tell a lazy chunk from one every page
      // loads, and the big chunks here are all lazy: the local search index
      // (fetched when search opens) and Mermaid's elk/cytoscape layouts
      // (fetched by the diagrams that use them). scripts/check-initial-load.mjs
      // enforces the budget that matters, on what a page loads up front.
      chunkSizeWarningLimit: Number.POSITIVE_INFINITY,
    },
  },

  /**
   * Links inside the synced per-service reference docs point at source
   * files in their own repository (`../order/models.py`), which do not
   * exist on the site. Everything authored here stays strict: a dead link
   * anywhere else fails the build.
   */
  ignoreDeadLinks: [
    (_url, source) => source.includes('/reference/') || source.includes('\\reference\\'),
  ],

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        nav: [
          { text: 'Admin guide', link: '/admin/', activeMatch: '^/admin/' },
          { text: 'Developer docs', link: '/dev/', activeMatch: '^/dev/' },
        ],
        sidebar: {
          '/admin/': adminSidebarEn,
          '/dev/': devSidebar,
        },
        outline: { level: [2, 3] },
      },
    },
    el: {
      label: 'Ελληνικά',
      lang: 'el-GR',
      link: '/el/',
      title: 'Τεκμηρίωση GrooveShop',
      description: 'Οδηγός διαχείρισης καταστήματος GrooveShop.',
      themeConfig: {
        nav: [
          { text: 'Οδηγός διαχείρισης', link: '/el/admin/', activeMatch: '^/el/admin/' },
        ],
        sidebar: {
          '/el/admin/': adminSidebarEl,
        },
        outline: { level: [2, 3], label: 'Σε αυτή τη σελίδα' },
        docFooter: { prev: 'Προηγούμενο', next: 'Επόμενο' },
        darkModeSwitchLabel: 'Εμφάνιση',
        sidebarMenuLabel: 'Μενού',
        returnToTopLabel: 'Επιστροφή στην κορυφή',
        langMenuLabel: 'Γλώσσα',
        notFound: {
          title: 'Η σελίδα δεν βρέθηκε',
          quote: 'Η σελίδα που ζητήσατε δεν υπάρχει ή μετακινήθηκε.',
          linkLabel: 'Επιστροφή στην αρχική',
          linkText: 'Αρχική',
        },
      },
    },
  },

  themeConfig: {
    logo: '/favicon.svg',
    search: {
      provider: 'local',
      options: {
        locales: { el: searchLocaleEl },
      },
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vasilistotskas' },
    ],
    footer: {
      message: 'GrooveShop platform documentation.',
    },
  },
})
