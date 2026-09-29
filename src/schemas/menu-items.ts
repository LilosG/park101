import { z } from 'astro/zod';
import { assetImage, text } from './common';

/** Featured menu item. The full menu lives on the external ordering site. */
export const menuItemSchema = z.strictObject({
  name: text,
  description: text.optional(),
  image: assetImage,
  imageAlt: text,
  order: z.number().int().nonnegative(),
});
