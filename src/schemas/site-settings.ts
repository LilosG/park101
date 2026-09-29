import { z } from 'astro/zod';
import { externalUrl, label, publicImage, text } from './common';

const time = (title: string) =>
  z
    .string()
    .regex(/^\d{1,2}:\d{2} (AM|PM)$/, 'Use a time like 11:00 AM')
    .meta({
      ...label(title, 'Use a time like 11:00 AM.'),
      patternMessage: 'Use a time like 11:00 AM.',
    });
const day = (title: string) =>
  z.strictObject({ open: time('Opening Time'), close: time('Closing Time') }).meta(label(title));

const venueArea = (title: string) =>
  z
    .strictObject({
      headline: text.meta(label('Headline')),
      description: text.meta({ ...label('Description'), multiline: true }),
      features: z.array(text.meta(label('Feature'))).min(1).meta(label('Features')),
    })
    .meta(label(title));

const list = (title: string, itemTitle: string) =>
  z.array(text.meta(label(itemTitle))).min(1).meta(label(title));

const timeZone = z
  .string()
  .refine((value) => {
    try {
      new Intl.DateTimeFormat('en-US', { timeZone: value });
      return true;
    } catch {
      return false;
    }
  }, 'Use an IANA time zone such as America/Los_Angeles')
  .meta({
    ...label(
      'Restaurant Time Zone',
      'IANA time zone of the restaurant, e.g. America/Los_Angeles. Decides "today" on the website for every visitor.',
    ),
    patternMessage: 'Use an IANA time zone such as America/Los_Angeles.',
  });

export const siteSettingsSchema = z.strictObject({
  name: text.meta(label('Name')),
  brandName: text.meta(label('Display Brand Name')),
  tagline: text.meta(label('Brand Tagline')),
  description: text.meta({ ...label('Description'), multiline: true }),
  shortDescription: text.meta({ ...label('Short Business Description'), multiline: true }),
  url: externalUrl.meta(label('Website Address')),
  timeZone,
  logo: publicImage('Primary Logo'),
  logoLight: publicImage('Light Logo'),
  contact: z
    .strictObject({
      phone: text.meta(label('Display Phone Number')),
      phoneDial: z
        .string()
        .regex(/^\+1\d{10}$/, 'Use E.164 format, e.g. +18584086948')
        .meta({
          ...label('Phone Number for Links', 'Digits only with country code, e.g. +18584086948.'),
          patternMessage: 'Use the format +18584086948.',
        }),
      email: z
        .email()
        .optional()
        .meta({ ...label('Email Address'), patternMessage: 'Enter a valid email address.' }),
      address: z
        .strictObject({
          street: text.meta(label('Street')),
          city: text.meta(label('City')),
          state: z
            .string()
            .regex(/^[A-Z]{2}$/)
            .meta({ ...label('State'), patternMessage: 'Use the two-letter state code.' }),
          zip: z
            .string()
            .regex(/^\d{5}$/)
            .meta({ ...label('ZIP Code'), patternMessage: 'Use a five-digit ZIP code.' }),
          full: text.meta(label('Full Address')),
        })
        .meta(label('Street Address')),
      coordinates: z
        .strictObject({
          lat: z.number().min(-90).max(90).meta(label('Latitude')),
          lng: z.number().min(-180).max(180).meta(label('Longitude')),
        })
        .meta(label('Map Coordinates')),
      neighborhood: text.meta(label('Neighborhood')),
      googleMapsUrl: externalUrl.meta(label('Google Maps Link')),
    })
    .meta(label('Contact Information')),
  hours: z
    .strictObject({
      monday: day('Monday'),
      tuesday: day('Tuesday'),
      wednesday: day('Wednesday'),
      thursday: day('Thursday'),
      friday: day('Friday'),
      saturday: day('Saturday'),
      sunday: day('Sunday'),
    })
    .meta(label('Hours by Day')),
  hoursDisplay: z
    .array(
      z.strictObject({
        days: text.meta(label('Day Label')),
        hours: text.meta(label('Hours')),
      }),
    )
    .length(7)
    .meta(label('Displayed Hours')),
  happyHours: z
    .strictObject({
      label: text.meta(label('Label')),
      days: text.meta(label('Day Label')),
      hours: text.meta(label('Hours')),
      note: text.meta(label('Note')),
    })
    .meta(label('Happy Hours')),
  social: z
    .strictObject({
      instagram: externalUrl.meta(label('Instagram Link')),
      facebook: externalUrl.meta(label('Facebook Link')),
      yelp: externalUrl.optional().meta(label('Yelp Link')),
      tiktok: externalUrl.optional().meta(label('TikTok Link')),
    })
    .meta(label('Social Media Links')),
  ordering: z
    .strictObject({
      toastUrl: externalUrl.meta(label('Online Ordering Link')),
      reservationsUrl: externalUrl.meta(label('Reservations Link')),
      inquiryFormUrl: externalUrl.meta(label('Private Event Inquiry Link')),
    })
    .meta(label('Ordering and Booking Links')),
  stats: z
    .array(z.strictObject({ label: text.meta(label('Label')), value: text.meta(label('Displayed Value')) }))
    .min(1)
    .meta(label('Venue Statistics')),
  features: list('Features', 'Feature'),
  cuisine: list('Cuisine Types', 'Cuisine'),
  priceRange: text.meta(label('Price Range')),
  venue: z
    .strictObject({
      rooftop: venueArea('Rooftop'),
      courtyard: venueArea('Courtyard'),
      sports: venueArea('Game Day'),
      indoorBar: venueArea('Indoor Bar and Dining Room'),
      familiesPets: venueArea('Families and Pets'),
      liveEvents: venueArea('Live Music and Events'),
    })
    .meta(label('Venue Details')),
  seo: z
    .strictObject({
      defaultTitle: text.meta(label('Default Search Result Title')),
      titleTemplate: text.meta(label('Search Result Title Template')),
      defaultDescription: text.meta({ ...label('Default Search Result Description'), multiline: true }),
      keywords: list('Search Keywords', 'Keyword'),
      ogImage: publicImage('Social Sharing Image'),
    })
    .meta(label('Search Engine Settings')),
  schema: z
    .strictObject({
      type: list('Business Types', 'Business Type'),
      servesCuisine: list('Cuisines Served', 'Cuisine'),
      priceRange: text.meta(label('Price Range')),
      currenciesAccepted: text.meta(label('Accepted Currencies')),
      paymentAccepted: text.meta(label('Accepted Payment Methods')),
      amenityFeature: list('Venue Amenities', 'Amenity'),
    })
    .meta(label('Structured Business Data')),
});
