// Image assignments for private events pages.
// Centralized here so both index.astro and [slug].astro reference the same source.
// Swap any value below to change the image site-wide for that page.

export const privateEventsHubImage =
  '/images/venue/park-101-rooftop-evening-group-carlsbad.jpg';

export const privateEventImages: Record<string, string> = {
  'birthday-parties':
    '/images/venue/park-101-outdoor-firepit-string-lights-evening-crowd-carlsbad.jpg',
  'corporate-events':
    '/images/venue/park-101-rooftop-dining-carlsbad-village-carlsbad.jpg',
  'venue-buyout':
    '/images/venue/park-101-padres-game-day-packed-venue-carlsbad.jpg',
  'game-day-parties':
    '/images/venue/park-101-outdoor-rooftop-bar-string-lights-carlsbad.jpg',
  'rehearsal-dinners':
    '/images/venue/park-101-outdoor-rooftop-bar-evening-crowd-carlsbad.jpg',
};
