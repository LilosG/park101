import { z } from 'astro/zod';
import { faq, hero, introBlock, section, sectionWithBody, seo, step, text } from './common';

/** Home is the only page whose hero carries a supporting heading. */
export const homePageSchema = z.strictObject({
  seo,
  hero: z.strictObject({ eyebrow: text, heading: text, subheading: text, body: text }),
  sections: z.strictObject({
    venue: sectionWithBody,
    sports: section,
    sportsBanner: sectionWithBody,
    food: section,
    drinks: sectionWithBody,
    events: sectionWithBody,
    brunch: sectionWithBody,
    families: section,
    privateEvents: sectionWithBody,
  }),
});

export const menuPageSchema = z.strictObject({
  seo,
  hero,
  intro: introBlock,
  sections: z.strictObject({ food: section, drink: section }),
});

export const brunchPageSchema = z.strictObject({
  seo,
  hero,
  intro: introBlock,
  sections: z.strictObject({
    food: section,
    drink: section,
    privateEvents: sectionWithBody,
    faq: section,
    final: sectionWithBody,
  }),
});

export const eventsPageSchema = z.strictObject({
  seo,
  hero,
  sections: z.strictObject({ eventTypes: section, upcoming: section, inquiry: sectionWithBody }),
});

export const venuePageSchema = z.strictObject({
  seo,
  hero,
  sections: z.strictObject({
    rooftop: section,
    courtyard: section,
    sports: section,
    indoor: section,
    families: section,
    final: sectionWithBody,
  }),
});

export const contactPageSchema = z.strictObject({
  seo,
  hero,
  sections: z.strictObject({ visit: section }),
});

export const privateEventsIndexSchema = z.strictObject({
  seo,
  hero,
  intro: introBlock,
  sections: z.strictObject({
    types: section,
    process: section,
    faq: section,
    final: sectionWithBody,
  }),
  howItWorks: z.array(step).min(1),
  faqs: z.array(faq).min(1),
});
