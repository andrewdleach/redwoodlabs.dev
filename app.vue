<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
    <UContainer class="py-12">
      <!-- Hero Section -->
      <section class="py-16">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <UBadge color="primary" variant="soft" size="lg" class="mb-6">
              Senior Software Engineer
            </UBadge>
            <h1 class="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Building Scalable Systems That 
              <span class="text-primary-500">Drive Results</span>
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              I'm Andrew Leach, a Senior Software Engineer specializing in transforming complex legacy systems into modern, performant architectures. 
              From API optimization achieving 50%+ latency reduction to cloud migrations serving 20+ services, 
              I deliver measurable improvements that scale.
            </p>
            <div class="flex flex-wrap gap-4">
              <a 
                href="https://www.linkedin.com/in/redwoodlabs"
                target="_blank"
                rel="noopener noreferrer"
                class="px-6 py-3 text-lg font-semibold rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors inline-flex items-center gap-2"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.553-1.553-2.553-1.554 0-1.792 1.214-1.792 2.467v3.685h-2.633V9h2.52v1.207h.035c.35-.665 1.205-1.366 2.48-1.366 2.653 0 3.14 1.744 3.14 4.018v4.82zM4.004 7.574a1.325 1.325 0 11-.002-2.65 1.325 1.325 0 01.002 2.65zm1.12 9.374H2.884V9h2.24v7.974zM17.54 2H2.458C1.348 2 .5 2.852.5 3.965v12.07C.5 17.148 1.348 18 2.456 18h15.082c1.113 0 2.02-.852 2.02-1.965V3.965C19.5 2.852 18.652 2 17.54 2z"/></svg>
                View LinkedIn
              </a>
            </div>
          </div>
          
          <div class="relative">
            <div class="relative mx-auto max-w-md">
              <div class="absolute inset-0 bg-primary-500/20 dark:bg-primary-500/10 rounded-3xl blur-3xl"></div>
              <img 
                src="/profile-picture.jpeg" 
                alt="Andrew Leach - Senior Software Engineer"
                class="relative rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Stats -->
      <section class="py-12">
        <UCard>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div v-for="stat in stats" :key="stat.label" class="text-center">
              <div class="text-4xl font-bold text-primary-500 mb-2">{{ stat.value }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">{{ stat.label }}</div>
            </div>
          </div>
        </UCard>
      </section>

      <!-- About -->
      <section class="py-12">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            What I Do Best
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Specialized expertise in modern software architecture, API design, and cloud-native solutions
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UCard v-for="service in services" :key="service.title" class="hover:shadow-lg transition-shadow">
            <template #header>
              <div class="flex items-center gap-3">
                <div class="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                  <UIcon :name="service.icon" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 class="text-xl font-semibold">{{ service.title }}</h3>
              </div>
            </template>
            <p class="text-gray-600 dark:text-gray-400 mb-4">{{ service.description }}</p>
            <ul class="space-y-2">
              <li v-for="item in service.highlights" :key="item" class="flex items-start gap-2 text-sm">
                <UIcon name="i-heroicons-check-circle-solid" class="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <span class="text-gray-700 dark:text-gray-300">{{ item }}</span>
              </li>
            </ul>
          </UCard>
        </div>
      </section>

      <!-- Recent Experience -->
      <section class="py-12">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Recent Experience
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Delivering impact at leading companies
          </p>
        </div>

        <div class="space-y-6">
          <UCard v-for="job in recentJobs" :key="job.company" class="hover:shadow-lg transition-shadow">
            <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
              <div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ job.title }}</h3>
                <div class="flex flex-wrap items-center gap-2 mt-2 text-gray-600 dark:text-gray-400">
                  <span class="font-semibold text-primary-600 dark:text-primary-400">{{ job.company }}</span>
                  <span class="text-gray-400">•</span>
                  <span>{{ job.period }}</span>
                </div>
              </div>
              <UBadge v-if="job.current" color="success" variant="soft" size="lg">
                Current Role
              </UBadge>
            </div>
            <ul class="space-y-3">
              <li 
                v-for="achievement in job.achievements" 
                :key="achievement"
                class="flex items-start gap-3"
              >
                <UIcon name="i-heroicons-arrow-right-circle" class="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <span class="text-gray-700 dark:text-gray-300">{{ achievement }}</span>
              </li>
            </ul>
          </UCard>
        </div>
      </section>

      <!-- Tech Stack -->
      <section class="py-12">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Technology Expertise
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Modern stack for building scalable, maintainable systems
          </p>
        </div>

        <UCard>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div v-for="category in techStack" :key="category.name">
              <h3 class="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-3 uppercase tracking-wide">
                {{ category.name }}
              </h3>
              <div class="flex flex-wrap gap-2">
                <UBadge 
                  v-for="tech in category.items" 
                  :key="tech"
                  color="neutral"
                  variant="subtle"
                >
                  {{ tech }}
                </UBadge>
              </div>
            </div>
          </div>
        </UCard>
      </section>

      <!-- Contact Section -->
      <section id="contact" class="py-16">
        <UCard>
          <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Let's Build Something Great
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Whether you're looking to optimize your APIs, migrate to microservices, 
              or modernize your infrastructure, I'd love to hear about your project.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://www.linkedin.com/in/redwoodlabs"
                target="_blank"
                rel="noopener noreferrer"
                class="px-6 py-3 text-lg font-semibold rounded-md border-2 border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950 transition-colors inline-flex items-center gap-2"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.553-1.553-2.553-1.554 0-1.792 1.214-1.792 2.467v3.685h-2.633V9h2.52v1.207h.035c.35-.665 1.205-1.366 2.48-1.366 2.653 0 3.14 1.744 3.14 4.018v4.82zM4.004 7.574a1.325 1.325 0 11-.002-2.65 1.325 1.325 0 01.002 2.65zm1.12 9.374H2.884V9h2.24v7.974zM17.54 2H2.458C1.348 2 .5 2.852.5 3.965v12.07C.5 17.148 1.348 18 2.456 18h15.082c1.113 0 2.02-.852 2.02-1.965V3.965C19.5 2.852 18.652 2 17.54 2z"/></svg>
                Connect on LinkedIn
              </a>
            </div>

            <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Based in Greater Seattle Area
              </p>
            </div>
          </div>
        </UCard>
      </section>

      <!-- Footer -->
      <footer class="py-8 text-center text-gray-600 dark:text-gray-400">
        <p>© {{ currentYear }} Redwood Labs. Built with Nuxt & Vue.</p>
      </footer>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

useHead({
  title: 'Andrew Leach - Senior Software Engineer',
  meta: [
    {
      name: 'description',
      content: 'Senior Software Engineer specializing in transforming legacy systems into modern architectures. API optimization, microservices migration, cloud architecture.'
    },
    {
      name: 'og:title',
      content: 'Andrew Leach - Senior Software Engineer'
    },
    {
      name: 'og:description',
      content: 'Senior Software Engineer specializing in transforming legacy systems into modern architectures.'
    }
  ]
})

// Stats
const stats = [
  { value: '50%+', label: 'Latency Reduction' },
  { value: '10+', label: 'Years Experience' },
  { value: '20+', label: 'Services Migrated' },
  { value: '6', label: 'Major Companies' }
]

// Services/Expertise
const services = [
  {
    title: 'API Optimization',
    icon: 'i-heroicons-bolt',
    description: 'Transform complex APIs into simple, performant services with proven results.',
    highlights: [
      'Config-driven architecture',
      '50%+ latency reduction',
      'RESTful best practices'
    ]
  },
  {
    title: 'Microservices Migration',
    icon: 'i-heroicons-cube-transparent',
    description: 'Modernize legacy monoliths into scalable microservices architectures.',
    highlights: [
      'Monolith decomposition',
      'Event-driven design',
      'Go & Java expertise'
    ]
  },
  {
    title: 'Cloud Architecture',
    icon: 'i-heroicons-cloud',
    description: 'Design and implement robust cloud solutions on Azure and AWS.',
    highlights: [
      'Azure & AWS platforms',
      'Infrastructure as Code',
      'Cost optimization'
    ]
  },
  {
    title: 'Data Pipelines',
    icon: 'i-heroicons-arrow-path',
    description: 'Build reliable ETL and streaming data pipelines at scale.',
    highlights: [
      'Azure Databricks',
      'Python automation',
      'Real-time processing'
    ]
  },
  {
    title: 'Backend Development',
    icon: 'i-heroicons-code-bracket-square',
    description: 'Full-stack development with focus on scalable backend systems.',
    highlights: [
      'Go, Java, Spring Boot',
      'PostgreSQL, MongoDB',
      'API design & security'
    ]
  },
  {
    title: 'Technical Leadership',
    icon: 'i-heroicons-user-group',
    description: 'Lead teams and mentor engineers while delivering technical initiatives.',
    highlights: [
      'Team mentorship',
      'Architecture decisions',
      'Best practices'
    ]
  }
]

// Recent experience
const recentJobs = [
  {
    title: 'Senior Software Engineer',
    company: 'Credit Acceptance',
    period: 'February 2025 - Present',
    current: true,
    achievements: [
      'Spearheading transition from legacy monolith to modern microservices in the Deal domain',
      'Leveraging Golang for enhanced performance and scalability',
      'Optimizing data management with S3, PostgreSQL, and Oracle',
      'Significantly reducing system latency and improving service reliability'
    ]
  },
  {
    title: 'Senior Software Engineer',
    company: 'Praia Health',
    period: 'June 2023 - February 2025',
    current: false,
    achievements: [
      'Rewrote complex API layer reducing latency by 50%+ through config-driven design',
      'Built REST APIs using Quarkus and Azure CosmosDB',
      'Developed data pipelines with Azure Databricks and Python',
      'Led push notification system and patient referral integration from ideation to production'
    ]
  },
  {
    title: 'Lead Software Engineer',
    company: 'REI',
    period: 'March 2020 - November 2022',
    current: false,
    achievements: [
      'Designed low-code UI builder reducing time-to-market for content teams',
      'Migrated entire CMS architecture to cloud, improving API response time by 25%',
      'Built Content Metadata Hub improving search relevance',
      'Mentored junior engineers on best practices and development workflows'
    ]
  }
]

// Tech stack
const techStack = [
  {
    name: 'Languages',
    items: ['Go', 'Java', 'Python', 'TypeScript', 'JavaScript']
  },
  {
    name: 'Backend',
    items: ['Spring Boot', 'Quarkus', 'Node.js', 'Microservices']
  },
  {
    name: 'Cloud & Data',
    items: ['Azure', 'AWS', 'PostgreSQL', 'MongoDB', 'CosmosDB', 'Databricks']
  },
  {
    name: 'Tools',
    items: ['Docker', 'Git', 'CI/CD', 'REST APIs', 'Supabase']
  }
]

// Current year for footer
const currentYear = computed(() => new Date().getFullYear())

// Scroll to contact
const scrollToContact = () => {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}
</script>
