// Centralized blog category metadata.
// Keys must match the `category` enum in src/content.config.ts.
// This is the single source of truth for category labels/descriptions.

export interface BlogCategoryMeta {
  slug: string;
  label: string;
  description: string;
  image: string;
}

export const blogCategories: Record<string, BlogCategoryMeta> = {
  'game-day': {
    slug: 'game-day',
    label: 'Game Day',
    description: 'NFL Sundays, Padres games, UFC fight nights, soccer watch parties and sports viewing at Park 101 in Carlsbad Village.',
    image: '/images/venue/park-101-padres-game-day-packed-venue-carlsbad.jpg',
  },
  'food-drink': {
    slug: 'food-drink',
    label: 'Food & Drink',
    description: "Burgers, wings, tacos, loaded fries, shareable favorites, cocktails and drinks at Park 101's rooftop restaurant in Carlsbad Village.",
    image: '/images/food/park-101-prk-food-spread-carlsbad.jpg',
  },
  events: {
    slug: 'events',
    label: 'Events',
    description: "Live music, themed nights, sports viewing and what's happening at Park 101's rooftop and courtyard in Carlsbad Village.",
    image: '/images/venue/park-101-live-music-country-wide-carlsbad.jpg',
  },
  'weekly-specials': {
    slug: 'weekly-specials',
    label: 'Weekly Specials',
    description: "Recurring specials and weekly programming at Park 101's rooftop bar and restaurant in Carlsbad Village.",
    image: '/images/drinks/park-101-frozen-drinks-carlsbad.jpg',
  },
  venue: {
    slug: 'venue',
    label: 'The Venue',
    description: 'Rooftop, courtyard and indoor bar guides for Park 101 in Carlsbad Village, one block from the beach.',
    image: '/images/venue/park-101-rooftop-deck-bar-seating-carlsbad.jpg',
  },
  community: {
    slug: 'community',
    label: 'Community',
    description: "Local Carlsbad Village guides, family-friendly restaurant tips and things to do near Park 101.",
    image: '/images/venue/park-101-families-kids-game-day-carlsbad.jpg',
  },
  'private-events': {
    slug: 'private-events',
    label: 'Private Events',
    description: "Birthdays, corporate events, rehearsal dinners, watch parties and full venue buyouts at Park 101 in Carlsbad Village.",
    image: '/images/venue/park-101-rooftop-evening-group-carlsbad.jpg',
  },
};

export function getCategoryMeta(slug: string): BlogCategoryMeta {
  return (
    blogCategories[slug] ?? {
      slug,
      label: slug,
      description: '',
      image: '/images/siteSettings/seo/ogImage/park-101-outdoor-waterfront-rooftop-bar-carlsbad.jpg',
    }
  );
}
