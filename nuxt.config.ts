export default defineNuxtConfig({
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml', '/robots.txt']
    }
  },
  ui: {
    primary: 'purple',
    gray: 'cool',
    icons: {
      dynamic: true
    }
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: 'favicon.svg' }
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Andrew Leach - Senior Software Engineer specializing in scalable systems and cloud architecture' }
      ]
    }
  },
  devtools: {
    enabled: true
  }
})