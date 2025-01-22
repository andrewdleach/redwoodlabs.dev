
<template>
  <div class="min-h-screen bg-slate-50">
    <UContainer>
      <!-- Hero -->
      <section class="py-20">
        <UCard>
          <template #header>
            <h1 class="text-4xl font-bold text-primary-900">Redwood Labs</h1>
            <p class="mt-4 text-gray-600">Custom Software Solutions for Growing Businesses</p>
          </template>
          <div class="space-y-4">
            <p>We build scalable, maintainable software that grows with your business.</p>
            <div class="flex gap-2">
              <UBadge>Web Development</UBadge>
              <UBadge>Mobile Apps</UBadge>
              <UBadge>Cloud Solutions</UBadge>
            </div>
          </div>
        </UCard>
      </section>

      <!-- Services -->
      <section class="py-10">
        <div class="grid md:grid-cols-3 gap-6">
          <UCard v-for="service in services" :key="service.id">
            <template #header>
              <h3 class="text-xl font-semibold">{{ service.title }}</h3>
            </template>
            <p class="text-gray-600">{{ service.description }}</p>
          </UCard>
        </div>
      </section>
    </UContainer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const services = [
  {
    id: 1,
    title: 'Custom Development',
    description: 'Tailored software solutions designed for your specific business needs.'
  },
  {
    id: 2,
    title: 'Cloud Architecture',
    description: 'Scalable cloud infrastructure built for performance and reliability.'
  },
  {
    id: 3,
    title: 'Technical Consulting',
    description: 'Expert guidance on technology strategy and implementation.'
  }
]
</script>