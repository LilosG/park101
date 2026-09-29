import { z } from 'astro/zod';
import '../keystatic/meta';

/**
 * Shared building blocks for every content schema.
 *
 * Keystatic saves blank optional text, numbers and images by omitting the key,
 * required text is always non-empty, and checkboxes are always present. The
 * helpers below encode those rules once so each collection schema only states
 * which fields exist and which are optional. `.meta()` carries the editor
 * label and help text used by `src/keystatic/from-schema.ts`.
 */

/** Editor label and optional help text. */
export const label = (title: string, description?: string) => ({
  title,
  ...(description ? { description } : {}),
});

/** Required text: Keystatic never saves an empty required string. */
export const text = z.string().min(1);

export const altText = text.meta(
  label(
    'Image Description for Accessibility',
    'Describe what is visible in the image for screen readers and search engines.',
  ),
);

const assetImagePattern = /^\/src\/assets\/[A-Za-z0-9_-]+\/[A-Za-z0-9._-]+\.(jpe?g|png|webp|avif)$/;
const publicImagePattern = /^\/images\/[A-Za-z0-9_/-]+\/[A-Za-z0-9._-]+\.(jpe?g|png|webp|avif|svg)$/;

/**
 * Image in `src/assets/<folder>/<file>`, resolved by `resolveContentImage`.
 * Edited as a path: the stored value is not in Keystatic's per-entry upload layout,
 * so an upload field would report "Image is required" and drop the value on save.
 */
export const assetImage = (title = 'Image', description?: string) =>
  z
    .string()
    .regex(assetImagePattern, 'Image must be /src/assets/<folder>/<file> with a jpg, jpeg, png, webp or avif extension')
    .meta({
      ...label(title, description ?? 'Path of an existing site image, e.g. /src/assets/venue/photo.jpg.'),
      contentType: 'image',
      patternMessage: 'Use /src/assets/<folder>/<file> with a jpg, jpeg, png, webp or avif extension.',
    });

/**
 * Image served from `public/images`. Pass `storage` when the stored value already matches the
 * path Keystatic writes on save, which makes the field a real upload; otherwise it is edited as a path.
 */
export const publicImage = (
  title = 'Image',
  storage?: { directory: string; publicPath: string },
  description?: string,
) =>
  z
    .string()
    .regex(publicImagePattern, 'Image must be /images/<folder>/<file> with a jpg, jpeg, png, webp, avif or svg extension')
    .meta({
      ...label(title, description),
      contentType: 'image',
      patternMessage: 'Use /images/<folder>/<file> with a jpg, jpeg, png, webp, avif or svg extension.',
      ...(storage ? { storage } : {}),
    });

export const internalPath = z.string().regex(/^\/[^\s]*$/, 'Must be an internal path starting with /');
export const externalUrl = z.url({ protocol: /^https?$/ });
export const href = z
  .string()
  .regex(/^(\/[^\s]*|https?:\/\/\S+)$/, 'Must be an internal path or a full web address')
  .meta({
    ...label('Link Destination', 'Enter an internal path such as /contact or a complete external web address.'),
    patternMessage: 'Enter an internal path such as /contact or a complete https:// address.',
  });

export const link = z.strictObject({ label: text.meta(label('Label')), href });

export const seo = (ogImageStorage?: { directory: string; publicPath: string }) =>
  z
    .strictObject({
      title: text.meta(
        label('Search Result Title', 'Title shown in Google search results. Keep it concise and specific.'),
      ),
      description: text.meta({
        ...label(
          'Search Result Description',
          'Summary shown in search results. Aim for one clear sentence about this page.',
        ),
        multiline: true,
      }),
      ogImage: publicImage('Social Sharing Image', ogImageStorage),
    })
    .meta(label('Search Engine Settings'));

export const faq = z.strictObject({
  q: text.meta(label('Question', 'Question displayed in the frequently asked questions section.')),
  a: text.meta(label('Answer', 'Answer displayed with this question.')),
});

export const step = z.strictObject({
  step: text.meta(label('Step Number')),
  title: text.meta(label('Title')),
  body: text.meta({ ...label('Section Text'), multiline: true }),
});

const eyebrow = text.meta(label('Small Section Label'));
const sectionHeading = text.meta(label('Section Heading'));
const sectionBody = text.meta({ ...label('Section Text'), multiline: true });

/** A page section: eyebrow and heading always, plus body where the page renders it. */
export const section = (title?: string) => {
  const shape = z.strictObject({ eyebrow, heading: sectionHeading });
  return title ? shape.meta(label(title)) : shape;
};
export const sectionWithBody = (title?: string) => {
  const shape = z.strictObject({ eyebrow, heading: sectionHeading, body: sectionBody });
  return title ? shape.meta(label(title)) : shape;
};

const heroHeading = text.meta(
  label('Main Page Heading (H1)', 'The one H1 of this page, shown large at the top. Keep it descriptive.'),
);
const heroBody = text.meta({
  ...label('Introductory Text', 'Introductory text shown near the top of the page. Keep it clear and concise.'),
  multiline: true,
});

export const hero = z
  .strictObject({ eyebrow, heading: heroHeading, body: heroBody })
  .meta(label('Hero Section'));
export const introBlock = z
  .strictObject({ eyebrow, heading: sectionHeading, body: sectionBody })
  .meta(label('Introduction Section'));
