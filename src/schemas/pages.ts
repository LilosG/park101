import { z } from 'astro/zod';
import {
  faq,
  hero,
  introBlock,
  label,
  section,
  sectionWithBody,
  seo,
  step,
  text,
} from './common';

/**
 * Pages whose Open Graph image already sits where Keystatic writes it
 * (`public/images/<page>/seo/ogImage.<ext>`) upload it directly; the others edit it as a path.
 */
const uploadedSeo = (page: string) =>
  seo({ directory: `public/images/${page}`, publicPath: `/images/${page}/` });

const sections = <T extends z.ZodRawShape>(shape: T) => z.strictObject(shape).meta(label('Page Sections'));

/** Home is the only page whose hero carries a supporting heading. */
export const homePageSchema = z.strictObject({
  seo: uploadedSeo('home'),
  hero: z
    .strictObject({
      ...hero.shape,
      subheading: text.meta(label('Supporting Heading')),
    })
    .meta(label('Hero Section')),
  sections: sections({
    venue: sectionWithBody('Venue Details'),
    sports: section('Game Day'),
    sportsBanner: sectionWithBody(),
    food: section(),
    drinks: sectionWithBody(),
    events: sectionWithBody(),
    brunch: sectionWithBody(),
    families: section(),
    privateEvents: sectionWithBody(),
  }),
});

export const menuPageSchema = z.strictObject({
  seo: uploadedSeo('menuPage'),
  hero,
  intro: introBlock,
  sections: sections({ food: section(), drink: section() }),
});

export const brunchPageSchema = z.strictObject({
  seo: uploadedSeo('brunchPage'),
  hero,
  intro: introBlock,
  sections: sections({
    food: section(),
    drink: section(),
    privateEvents: sectionWithBody(),
    faq: section(),
    final: sectionWithBody(),
  }),
});

export const eventsPageSchema = z.strictObject({
  seo: seo(),
  hero,
  sections: sections({ eventTypes: section(), upcoming: section(), inquiry: sectionWithBody() }),
});

export const venuePageSchema = z.strictObject({
  seo: uploadedSeo('venuePage'),
  hero,
  sections: sections({
    rooftop: section(),
    courtyard: section(),
    sports: section('Game Day'),
    indoor: section(),
    families: section(),
    final: sectionWithBody(),
  }),
});

export const contactPageSchema = z.strictObject({
  seo: uploadedSeo('contactPage'),
  hero,
  sections: sections({ visit: section() }),
});

export const privateEventsIndexSchema = z.strictObject({
  seo: seo(),
  hero,
  intro: introBlock,
  sections: sections({
    types: section(),
    process: section(),
    faq: section(),
    final: sectionWithBody(),
  }),
  howItWorks: z.array(step).min(1).meta(label('How It Works Steps')),
  faqs: z
    .array(faq)
    .min(1)
    .meta(label('Frequently Asked Questions', 'Add, edit, remove, or reorder the questions shown on this page.')),
});
