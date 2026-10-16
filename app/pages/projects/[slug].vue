<template>
  <article v-if="project">
    <NuxtLink to="/" class="text-sm text-purple-600 hover:underline dark:text-purple-400">← Home</NuxtLink>
    <header class="mt-6">
      <div class="flex items-center gap-3">
        <h1 class="text-3xl font-semibold tracking-tight">{{ project.name }}</h1>
        <span class="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          {{ project.status }}
        </span>
      </div>
      <p class="mt-2 text-lg text-gray-700 dark:text-gray-300">{{ project.tagline }}</p>
      <a :href="project.url" target="_blank" rel="noopener noreferrer" class="mt-3 inline-block text-sm font-medium text-purple-600 dark:text-purple-400">
        {{ project.url.replace('https://', '') }} ↗
      </a>
    </header>
    <ContentRenderer :value="project" class="mt-10" />
  </article>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: project } = await useAsyncData(route.path, () =>
  queryCollection('projects').path(route.path).first(),
)

if (!project.value || !hasBody(project.value)) {
  throw createError({ statusCode: 404, statusMessage: 'Not found', fatal: true })
}

useSeoMeta({
  title: `${project.value.name} - ${profile.name}`,
  description: project.value.tagline,
  ogTitle: project.value.name,
  ogDescription: project.value.tagline,
})
</script>
