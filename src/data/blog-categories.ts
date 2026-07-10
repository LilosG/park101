// Centralized blog category metadata.
// Keys must match the `category` enum in src/content.config.ts.
// This is the single source of truth for category labels/descriptions —
// pages should import from here rather than hardcoding category strings.

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
    description: 'NFL Sundays, MLB games, UFC fight nights, and everything happening on the screens at Park 101.',
    image: '/images/venue/park-101-padres-game-day-packed-venue-carlsbad.jpg',
  },
  'food-drink': {
    slug: 'food-drink',
    label: 'Food & Drink',
    description: "BBQ, smoked meats, signature cocktails, and what to order at Park 101's rooftop restaurant in Carlsbad Village.",
    image: '/images/food/park-101-prk-food-spread-carlsbad.jpg',
  },
  events: {
    slug: 'events',
    label: 'Events',
    description: "Live music, themed nights, and what's coming up at Park 101's rooftop and courtyard in Carlsbad Village.",
    image: '/images/venue/park-101-live-music-country-wide-carlsbad.jpg',
  },
  'weekly-specials': {
    slug: 'weekly-specials',
    label: 'Weekly Specials',
    description: "Recurring specials and weekly programming at Park 101's rooftop bar in Carlsbad Village.",
    image: '/images/drinks/park-101-frozen-drinks-carlsbad.jpg',
  },
  venue: {
    slug: 'venue',
    label: 'The Venue',
    description: 'Rooftop, courtyard, and indoor bar — a look at the spaces that make up Park 101 in Carlsbad Village.',
    image: '/images/venue/park-101-rooftop-deck-bar-seating-carlsbad.jpg',
  },
  community: {
    slug: 'community',
    label: 'Community',
    description: "Park 101 in Carlsbad Village and North County — local guides, family-friendly tips, and what's nearby.",
    image: '/images/venue/park-101-families-kids-game-day-carlsbad.jpg',
  },
  'private-events': {
    slug: 'private-events',
    label: 'Private Events',
    description: 'Birthdays, corporate events, and full venue buyouts at Park 101\'s rooftop and courtyard in Carlsbad Village.',
    image: '/images/venue/park-101-rooftop-evening-group-carlsbad.jpg',
  },
};

export function getCategoryMeta(slug: string): BlogCategoryMeta {
  return (
    blogCategories[slug] ?? {
      slug,
      label: slug,
      description: '',
      image: '/images/venue/park101-carlsbad-rooftop-og.webp',
    }
  );
}
