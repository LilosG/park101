import { z } from 'astro/zod';
import { altText, assetImage, label, text } from './common';

/** Featured menu item. The full menu lives on the external ordering site. */
export const menuItemSchema = z.strictObject({
  name: text.meta({
    ...label('Menu Item Name', 'Name displayed for this menu item.'),
    slug: true,
  }),
  description: text.optional().meta({
    ...label('Item Description', 'Short description displayed with this menu item.'),
    multiline: true,
  }),
  image: assetImage('Menu Item Image', 'Photo displayed with this menu item.'),
  imageAlt: altText,
  order: z
    .number()
    .int()
    .nonnegative()
    .meta(label('Display Order', 'Controls the display order. Lower numbers appear first.')),
});
