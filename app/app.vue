<template>
  <UApp>
    <div class="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <main class="mx-auto max-w-2xl px-5 py-12 sm:py-24">
        <NuxtPage />
        <footer class="mt-12 sm:mt-16 text-sm text-gray-500 dark:text-gray-400">
          © {{ currentYear }} Redwood Labs
        </footer>
      </main>
    </div>
  </UApp>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
const route = useRoute()
const site = useSiteConfig()
const absolute = (path: string) => new URL(path, site.url + '/').href

useHead({
  link: [{ rel: 'canonical', href: () => absolute(route.path) }],
})

useSchemaOrg([
  definePerson({
    name: profile.name,
    url: absolute('/'),
    image: absolute(profile.image),
    jobTitle: profile.jobTitle,
    worksFor: { '@type': 'Organization', name: profile.jobs[0].company },
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.location.city,
      addressRegion: profile.location.region,
      addressCountry: profile.location.country,
    },
    sameAs: [profile.linkedin],
  }),
])
</script>
