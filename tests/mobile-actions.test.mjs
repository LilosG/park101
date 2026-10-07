import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const settings = JSON.parse(await readFile(new URL('../src/content/siteSettings/site-settings.json', import.meta.url), 'utf8'));
const reservationHref = settings.ordering.reservationsUrl.replaceAll('&', '&amp;');
const phoneHref = `tel:${settings.contact.phoneDial}`;

for (const page of ['index.html', 'contact/index.html', 'venue/index.html']) {
  test(`${page} renders one native mobile action bar and the desktop phone`, async () => {
    const html = await readFile(new URL(`../dist/client/${page}`, import.meta.url), 'utf8');
    const bars = [...html.matchAll(/<nav\b[^>]*id="mobile-action-bar"[^>]*>(.*?)<\/nav>/gs)];
    assert.equal(bars.length, 1);

    const actions = [...bars[0][1].matchAll(/<a\b([^>]*)>(.*?)<\/a>/gs)];
    assert.equal(actions.length, 2);
    assert.match(actions[0][1], new RegExp(`href="${escapeRegExp(reservationHref)}"`));
    assert.match(actions[0][1], /data-cta-location="mobile_bottom_bar"/);
    assert.equal(actions[0][2].trim(), 'RESERVE');
    assert.match(actions[1][1], new RegExp(`href="${escapeRegExp(phoneHref)}"`));
    assert.match(actions[1][1], /data-cta-location="mobile_bottom_bar"/);
    assert.equal(actions[1][2].trim(), 'CALL US');

    const header = html.match(/<header\b[^>]*id="site-nav"[^>]*>(.*?)<\/header>/s)?.[1];
    assert.ok(header);
    const phone = header.indexOf(`href="${phoneHref}"`);
    const order = header.indexOf(`href="${settings.ordering.toastUrl}"`);
    const reserve = header.indexOf(`href="${reservationHref}"`);
    assert.ok(phone >= 0 && phone < order && order < reserve);
    assert.match(header, new RegExp(`href="${escapeRegExp(phoneHref)}"[^>]*data-cta-location="nav_desktop"[^>]*>${escapeRegExp(settings.contact.phone)}<\/a>`));
  });
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
