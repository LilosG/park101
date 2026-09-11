import type { ImageMetadata } from 'astro';

const assetImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

export function resolveContentImage(path: string): ImageMetadata {
  const image = assetImages[path]?.default;

  if (!image) {
    throw new Error(`Image asset not found for content path: ${path}`);
  }

  return image;
}
