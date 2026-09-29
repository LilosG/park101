import { z } from 'astro/zod';
import { externalUrl, internalPath, link, text } from './common';

export const navigationSchema = z.strictObject({
  mainLinks: z.array(link).min(1),
  // SiteFooter reads these by position, so the list must keep its current length.
  footerLinks: z.array(link).length(8),
  labels: z.strictObject({
    homeAria: text,
    mainAria: text,
    mobileAria: text,
    openMenuAria: text,
    closeMenuAria: text,
    desktopOrder: text,
    desktopReserve: text,
    mobileOrder: text,
    mobileReserve: text,
    footerExplore: text,
    footerNavigationAria: text,
    footerVisit: text,
    footerHours: text,
    footerOrder: text,
    footerReserve: text,
    network: text,
    websiteCredit: text,
  }),
  links: z.strictObject({
    home: internalPath,
    network: externalUrl,
    websiteCredit: externalUrl,
  }),
});
