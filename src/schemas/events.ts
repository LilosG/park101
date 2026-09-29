import { z } from 'astro/zod';
import { assetImage, faq, text } from './common';

export const eventTypeSchema = z.strictObject({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  name: text,
  description: text,
  recurring: z.boolean(),
  image: assetImage,
  imageAlt: text,
});

export const upcomingEventSchema = z.strictObject({
  category: text,
  sideA: text,
  sideB: text,
  date: text,
  year: z.number().int(),
  time: text,
  image: assetImage,
  imageAlt: text,
});

export const privateEventSchema = z.strictObject({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  name: text,
  headline: text,
  description: text,
  metaDescription: z.string().min(1).max(130).optional(),
  capacity: text,
  features: z.array(text).min(1),
  faqs: z.array(faq).min(1),
  image: assetImage,
  imageAlt: text,
});
