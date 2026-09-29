import { z } from 'astro/zod';
import { altText, assetImage, faq, label, text } from './common';

const slug = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  .meta({
    ...label('Page URL', 'Controls the item identifier. Do not change after publishing unless instructed.'),
    slug: true,
  });

const description = text.meta({ ...label('Description'), multiline: true });

export const eventTypeSchema = z.strictObject({
  slug,
  name: text.meta(label('Event Name')),
  description,
  recurring: z
    .boolean()
    .meta(label('Recurring Event', 'Turn this on when this event type happens on an ongoing basis.')),
  image: assetImage(),
  imageAlt: altText,
});

export const upcomingEventSchema = z.strictObject({
  category: text.meta({
    ...label('Event Category', 'Event category displayed above the team or event names.'),
    slug: true,
  }),
  sideA: text.meta(label('First Team')),
  sideB: text.meta(label('Second Team')),
  date: text.meta(label('Event Date')),
  year: z.number().int().meta(label('Year')),
  time: text.meta(label('Event Time')),
  image: assetImage(),
  imageAlt: altText,
});

export const privateEventSchema = z.strictObject({
  slug,
  name: text.meta(label('Event Type Name')),
  headline: text.meta({ ...label('Headline'), multiline: true }),
  description,
  metaDescription: text.max(130).optional().meta(label('Meta Description')),
  capacity: text.meta(label('Guest Capacity')),
  features: z.array(text.meta(label('Feature'))).min(1).meta(label('Features')),
  faqs: z
    .array(faq)
    .min(1)
    .meta(label('Frequently Asked Questions', 'Add, edit, remove, or reorder the questions shown on this page.')),
  image: assetImage(),
  imageAlt: altText,
});
