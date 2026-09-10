export type PromotionFeedOrigin = `https://${string}`;

/**
 * The origin of the manager's sanitized public promotion API.
 *
 * Keep this as the only restaurant-site reference to the manager origin so a
 * future domain migration does not require changes to component logic.
 */
export const PROMOTION_FEED_ORIGIN: PromotionFeedOrigin =
  'https://gph-site-manager.vercel.app';

export function getPromotionFeedUrl(siteSlug: string): string {
  return new URL(
    `/api/public/promotion/${encodeURIComponent(siteSlug)}`,
    PROMOTION_FEED_ORIGIN,
  ).href;
}
