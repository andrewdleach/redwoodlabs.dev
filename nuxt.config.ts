export default defineNuxtConfig({
  compatibilityDate: '2026-10-16',
  modules: ['@nuxt/ui', '@nuxt/content', '@nuxtjs/sitemap', '@nuxtjs/robots', 'nuxt-schema-org'],
  css: ['~/assets/css/main.css'],
  app: { head: { htmlAttrs: { lang: 'en' } } },
  site: { url: 'https://www.redwoodlabs.dev', name: 'Andrew Leach' },
  content: { experimental: { sqliteConnector: 'native' } },
  nitro: { prerender: { crawlLinks: true, routes: ['/'] } },
})
