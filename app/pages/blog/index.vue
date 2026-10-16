<template>
  <div>
    <NuxtLink to="/" class="text-sm text-purple-600 hover:underline dark:text-purple-400">← Home</NuxtLink>
    <h1 class="mt-6 text-3xl font-semibold tracking-tight">Blog</h1>
    <ul class="mt-8 divide-y divide-gray-100 dark:divide-gray-900">
      <li v-for="post in posts" :key="post.path" class="py-4">
        <NuxtLink :to="post.path" class="group block">
          <span class="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400">{{ post.title }}</span>
          <span v-if="post.draft" class="ml-2 text-xs text-amber-600">draft</span>
          <time :datetime="post.date" class="block text-sm text-gray-500 dark:text-gray-400">{{ formatDate(post.date) }}</time>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">{{ post.description }}</p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { data: posts } = await useAsyncData('blog-index', () => publishedPosts().all())

if (!posts.value?.length) {
  throw createError({ statusCode: 404, statusMessage: 'Not found', fatal: true })
}

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })

useSeoMeta({
  title: `Blog - ${profile.name}`,
  description: `Writing by ${profile.name}.`,
})
</script>
