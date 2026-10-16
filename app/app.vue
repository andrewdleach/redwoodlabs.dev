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
</script>
