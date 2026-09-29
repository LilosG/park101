/**
 * Pages a blog post can feature in its "Explore Park 101" cards. Single source for the
 * frontmatter enum (src/schemas/blog.ts), the Keystatic picker and the rendered cards.
 * Every key maps to a route that exists today in src/pages.
 */
export const relatedPages = {
  menu: {
    href: '/menu',
    label: 'Food & Drink Menu',
    description: 'Browse burgers, wings, tacos, shareable plates and cocktails.',
  },
  brunch: {
    href: '/brunch',
    label: 'Rooftop Brunch',
    description: 'See daily brunch details, menu highlights and reservations.',
  },
  venue: {
    href: '/venue',
    label: 'Rooftop & Venue',
    description: 'Explore the rooftop, courtyard, indoor bar and game day setup.',
  },
  events: {
    href: '/events',
    label: 'Events & Game Day',
    description: 'See live music, sports viewing and weekly events in Carlsbad.',
  },
  'private-events': {
    href: '/private-events',
    label: 'Private Events',
    description: 'Plan birthdays, corporate events, watch parties and venue buyouts.',
  },
  sports: {
    href: '/sports',
    label: 'Watch Party Headquarters',
    description: 'See the Buffalo Bills and Ohio State schedules and reserve for game day.',
  },
} as const satisfies Record<string, { href: string; label: string; description: string }>;

export type RelatedPageKey = keyof typeof relatedPages;

export const relatedPageKeys = Object.keys(relatedPages) as [RelatedPageKey, ...RelatedPageKey[]];
