# Park 101 Astro Project — Keystatic CMS Readiness Audit

Audit date: 2026-07-14  
Scope: read-only inspection of the existing Astro project. This report is the only file added.

## Executive summary

The project is **not currently wired to Keystatic**. Neither `@keystatic/core` nor `@keystatic/astro` is declared in `package.json`, and no `keystatic.config.ts` or Keystatic route/config file exists. Astro Content Collections are configured for one collection, `blog`, containing four Markdown files. Most other editable content is hardcoded in Astro page frontmatter, TypeScript data files, or `src/data/site-profile.json`.

The project is linked to a Vercel project and uses the Vercel adapter, but no production branch is declared in the repository files inspected. There are substantial CMS-schema candidates outside `src/content`: site settings, menu items, brunch items, event types, upcoming events, private-event sub-pages, blog category metadata, Toast URLs, page copy, and image/alt-text assignments.

## 1. Keystatic packages and Astro integration

`package.json` does **not** contain either required Keystatic package:

- `@keystatic/core`: **not installed/declared**
- `@keystatic/astro`: **not installed/declared**

There is also no Keystatic integration in the `integrations` array in `astro.config.mjs`; the only configured Astro integration is `@astrojs/sitemap`. The project uses `@astrojs/vercel` as its adapter.

Current dependencies from `package.json`:

```json
{
  "@astrojs/sitemap": "^3.6.0",
  "@astrojs/vercel": "^10.0.8",
  "@tailwindcss/vite": "^4.3.0",
  "astro": "^6.4.5",
  "sharp": "^0.35.3",
  "tailwindcss": "^4.3.0"
}
```

No Keystatic package name was found in the lockfile either.

## 2. `keystatic.config.ts`

**Does not exist.** No file or directory with `keystatic` in its name was found outside excluded dependency/git directories, so there are no contents to reproduce.

## 3. Astro Content Collections configuration

The content configuration exists at `src/content.config.ts` (Astro's current project-level location). Full contents:

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Park 101'),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    category: z.enum([
      'game-day',
      'food-drink',
      'events',
      'weekly-specials',
      'venue',
      'community',
      'private-events',
    ]),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    answerTarget: z.string().optional(),
    answerSummary: z.string().optional(),
    relatedServices: z.array(z.string()).max(3).optional(),
  }),
});

export const collections = { blog };
```

## 4. Current `src/content` inventory

| Content folder/type | Format | File count | Files |
|---|---:|---:|---|
| `blog` | Markdown (`.md`) | 4 | `best-family-friendly-restaurants-carlsbad-village.md`, `best-place-to-watch-world-cup-carlsbad.md`, `best-places-to-watch-nfl-games-carlsbad.md`, `best-rooftop-bars-carlsbad.md` |

**Total:** 1 content type, 4 files.

There are no `pages`, `menu`, `events`, or other folders under `src/content`. Menu, event, venue, brunch, contact, home-page, and private-event content currently lives outside Astro Content Collections.

## 5. Representative content file

The only content type is `blog`. Representative file: `src/content/blog/best-family-friendly-restaurants-carlsbad-village.md`.

Full contents, including frontmatter and body structure:

```md
---
title: "Best Family-Friendly Restaurants in Carlsbad Village"
seoTitle: "Family-Friendly Restaurants in Carlsbad"
description: "Traveling with kids or your dog in Carlsbad Village? Here's what makes a restaurant genuinely family-friendly, and why Park 101 fits the bill."
publishDate: 2026-07-10
author: "Park 101"
image: "/images/venue/park-101-families-kids-game-day-carlsbad.jpg"
imageAlt: "Families and kids in Padres jerseys enjoying game day together at Park 101 Carlsbad"
category: "community"
tags: ["family friendly", "Carlsbad Village", "dog friendly", "things to do"]
answerTarget: "Best family-friendly restaurant in Carlsbad Village"
answerSummary: "Park 101 in Carlsbad Village is family- and dog-friendly, with a relaxed atmosphere, a kid-friendly menu, and space across a rooftop deck, open-air courtyard, and indoor bar for groups of all ages — one block from the beach."
relatedServices: ["venue", "brunch", "private-events"]
---

Carlsbad Village has no shortage of restaurants, but "family-friendly" means something different depending on who you ask. For some places, it just means a kids' menu exists. For a spot to actually work for a family outing — especially one that includes a dog, a toddler, and adults who'd also like a decent cocktail — it needs to check a few more boxes.

## What Actually Makes a Restaurant Family-Friendly

- **Room to move.** Tight, formal dining rooms are stressful with kids. Open, multi-level spaces give everyone room to breathe.
- **A relaxed atmosphere**, not a hushed one — nobody wants to shush a 6-year-old through an entire meal.
- **A real kids' menu**, not just a plain quesadilla as an afterthought.
- **Dog-friendly patio space**, if your family includes one.
- **Something for the adults too** — a solid drink menu and food that isn't dumbed down just because kids are in the building.

## Why Park 101 Works for Families in Carlsbad Village

Park 101 was designed around multiple distinct spaces — a rooftop deck, an open-air central courtyard, and an indoor bar — which naturally gives families more room to spread out than a single dining room ever could. The atmosphere stays relaxed even during busy stretches like game day, and the [dog-friendly patio](/venue) means the whole family is actually welcome, not just the two-legged members.

### A Menu Built for Groups of All Ages

The food program at Park 101 is wood-smoked BBQ and shareable plates — the kind of format that works whether you're feeding a picky 8-year-old or an adult who wants the full smokehouse platter. It's genuinely one menu for the whole table, not a separate "kids' section" bolted onto a menu that otherwise ignores them.

### Weekend Mornings: Family Brunch on the Rooftop

If you're planning a weekend visit, [Saturday and Sunday brunch](/brunch) on the rooftop is one of the easiest ways to bring the family to Park 101 — open-air seating, a relaxed morning pace, and a menu that ranges from classic breakfast burritos to smoked tri-tip chilaquiles for the adults at the table.

## Also Good for Family Celebrations

Beyond a regular meal out, Park 101's spaces are also set up for [private birthday parties and family gatherings](/private-events/birthday-parties) — useful if you're planning something bigger than a Tuesday night dinner, like a milestone birthday or a family reunion visiting Carlsbad Village.

## Plan Your Visit

Park 101 is located at 3040 Carlsbad Boulevard, one block from the beach in Carlsbad Village. See the [full venue breakdown](/venue) for all the spaces, or [reach out](/contact) if you're planning a visit with a larger group.
```

The representative file omits optional schema fields `updatedDate` and `draft`; Astro applies `draft: false` through the schema default. Its body is freeform Markdown.

## 6. Keystatic singleton/collection route cross-reference

**Not applicable because `keystatic.config.ts` does not exist.** There are no configured singleton identifiers, collection identifiers, paths, formats, or Keystatic route targets to cross-reference.

- Expected singleton editor pattern: `/keystatic/singleton/{id}`
- Expected collection editor pattern: `/keystatic/collection/{id}`
- Configured identifiers: none
- Named path/format mismatches: none can be evaluated

The existing Astro `blog` collection does not automatically become a Keystatic collection. A future Keystatic config would need a collection identifier (for example, `blog`) and a path compatible with `src/content/blog/*` plus a Markdown/Markdoc-style content field matching the chosen format.

## 7. Keystatic UI branding and navigation

Because no `keystatic.config.ts` exists:

- `ui.brand`: **unset/not configured**
- `ui.navigation`: **unset/not configured**

If Keystatic were installed without custom UI settings, its default labels would apply; currently there is no Keystatic UI configuration at all.

## 8. Keystatic storage

`storage.kind` is **not configured** because there is no Keystatic config.

- Local: not configured
- GitHub: not configured
- Cloud: not configured
- `cloud.project`: not configured

The presence of a local Vercel link does not determine Keystatic storage mode.

## 9. Vercel linkage and production branch

The repository **is linked to a Vercel project** through `.vercel/project.json`:

```json
{"projectId":"prj_jgvwXSu4PzCtlZfp5DCHD6HnFTUT","orgId":"team_Smelc7J6assvIEjIVYurHDrT","projectName":"park101"}
```

Additional deployment configuration:

- `astro.config.mjs` imports and enables the `@astrojs/vercel` adapter.
- `vercel.json` does **not** exist.
- `astro.config.mjs` does not declare a Git/production branch.
- Therefore, the Production branch is **not visible in the inspected repository configuration**. It may be set in Vercel project settings, but that cannot be inferred from `.vercel/project.json`.

## 10. Existing images, Toast integrations, and dynamic components needing CMS fields

### Image inventory

There are **456 raster/vector image assets** in the two project media trees inspected:

| Directory | Count |
|---|---:|
| `public/images/food` | 203 |
| `public/images/venue` | 137 |
| `public/images/brunch` | 38 |
| `public/images/drinks` | 28 |
| `public/images/logo` | 4 |
| `src/assets/food` | 17 |
| `src/assets/venue` | 15 |
| `src/assets/drinks` | 9 |
| `src/assets/brunch` | 5 |
| **Total** | **456** |

The same subject images often appear in both `public/images` and `src/assets`, but they are separate files and usage modes: public URL strings versus Astro asset imports. A Keystatic implementation should choose a consistent public output directory and schema image-path convention to avoid editors managing two parallel media stores.

One literal image reference currently points to a missing file:

- `/images/venue/park101-carlsbad-rooftop-og.webp`, referenced as `siteProfile.seo.ogImage` and as the blog-category fallback, does not exist under `public/images/venue`.

### Current image-bearing data that should become editable

- **Blog posts:** `image` and `imageAlt` already exist in the Astro content schema, but `image` is a plain optional string rather than a CMS image field.
- **Site-wide settings:** `logo`, `logoLight`, and `seo.ogImage` in `src/data/site-profile.json`.
- **Upcoming events:** each entry has `image` and `imageAlt` in `siteProfile.upcomingEvents`.
- **Blog categories:** seven category records in `src/data/blog-categories.ts`, each with `slug`, `label`, `description`, and `image`.
- **Private events:** one hub image and five slug-to-image assignments in `src/data/private-events-images.ts`; alt text is mostly generated from event names rather than stored per image.
- **Menu page:** eight food records and four cocktail records, each hardcoded with an Astro image import, `alt`, `name`, and `description`; two additional food-spread/intro images are imported for page sections.
- **Brunch page:** three food cards and three drink cards with image, alt text, and name, plus hero/intro/private-event imagery.
- **Events page:** six event-type image/alt mappings keyed to the six event type slugs, plus hero imagery. The text records themselves live separately in `siteProfile.eventTypes`.
- **Home page:** six food cards, four drink images, a hero image, and multiple section images for venue, game day, live music, families, private events, and brunch.
- **Venue page:** imported hero/section images for rooftop, evening crowd, fire pit, game day, indoor bar, and families.
- **Contact page:** imported storefront hero image.
- **Page-level SEO:** several pages pass hardcoded `ogImage` URL strings to `Layout`.

Recommended field shape for each editorial image is an image/upload field paired with required alt text, with optional focal-point/caption fields where cards and wide heroes reuse the same source.

### Toast integrations

Toast is integrated through three editable external URLs in `src/data/site-profile.json`:

| Key | Purpose |
|---|---|
| `ordering.toastUrl` | Online ordering; used by navigation, footer, menu, and home-page CTAs |
| `ordering.reservationsUrl` | Toast Tables reservations; used by reservation CTAs such as the events page |
| `ordering.inquiryFormUrl` | Toast lead/inquiry form; used by `EventInquiryForm.astro` |

`EventInquiryForm.astro` is not a native submitted form; it renders a CTA link to the Toast inquiry URL. `Analytics.astro` classifies outbound Toast clicks as `order_click`, `reservation_click`, `inquiry_form_click`, or a general `toast_link_click`. These URLs should be singleton URL fields, ideally with validation, because changing them affects multiple site-wide CTAs and analytics classification.

The contact page also contains a Google Maps iframe; its map location is derived from hardcoded/embed markup rather than a CMS field and should be considered alongside the address/coordinates fields.

### Dynamic pages, components, and structured data candidates

No component named `MenuShowcase` exists. The current equivalent is the data arrays in `src/pages/menu.astro` rendered with `MenuItemCard.astro`.

The following dynamic or reusable structures need schema coverage if non-developers are expected to edit them:

- **Blog routes:** `src/pages/blog/[slug].astro`, paginated `src/pages/blog/[...page].astro`, and category pagination at `src/pages/blog/category/[category]/[...page].astro`. The blog collection and the separate category metadata must remain synchronized; category keys are currently a Zod enum plus a TypeScript record.
- **Private-event sub-pages:** `src/pages/private-events/[slug].astro` uses `getStaticPaths()` over `siteProfile.privateEvents`. Each of the five records needs `slug`, `name`, `headline`, `description`, `capacity`, repeatable `features`, repeatable FAQs (`q`, `a`), and an image/alt field. The same collection feeds cards on the private-events index and related-event cards.
- **Event cards:** `EventMatchupCard.astro` renders repeatable `upcomingEvents` fields: `category`, `sideA`, `sideB`, `date`, `time`, `image`, and `imageAlt`. Date and time are currently strings; CMS fields should preferably use date/time types.
- **Event types:** six repeatable records need `slug`, `name`, `description`, `recurring`, image, and image alt. Text and media are currently split between JSON and `events.astro`.
- **Menu cards:** `MenuItemCard.astro` needs repeatable item records with image, alt, name, description, category/section, ordering, and optionally price/availability. The current page holds separate `menuItems` and `cocktailItems` arrays.
- **Brunch cards and FAQ:** repeatable food/drink cards plus six FAQ entries are hardcoded in `brunch.astro`.
- **Private-event cards:** `PrivateEventCard.astro` consumes private-event collection data and a separately keyed image map; these should be unified in one collection entry.
- **Site settings singleton:** `src/data/site-profile.json` contains brand identity, descriptions, canonical URL, logos, contact/address/coordinates, hours and display hours, social URLs, Toast URLs, stats, feature lists, cuisines, price range, venue sections, private events, event types, upcoming events, SEO defaults, and structured-data settings. This is the strongest singleton candidate, although frequently updated events/private-event pages are better modeled as collections.
- **Navigation/footer:** `SiteNav.astro` and `SiteFooter.astro` contain hardcoded navigation/link labels in addition to site-profile data. These require navigation/link-list fields if editors should control them.
- **Page copy:** home, menu, brunch, events, venue, contact, and private-events index pages contain substantial hardcoded headings, descriptions, CTAs, FAQs, SEO titles/descriptions, and JSON-LD inputs. These would require page singletons or structured page collections; they are not currently in `src/content`.

## Readiness conclusion

The existing blog schema provides a useful starting point, but the project needs the Keystatic packages, Astro integration, config, storage choice, editor route wiring, and schemas before it is CMS-ready. The main modeling decision is to separate stable global settings/page content into singletons and repeatable editorial entities into collections. At minimum, likely collections are `blog`, `privateEvents`, `eventTypes` or `events`, `upcomingEvents`, and menu/brunch items; likely singletons are `siteSettings`, navigation/footer settings, and each major static page.
