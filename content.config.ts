import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: z.object({
        name: z.string(),
        url: z.string().url(),
        tagline: z.string(),
        status: z.enum(['Live', 'Beta', 'Building']),
        order: z.number(),
      }),
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        date: z.date(),
        draft: z.boolean().default(false),
      }),
    }),
  },
})
