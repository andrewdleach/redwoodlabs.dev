<template>
  <article v-if="post">
    <NuxtLink to="/blog" class="text-sm text-purple-600 hover:underline dark:text-purple-400">← Blog</NuxtLink>
    <header class="mt-6">
      <h1 class="text-3xl font-semibold tracking-tight">{{ post.title }}</h1>
      <time :datetime="post.date" class="mt-2 block text-sm text-gray-500 dark:text-gray-400">{{ formatDate(post.date) }}</time>
    </header>
    <ContentRenderer :value="post" class="mt-10" />
  </article>
</template>

<script setup lang="ts">
const route = useRoute()
const site = useSiteConfig()
const { data: post } = await useAsyncData(route.path, () =>
  queryCollection('blog').path(route.path).first(),
)

if (!post.value || (post.value.draft && !import.meta.dev)) {
  throw createError({ statusCode: 404, statusMessage: 'Not found', fatal: true })
}

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })

useSeoMeta({
  title: post.value.title,
  description: post.value.description,
  ogTitle: post.value.title,
  ogDescription: post.value.description,
  ogType: 'article',
})

useSchemaOrg([
  defineArticle({
    '@type': 'BlogPosting',
    headline: post.value.title,
    description: post.value.description,
    datePublished: post.value.date,
    author: { name: profile.name, url: `${site.url}/` },
  }),
])
</script>
