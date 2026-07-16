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

const siteSettings = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/siteSettings' }),
  schema: z.any(),
});

const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const navigation = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/navigation' }),
  schema: z.object({
    mainLinks: z.array(linkSchema),
    footerLinks: z.array(linkSchema),
    labels: z.record(z.string(), z.string()),
    links: z.record(z.string(), z.string()),
  }),
});

const seoSchema = z.object({
  title: z.string(),
  description: z.string(),
  ogImage: z.string(),
});

const pageBlockSchema = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  subheading: z.string().optional(),
  body: z.string().optional(),
});

const pageSchema = z.object({
  seo: seoSchema,
  hero: pageBlockSchema,
  intro: pageBlockSchema.optional(),
  sections: z.record(z.string(), pageBlockSchema),
  howItWorks: z.array(z.object({
    step: z.string(),
    title: z.string(),
    body: z.string(),
  })).optional(),
  faqs: z.array(z.object({
    q: z.string(),
    a: z.string(),
  })).optional(),
});

const home = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/home' }),
  schema: pageSchema,
});

const menuPage = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/menuPage' }),
  schema: pageSchema,
});

const brunchPage = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/brunchPage' }),
  schema: pageSchema,
});

const eventsPage = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/eventsPage' }),
  schema: pageSchema,
});

const venuePage = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/venuePage' }),
  schema: pageSchema,
});

const contactPage = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/contactPage' }),
  schema: pageSchema,
});

const privateEventsIndex = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/privateEventsIndex' }),
  schema: pageSchema,
});

const menuItemSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  image: z.string(),
  imageAlt: z.string(),
  order: z.number().int().nonnegative(),
});

const brunchFoodItems = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/brunchFoodItems' }),
  schema: menuItemSchema,
});

const brunchDrinkItems = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/brunchDrinkItems' }),
  schema: menuItemSchema,
});

const dinnerFoodItems = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/dinnerFoodItems' }),
  schema: menuItemSchema,
});

const dinnerDrinkItems = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/dinnerDrinkItems' }),
  schema: menuItemSchema,
});

const eventTypes = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/eventTypes' }),
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    description: z.string(),
    recurring: z.boolean(),
    image: z.string(),
    imageAlt: z.string(),
  }),
});

const upcomingEvents = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/upcomingEvents' }),
  schema: z.object({
    category: z.string(),
    sideA: z.string(),
    sideB: z.string(),
    date: z.string(),
    time: z.string(),
    image: z.string(),
    imageAlt: z.string(),
  }),
});

const privateEvents = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/privateEvents' }),
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    headline: z.string(),
    description: z.string(),
    capacity: z.string(),
    features: z.array(z.string()),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })),
    image: z.string(),
    imageAlt: z.string(),
  }),
});

export const collections = {
  blog,
  siteSettings,
  navigation,
  home,
  menuPage,
  brunchPage,
  eventsPage,
  venuePage,
  contactPage,
  privateEventsIndex,
  brunchFoodItems,
  brunchDrinkItems,
  dinnerFoodItems,
  dinnerDrinkItems,
  eventTypes,
  upcomingEvents,
  privateEvents,
};
