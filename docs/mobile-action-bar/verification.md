# Mobile actions and desktop phone verification

Tested against `origin/main` fetched on 2026-10-06. The checkout was clean and even with `origin/main` before branching. Astro 6.4.5, Tailwind 4.3, npm, and Node 24.14.1 were used for final checks.

## Implementation checks

- `npm run build`: passed on Node 24.14.1.
- `npx astro check`: 0 errors, 0 warnings, 14 existing hints.
- `npm run test:mobile-actions`: 3 passing build-output integration tests for Home, Contact, and Venue.
- `git diff --check`: passed.
- `lg` remains the sole transition at 1024px. At 1024px the desktop navigation ends at x=617px and the CTA group begins at x=718px; the group ends at x=992px inside the 1024px viewport. The phone link has a 44px high target.
- Mobile viewports 320, 375, 390, 430, 768, and 1023px; desktop viewports 1024, 1280, 1440, and 1920px: bar visibility and equal halves, desktop visibility, native destinations, and horizontal fit checked. Home, Contact, Venue, and Private Events were visited.
- At normal mobile text size, the bar and body/footer clearance each measured 56px. With a simulated 24px bottom inset, they each measured 80px. At forced 200% and 300% root text size, the bar grew to about 149px and 269px, and body padding, scroll padding, and consent offset followed the measured height. The links themselves had no horizontal overflow. Contact page content outside the bar overflows at forced 200% and 300%; an isolated unchanged `origin/main` checkout reproduced that issue (112px and 328px overflow at 320px viewport). This rollout did not change that page content.
- Browser checks covered footer clearance, visible consent controls above the bar, the native promotion dialog covering the bar, and the existing private-event inquiry link. No physical device or actual hardware safe-area check was performed; the 24px inset was simulated in Chromium.
- Drawer checks covered focus entry, Tab and Shift+Tab cycling, Enter on close and a drawer link, Escape, three open/close cycles, breakpoint crossing, inert restoration, and restoring the original 700px scroll position. The promotion dialog's Escape behavior was not verified because the browser automation did not deliver that key in the synthetic dialog check.
- JavaScript-disabled Chromium rendered both mobile anchors with the canonical destinations and 56px CSS fallback clearance. Native `tel:` handoff on a physical phone was not tested.

## Color and analytics

The Reserve half uses existing orange-dark `#A84F22` and white `#FDFAF7` (5.31:1 contrast). Call Us uses dark `#1B140F` and white `#FDFAF7` (17.51:1). These exceed 4.5:1 for the normal-sized labels.

With a local dummy measurement ID, browser activation dispatched one `reservation_click` or `phone_click` per click or Enter activation, with `link_url`, `page_path`, and `cta_location` (`mobile_bottom_bar` or `nav_desktop`). Existing `order_click` and `inquiry_form_click` still dispatched. Stored initial opt-out, later API opt-out, later GA disable flag, and initial and later GPC suppressed dispatch. A throwing `gtag` left the anchor's default action available. Actual receipt in Park's GA4 property was not verified. If placement reporting is desired in GA4 reports, register `cta_location` as an event-scoped custom dimension; registration is not needed to send the parameter.

## Screenshots

- [Home mobile, 390px](home-mobile-390.png)
- [Contact mobile, 320px](contact-mobile-320.png)
- [Venue tablet, 768px](venue-tablet-768.png)
- [Open mobile drawer, 390px](drawer-mobile-390.png)
- [Desktop transition, 1024px](home-desktop-1024.png)
- [Desktop transparent header, 1440px](home-desktop-1440.png)
- [Desktop scrolled header, 1440px](home-desktop-scrolled-1440.png)
