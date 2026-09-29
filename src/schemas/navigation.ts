import { z } from 'astro/zod';
import { externalUrl, internalPath, label, link, text } from './common';

const item = (title: string) => text.meta(label(title));

export const navigationSchema = z.strictObject({
  mainLinks: z.array(link).min(1).meta(label('Main Navigation Links')),
  // SiteFooter reads these by position, so the list must keep its current length.
  footerLinks: z.array(link).length(8).meta(label('Footer Navigation Links')),
  labels: z
    .strictObject({
      homeAria: item('Home Aria'),
      mainAria: item('Main Aria'),
      mobileAria: item('Mobile Aria'),
      openMenuAria: item('Open Menu Aria'),
      closeMenuAria: item('Close Menu Aria'),
      desktopOrder: item('Desktop Order'),
      desktopReserve: item('Desktop Reserve'),
      mobileOrder: item('Mobile Order'),
      mobileReserve: item('Mobile Reserve'),
      footerExplore: item('Footer Explore'),
      footerNavigationAria: item('Footer Navigation Aria'),
      footerVisit: item('Footer Visit'),
      footerHours: item('Footer Hours'),
      footerOrder: item('Footer Order'),
      footerReserve: item('Footer Reserve'),
      instagramAria: item('Instagram Link Aria'),
      facebookAria: item('Facebook Link Aria'),
      network: item('Network'),
      websiteCredit: item('Website Credit'),
    })
    .meta(label('Interface Labels')),
  links: z
    .strictObject({
      home: internalPath.meta(label('Home')),
      network: externalUrl.meta(label('Network')),
      websiteCredit: externalUrl.meta(label('Website Credit')),
    })
    .meta(label('Website Links')),
});
