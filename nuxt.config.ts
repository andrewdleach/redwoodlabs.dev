import { hasPublishedPosts } from './lib/hasPublishedPosts'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-16',
  modules: ['@nuxt/ui', '@nuxt/content', '@nuxtjs/sitemap', '@nuxtjs/robots', 'nuxt-schema-org'],
  css: ['~/assets/css/main.css'],
  app: { head: { htmlAttrs: { lang: 'en' } } },
  site: {
    url: 'https://www.redwoodlabs.dev',
    name: 'Andrew Leach',
    indexable: process.env.VERCEL_ENV ? process.env.VERCEL_ENV === 'production' : true,
  },
  content: { experimental: { sqliteConnector: 'native' } },
  sitemap: { excludeAppSources: ['nuxt:pages'] },
  nitro: {
    prerender: { crawlLinks: true, routes: ['/'], ignore: hasPublishedPosts() ? [] : ['/blog'] },
  },
})
