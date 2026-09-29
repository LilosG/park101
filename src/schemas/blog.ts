import { z } from 'astro/zod';
import { assetImage, text } from './common';

export const blogCategories = [
  'game-day',
  'food-drink',
  'events',
  'weekly-specials',
  'venue',
  'community',
  'private-events',
  'guide',
] as const;

/**
 * Non-strict on purpose: a new frontmatter key from the content pipeline must
 * not block a deploy. Every key currently in use is declared.
 */
export const blogSchema = z.looseObject({
  title: text,
  seoTitle: text.optional(),
  description: text,
  publishDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  author: text.default('Park 101'),
  image: assetImage.optional(),
  imageAlt: text.optional(),
  category: z.enum(blogCategories),
  tags: z.array(text).default([]),
  draft: z.boolean().default(false),
  answerTarget: text.optional(),
  answerSummary: text.optional(),
  relatedServices: z.array(text).max(3).optional(),
  serviceAreas: z.array(text).optional(),
  faqs: z.array(z.strictObject({ question: text, answer: text })).optional(),
});
