import { z } from 'astro/zod';
import { externalUrl, publicImage, text } from './common';

const time = z.string().regex(/^\d{1,2}:\d{2} (AM|PM)$/, 'Use a time like 11:00 AM');
const day = z.strictObject({ open: time, close: time });
const venueArea = z.strictObject({
  headline: text,
  description: text,
  features: z.array(text).min(1),
});

export const siteSettingsSchema = z.strictObject({
  name: text,
  brandName: text,
  tagline: text,
  description: text,
  shortDescription: text,
  url: externalUrl,
  logo: publicImage,
  logoLight: publicImage,
  contact: z.strictObject({
    phone: text,
    phoneDial: z.string().regex(/^\+1\d{10}$/, 'Use E.164 format, e.g. +18584086948'),
    email: z.email().optional(),
    address: z.strictObject({
      street: text,
      city: text,
      state: z.string().regex(/^[A-Z]{2}$/),
      zip: z.string().regex(/^\d{5}$/),
      full: text,
    }),
    coordinates: z.strictObject({ lat: z.number().min(-90).max(90), lng: z.number().min(-180).max(180) }),
    neighborhood: text,
    googleMapsUrl: externalUrl,
  }),
  hours: z.strictObject({
    monday: day,
    tuesday: day,
    wednesday: day,
    thursday: day,
    friday: day,
    saturday: day,
    sunday: day,
  }),
  hoursDisplay: z.array(z.strictObject({ days: text, hours: text })).length(7),
  happyHours: z.strictObject({ label: text, days: text, hours: text, note: text }),
  social: z.strictObject({
    instagram: externalUrl,
    facebook: externalUrl,
    yelp: externalUrl.optional(),
    tiktok: externalUrl.optional(),
  }),
  ordering: z.strictObject({
    toastUrl: externalUrl,
    reservationsUrl: externalUrl,
    inquiryFormUrl: externalUrl,
  }),
  stats: z.array(z.strictObject({ label: text, value: text })).min(1),
  features: z.array(text).min(1),
  cuisine: z.array(text).min(1),
  priceRange: text,
  venue: z.strictObject({
    rooftop: venueArea,
    courtyard: venueArea,
    sports: venueArea,
    indoorBar: venueArea,
    familiesPets: venueArea,
    liveEvents: venueArea,
  }),
  seo: z.strictObject({
    defaultTitle: text,
    titleTemplate: text,
    defaultDescription: text,
    keywords: z.array(text).min(1),
    ogImage: publicImage,
  }),
  schema: z.strictObject({
    type: z.array(text).min(1),
    servesCuisine: z.array(text).min(1),
    priceRange: text,
    currenciesAccepted: text,
    paymentAccepted: text,
    amenityFeature: z.array(text).min(1),
  }),
});
