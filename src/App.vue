
<template>
  <div class="min-h-screen bg-slate-50">
    <UContainer>
      <!-- Hero -->
      <section class="py-20">
        <UCard>
          <template #header>
            <h1 class="text-4xl font-bold text-emerald-900">Redwood Labs</h1>
            <p class="mt-4 text-gray-600">Custom Software Solutions for Growing Businesses</p>
          </template>
          <div class="space-y-4">
            <p>We build scalable, maintainable software that grows with your business.</p>
            <div class="flex gap-2">
              <UBadge color="emerald">Web Development</UBadge>
              <UBadge color="emerald">Mobile Apps</UBadge>
              <UBadge color="emerald">Cloud Solutions</UBadge>
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

      <!-- Contact Form -->
      <section class="py-10">
        <UCard>
          <template #header>
            <h2 class="text-2xl font-bold">Get in Touch</h2>
          </template>
          
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <UFormGroup label="Email" required>
              <UInput 
                v-model="email" 
                type="email" 
                placeholder="your@email.com"
                :error="emailError"
              />
            </UFormGroup>
            
            <UButton 
              type="submit" 
              color="emerald" 
              :loading="loading"
            >
              Stay Updated
            </UButton>

            <UAlert
              v-if="submitted"
              color="green"
              title="Thanks for your interest!"
              description="We'll be in touch soon."
            />
          </form>
        </UCard>
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

const email = ref('')
const emailError = ref('')
const loading = ref(false)
const submitted = ref(false)

const handleSubmit = async () => {
  emailError.value = ''
  if (!email.value) {
    emailError.value = 'Email is required'
    return
  }
  
  loading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    submitted.value = true
    email.value = ''
  } catch (error) {
    emailError.value = 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>