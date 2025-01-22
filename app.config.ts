export default defineAppConfig({
    ui: {
      primary: 'purple',
      gray: 'cool'
    },
    app: {
        head: {
          link: [
            { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
          ]
        }
      }
  })