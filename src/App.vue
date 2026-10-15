<template>
  <div class="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
    <main class="mx-auto max-w-2xl px-5 py-12 sm:py-24">
      <!-- Header -->
      <header>
        <img
          src="/profile-picture.jpeg"
          alt="Andrew Leach"
          class="h-20 w-20 rounded-full object-cover"
        />
        <h1 class="mt-6 text-3xl font-semibold tracking-tight">Andrew Leach</h1>
        <p class="mt-1 text-gray-500 dark:text-gray-400">Senior Software Engineer · Seattle</p>
        <p class="mt-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          I build backend systems by day and small, useful products on the side.
        </p>
        <nav class="mt-6 flex flex-wrap gap-3 text-sm font-medium">
          <a
            v-for="link in links"
            :key="link.label"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex min-h-11 items-center rounded-full border border-gray-200 px-4 text-purple-600 transition-colors hover:border-purple-500 dark:border-gray-800 dark:text-purple-400 dark:hover:border-purple-400"
          >
            {{ link.label }} ↗
          </a>
        </nav>
      </header>

      <!-- Projects -->
      <section class="mt-12 sm:mt-16">
        <h2 class="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
          Projects
        </h2>
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <a
            v-for="project in projects"
            :key="project.name"
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
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
              {{ project.url.replace('https://', '') }} ↗
            </p>
          </a>
        </div>
      </section>

      <!-- Work -->
      <section class="mt-12 sm:mt-16">
        <h2 class="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
          Work
        </h2>
        <ul class="mt-4 divide-y divide-gray-100 dark:divide-gray-900">
          <li
            v-for="job in jobs"
            :key="job.company"
            class="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
          >
            <span class="font-medium">{{ job.company }}</span>
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ job.title }} · {{ job.period }}</span>
          </li>
        </ul>
      </section>

      <footer class="mt-12 sm:mt-16 text-sm text-gray-500 dark:text-gray-400">
        © {{ currentYear }} Redwood Labs
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
import { projects } from './data/projects'

const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/redwoodlabs' },
  { label: 'Resume', href: '/resume.pdf' }
]

const jobs = [
  { company: 'Credit Acceptance', title: 'Senior Software Engineer', period: '2025–present' },
  { company: 'Praia Health', title: 'Senior Software Engineer', period: '2023–2025' },
  { company: 'REI', title: 'Lead Software Engineer', period: '2020–2022' }
]

const currentYear = new Date().getFullYear()
</script>
