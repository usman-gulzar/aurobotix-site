// https://nuxt.com/docs/api/configuration/nuxt-config

/**
 * `#nitro-internal-virtual/*` exists only inside Nitro/Rollup — not in nitropack/package.json.
 * If Vite SSR leaves `nitropack/runtime` (or subpaths) as Rollup externals, Node executes
 * `dist/runtime/internal/*.mjs` directly and throws ERR_PACKAGE_IMPORT_NOT_DEFINED.
 * Force bundling by removing those externals everywhere Nuxt/Vite may attach them.
 *
 * Rollup may pass resolved paths like `.../node_modules/nitropack/dist/runtime/internal/app.mjs`,
 * so match package paths as well as bare specifiers.
 */
function forceBundleNitropack(id: string) {
  if (!id) return false
  if (id === 'nitropack' || id.startsWith('nitropack/')) return true
  if (id === 'nitropack/runtime' || id.startsWith('nitropack/runtime/')) return true
  const n = id.replace(/\\/g, '/')
  return n.includes('/nitropack/') && n.includes('/dist/runtime/')
}

function stripNitropackRuntimeExternal(rollupOptions: { external?: unknown } | undefined) {
  if (!rollupOptions) return
  const ext = rollupOptions.external
  if (!ext) return
  if (Array.isArray(ext)) {
    rollupOptions.external = ext.filter((e) => {
      if (typeof e === 'string') return !forceBundleNitropack(e)
      return true
    })
    return
  }
  if (typeof ext === 'function') {
    const prev = ext as (id: string, importer?: string, isResolved?: boolean) => boolean | void
    rollupOptions.external = (id: string, importer?: string, isResolved?: boolean) => {
      if (forceBundleNitropack(id)) return false
      return prev(id, importer, isResolved ?? false)
    }
  }
}

function patchSsrRollupExternals(config: { build?: { rollupOptions?: { external?: unknown } }; environments?: { ssr?: { build?: { rollupOptions?: { external?: unknown } } } } }) {
  stripNitropackRuntimeExternal(config.build?.rollupOptions)
  stripNitropackRuntimeExternal(config.environments?.ssr?.build?.rollupOptions)
  // Vite 7 multi-environment: patch any env that looks like SSR server build
  const envs = (config as { environments?: Record<string, { build?: { rollupOptions?: { external?: unknown } } }> }).environments
  if (envs && typeof envs === 'object') {
    for (const key of Object.keys(envs)) {
      if (key === 'ssr' || key.includes('ssr')) {
        stripNitropackRuntimeExternal(envs[key]?.build?.rollupOptions)
      }
    }
  }
}

export default defineNuxtConfig({
  hooks: {
    // Run early so downstream plugins see the patched externals list.
    'vite:extendConfig'(config, { isServer }) {
      if (!isServer) return
      patchSsrRollupExternals(config)
    },
    // Run after Nuxt/Vite merge — prevents regressions when another fix or plugin re-adds externals.
    'vite:configResolved'(config, { isServer }) {
      if (!isServer) return
      patchSsrRollupExternals(config as import('vite').UserConfig)
    },
  },

  devtools: { enabled: true },

  // SSR enabled for SEO
  ssr: true,

  modules: ['@vueuse/nuxt'],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',

      // Primary Meta
      title: 'aurobotix.com — IT Services & Digital Solutions',
      meta: [
        { name: 'description', content: 'aurobotix.com delivers enterprise IT services: custom software, cloud architecture, cybersecurity, integration, consulting, and managed support.' },
        { name: 'keywords', content: 'IT services, software development, cloud consulting, cybersecurity, DevOps, digital transformation, systems integration, managed IT, aurobotix' },
        { name: 'author', content: 'aurobotix.com' },
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#1e4ba8' },

        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://aurobotix.com/' },
        { property: 'og:title', content: 'aurobotix.com — Technology Partner for Modern Business' },
        { property: 'og:description', content: 'Custom software, cloud platforms, integration, and strategic IT consulting — delivered with clarity and operational discipline.' },
        { property: 'og:image', content: 'https://aurobotix.com/og-image.png' },
        { property: 'og:site_name', content: 'aurobotix.com' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@aurobotix' },
        { name: 'twitter:title', content: 'aurobotix.com — IT Services & Consulting' },
        { name: 'twitter:description', content: 'Software engineering, cloud, security, and integration services for enterprises that need dependable delivery.' },
        { name: 'twitter:image', content: 'https://aurobotix.com/og-image.png' },
      ],

      link: [
        { rel: 'canonical', href: 'https://aurobotix.com/' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap'
        }
      ],

      script: [
        // JSON-LD Structured Data
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'aurobotix.com',
            alternateName: 'Aurobotix',
            url: 'https://aurobotix.com',
            logo: 'https://aurobotix.com/logo.png',
            description: 'aurobotix.com provides IT consulting, custom software development, cloud architecture, cybersecurity, integration, and managed technology services.',
            contactPoint: {
              '@type': 'ContactPoint',
              email: 'hello@aurobotix.com',
              contactType: 'customer service'
            },
            sameAs: [
              'https://linkedin.com/company/aurobotix',
              'https://twitter.com/aurobotix'
            ],
            offers: {
              '@type': 'Offer',
              description: 'Custom Software Development, Cloud Architecture & DevOps, Cybersecurity & Compliance, Integration & Data Platforms, IT Consulting, Managed Services'
            }
          })
        }
      ]
    }
  },

  css: ['~/assets/css/global.css'],

  // Avoid EMFILE on low ulimit (e.g. many watchers over node_modules paths)
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 800,
        ignored: ['**/node_modules/**', '**/.git/**', '**/.output/**'],
      },
    },
    // Bundle nitropack + Nuxt nitro-server so Rollup inlines virtual imports (see hooks).
    ssr: {
      noExternal: ['nitropack', '@nuxt/nitro-server', /^nitropack(\/|$)/, /^@nuxt\/nitro-server(\/|$)/],
    },
  },

  // Nitro for static generation
  nitro: {
    preset: 'cloudflare-module',
    prerender: {
      routes: ['/'],
      crawlLinks: true
  }
}
})
