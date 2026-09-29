import type { ImageMetadata } from 'astro';
import { resolveContentImage } from '../lib/images';

/** Blog image and alt text come from each post's frontmatter (the single source). */
export function resolveBlogImage(post: { id: string; data: { image?: string; imageAlt?: string; title: string } }): {
  image?: ImageMetadata;
  imageAlt: string;
} {
  return {
    image: post.data.image ? resolveContentImage(post.data.image) : undefined,
    imageAlt: post.data.imageAlt ?? post.data.title,
  };
}
