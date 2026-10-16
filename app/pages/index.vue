<template>
  <div>
    <header>
      <img :src="profile.image" :alt="profile.name" class="h-20 w-20 rounded-full object-cover" />
      <h1 class="mt-6 text-3xl font-semibold tracking-tight">{{ profile.name }}</h1>
      <p class="mt-1 text-gray-500 dark:text-gray-400">{{ profile.jobTitle }} · {{ profile.location.city }}</p>
      <p class="mt-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        {{ profile.bio }}
      </p>
      <nav class="mt-6 flex flex-wrap gap-3 text-sm font-medium">
        <a
          v-for="link in profile.links"
          :key="link.label"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          :class="pill"
        >
          {{ link.label }} ↗
        </a>
        <NuxtLink v-if="postCount" to="/blog" :class="pill">Blog</NuxtLink>
      </nav>
    </header>

    <section class="mt-12 sm:mt-16">
      <h2 class="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
        Projects
      </h2>
      <div class="mt-4 grid gap-4 sm:grid-cols-2">
        <NuxtLink
          v-for="project in projects"
          :key="project.path"
          :to="hasBody(project) ? project.path : project.url"
          :target="hasBody(project) ? undefined : '_blank'"
          class="group block rounded-xl border border-gray-200 p-5 transition-colors hover:border-purple-500 dark:border-gray-800 dark:hover:border-purple-400"
        >
          <div class="flex items-center justify-between gap-3">
            <h3 class="font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400">
              {{ project.name }}
            </h3>
            <span class="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              {{ project.status }}
            </span>
          </div>
          <p class="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {{ project.tagline }}
          </p>
          <p class="mt-3 text-sm font-medium text-purple-600 dark:text-purple-400">
            {{ hasBody(project) ? 'Read more →' : `${project.url.replace('https://', '')} ↗` }}
          </p>
        </NuxtLink>
      </div>
    </section>

    <section class="mt-12 sm:mt-16">
      <h2 class="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
        Work
      </h2>
      <ul class="mt-4 divide-y divide-gray-100 dark:divide-gray-900">
        <li
          v-for="job in profile.jobs"
          :key="job.company"
          class="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
        >
          <span class="font-medium">{{ job.company }}</span>
          <span class="text-sm text-gray-500 dark:text-gray-400">{{ job.title }} · {{ job.period }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
const site = useSiteConfig()
const title = `${profile.name} - ${profile.jobTitle}`

useSeoMeta({
  title,
  description: profile.description,
  ogTitle: title,
  ogDescription: profile.description,
  ogType: 'website',
  ogUrl: `${site.url}/`,
  ogImage: `${site.url}${profile.image}`,
  twitterCard: 'summary',
  twitterTitle: title,
  twitterDescription: profile.description,
})

const pill = 'inline-flex min-h-11 items-center rounded-full border border-gray-200 px-4 text-purple-600 transition-colors hover:border-purple-500 dark:border-gray-800 dark:text-purple-400 dark:hover:border-purple-400'

const { data: postCount } = await useAsyncData('blog-count', () => publishedPosts().count())

const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('projects').order('order', 'ASC').all(),
)
</script>
