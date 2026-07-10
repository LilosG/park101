import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Park 101'),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    category: z.enum([
      'game-day',
      'food-drink',
      'events',
      'weekly-specials',
      'venue',
      'community',
      'private-events',
    ]),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    answerTarget: z.string().optional(),
    answerSummary: z.string().optional(),
    relatedServices: z.array(z.string()).max(3).optional(),
  }),
});

export const collections = { blog };
