const blogImageOverrides: Record<string, { image: string; imageAlt: string }> = {
  'best-carlsbad-watch-party-venues-local-guide': {
    image: '/images/blog/image/park-101-sports-bar-viewing-area-carlsbad.jpg',
    imageAlt: 'Park 101 sports bar viewing area set up for game day in Carlsbad',
  },
  'best-happy-hour-carlsbad-venues-prk101-local-guide': {
    image: '/images/drinks/park-101-cocktail-lineup-carlsbad.jpg',
    imageAlt: 'Park 101 cocktail lineup for happy hour in Carlsbad',
  },
  'best-ocean-view-rooftop-bars-carlsbad-local-guide': {
    image: '/images/blog/image/park-101-rooftop-deck-bar-seating-carlsbad.jpg',
    imageAlt: 'Park 101 rooftop deck and bar seating in Carlsbad',
  },
  'host-ufc-watch-party-prk101-carlsbad-guide': {
    image: '/images/blog/image/park-101-outdoor-stadium-crowd-watching-sports-carlsbad.jpg',
    imageAlt: 'Park 101 outdoor crowd watching live sports in Carlsbad',
  },
  'prk101-vs-carlsbad-beachfront-bars-ocean-view-craft-cocktails-comparison-guide': {
    image: '/images/blog/image/park-101-patio-dining-outdoor-seating-carlsbad.jpg',
    imageAlt: 'Park 101 outdoor patio and bar seating in Carlsbad Village',
  },
  'prk101-vs-carlsbad-breweries-craft-beer-game-day-comparison-guide': {
    image: '/images/drinks/park-101-outdoor-golf-tournament-viewing-drinks-carlsbad.jpg',
    imageAlt: 'Drinks and outdoor sports viewing at Park 101 in Carlsbad',
  },
};

export function resolveBlogImage(post: { id: string; data: { image?: string; imageAlt?: string; title: string } }) {
  const override = blogImageOverrides[post.id];
  return {
    image: override?.image ?? post.data.image,
    imageAlt: override?.imageAlt ?? post.data.imageAlt ?? post.data.title,
  };
}
