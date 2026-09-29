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
    description: 'NFL Sundays, Padres games, UFC fight nights and soccer watch parties at Park 101 in Carlsbad, CA. Read the guides and reserve your game day table.',
    image: '/images/venue/park-101-padres-game-day-packed-venue-carlsbad.jpg',
  },
  'food-drink': {
    slug: 'food-drink',
    label: 'Food & Drink',
    description: "Burgers, wings, tacos, brunch and rooftop cocktails at Park 101 in Carlsbad, CA. Read the food and drink guides, then view the menu and order online.",
    image: '/images/food/park-101-prk-food-spread-carlsbad.jpg',
  },
  events: {
    slug: 'events',
    label: 'Events',
    description: "Live music, themed nights and sports viewing on Park 101's rooftop and courtyard in Carlsbad, CA. Read the event guides and plan your next night out.",
    image: '/images/venue/park-101-live-music-country-wide-carlsbad.jpg',
  },
  'weekly-specials': {
    slug: 'weekly-specials',
    label: 'Weekly Specials',
    description: "Recurring specials and weekly programming at Park 101's rooftop bar and restaurant in Carlsbad, CA. Read the guides and plan your week around happy hour.",
    image: '/images/drinks/park-101-frozen-drinks-carlsbad.jpg',
  },
  venue: {
    slug: 'venue',
    label: 'The Venue',
    description: 'Guides to the rooftop, courtyard and indoor bar at Park 101 in Carlsbad, CA, one block from the beach. Read the guides, then reserve a table.',
    image: '/images/venue/park-101-rooftop-deck-bar-seating-carlsbad.jpg',
  },
  guide: {
    slug: 'guide',
    label: 'Guides',
    description: 'Practical food, drink and game day guides for Park 101 in Carlsbad, CA, from happy hour to brunch to watch parties. Read on, then reserve a table.',
    image: '/images/venue/park-101-rooftop-deck-bar-seating-carlsbad.jpg',
  },
  community: {
    slug: 'community',
    label: 'Community',
    description: "Local Carlsbad, CA guides, family-friendly restaurant tips and things to do near Park 101 in Carlsbad Village. Read the guides and plan your visit.",
    image: '/images/venue/park-101-families-kids-game-day-carlsbad.jpg',
  },
  'private-events': {
    slug: 'private-events',
    label: 'Private Events',
    description: "Birthdays, corporate events, rehearsal dinners, watch parties and full venue buyouts at Park 101 in Carlsbad, CA. Read the guides and book your event.",
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

/** "Game Day" → "Game Day Guides"; a label that already ends in "Guides" is used as-is. */
export function categoryGuideName(label: string): string {
  return /\bGuides$/.test(label) ? label : `${label} Guides`;
}
