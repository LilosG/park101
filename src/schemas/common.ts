import { z } from 'astro/zod';

/**
 * Shared building blocks for every content schema.
 *
 * Keystatic saves blank optional text, numbers and images by omitting the key,
 * required text is always non-empty, and checkboxes are always present. The
 * helpers below encode those rules once so each collection schema only states
 * which fields exist and which are optional.
 */

/** Required text: Keystatic never saves an empty required string. */
export const text = z.string().min(1);

/** Image stored in `src/assets/<folder>/<file>` and resolved by `resolveContentImage`. */
export const assetImage = z
  .string()
  .regex(
    /^\/src\/assets\/[A-Za-z0-9_-]+\/[A-Za-z0-9._-]+\.(jpe?g|png|webp|avif)$/,
    'Image must be /src/assets/<folder>/<file> with a jpg, jpeg, png, webp or avif extension',
  );

/** Image served as a static file from `public/images`. */
export const publicImage = z
  .string()
  .regex(
    /^\/images\/[A-Za-z0-9_/-]+\/[A-Za-z0-9._-]+\.(jpe?g|png|webp|avif|svg)$/,
    'Image must be /images/<folder>/<file> with a jpg, jpeg, png, webp, avif or svg extension',
  );

export const internalPath = z.string().regex(/^\/[^\s]*$/, 'Must be an internal path starting with /');
export const externalUrl = z.url({ protocol: /^https?$/ });
export const href = z.union([internalPath, externalUrl]);

export const link = z.strictObject({ label: text, href });

export const seo = z.strictObject({
  title: text,
  description: text,
  ogImage: publicImage,
});

export const faq = z.strictObject({ q: text, a: text });

export const step = z.strictObject({ step: text, title: text, body: text });

/** A page section: eyebrow and heading always, plus body where the page renders it. */
export const section = z.strictObject({ eyebrow: text, heading: text });
export const sectionWithBody = z.strictObject({ eyebrow: text, heading: text, body: text });

export const hero = z.strictObject({ eyebrow: text, heading: text, body: text });
export const introBlock = z.strictObject({ eyebrow: text, heading: text, body: text });
