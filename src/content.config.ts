import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { blogSchema } from './schemas/blog';
import { eventTypeSchema, privateEventSchema, upcomingEventSchema } from './schemas/events';
import { menuItemSchema } from './schemas/menu-items';
import { navigationSchema } from './schemas/navigation';
import {
  brunchPageSchema,
  contactPageSchema,
  eventsPageSchema,
  homePageSchema,
  menuPageSchema,
  privateEventsIndexSchema,
  venuePageSchema,
} from './schemas/pages';
import { siteSettingsSchema } from './schemas/site-settings';
import { sportsGameSchema } from './schemas/sports';

const json = (base: string) => glob({ pattern: '**/*.json', base: `./src/content/${base}` });

export const collections = {
  blog: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
    schema: blogSchema,
  }),
  siteSettings: defineCollection({ loader: json('siteSettings'), schema: siteSettingsSchema }),
  navigation: defineCollection({ loader: json('navigation'), schema: navigationSchema }),
  home: defineCollection({ loader: json('home'), schema: homePageSchema }),
  menuPage: defineCollection({ loader: json('menuPage'), schema: menuPageSchema }),
  brunchPage: defineCollection({ loader: json('brunchPage'), schema: brunchPageSchema }),
  eventsPage: defineCollection({ loader: json('eventsPage'), schema: eventsPageSchema }),
  venuePage: defineCollection({ loader: json('venuePage'), schema: venuePageSchema }),
  contactPage: defineCollection({ loader: json('contactPage'), schema: contactPageSchema }),
  privateEventsIndex: defineCollection({ loader: json('privateEventsIndex'), schema: privateEventsIndexSchema }),
  brunchFoodItems: defineCollection({ loader: json('brunchFoodItems'), schema: menuItemSchema }),
  brunchDrinkItems: defineCollection({ loader: json('brunchDrinkItems'), schema: menuItemSchema }),
  dinnerFoodItems: defineCollection({ loader: json('dinnerFoodItems'), schema: menuItemSchema }),
  dinnerDrinkItems: defineCollection({ loader: json('dinnerDrinkItems'), schema: menuItemSchema }),
  eventTypes: defineCollection({ loader: json('eventTypes'), schema: eventTypeSchema }),
  upcomingEvents: defineCollection({ loader: json('upcomingEvents'), schema: upcomingEventSchema }),
  sportsGames: defineCollection({ loader: json('sportsGames'), schema: sportsGameSchema }),
  privateEvents: defineCollection({ loader: json('privateEvents'), schema: privateEventSchema }),
};
