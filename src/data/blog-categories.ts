// Centralized blog category metadata.
// Keys must match the `category` enum in src/content.config.ts.
// This is the single source of truth for category labels/descriptions —
// pages should import from here rather than hardcoding category strings.

export interface BlogCategoryMeta {
  slug: string;
  label: string;
  description: string;
}

export const blogCategories: Record<string, BlogCategoryMeta> = {
  'game-day': {
    slug: 'game-day',
    label: 'Game Day',
    description: 'NFL Sundays, MLB games, UFC fight nights, and everything happening on the screens at Park 101.',
  },
  'food-drink': {
    slug: 'food-drink',
    label: 'Food & Drink',
    description: 'BBQ, smoked meats, cocktails, and what to order at Park 101.',
  },
  events: {
    slug: 'events',
    label: 'Events',
    description: 'Live music, themed nights, and what\'s coming up at Park 101.',
  },
  'weekly-specials': {
    slug: 'weekly-specials',
    label: 'Weekly Specials',
    description: 'Recurring specials and weekly programming at Park 101.',
  },
  venue: {
    slug: 'venue',
    label: 'The Venue',
    description: 'Rooftop, courtyard, indoor bar — the spaces that make up Park 101.',
  },
  community: {
    slug: 'community',
    label: 'Community',
    description: 'Park 101 in Carlsbad Village and North County.',
  },
  'private-events': {
    slug: 'private-events',
    label: 'Private Events',
    description: 'Birthdays, corporate events, and buyouts at Park 101.',
  },
};

export function getCategoryMeta(slug: string): BlogCategoryMeta {
  return (
    blogCategories[slug] ?? {
      slug,
      label: slug,
      description: '',
    }
  );
}
