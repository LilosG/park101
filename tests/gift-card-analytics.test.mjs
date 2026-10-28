import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

const source = readFileSync(new URL('../src/components/core/Analytics.astro', import.meta.url), 'utf8').match(/<script[^>]*>([\s\S]*?)<\/script>/)[1];
function browser({ optOut = false, gpc = false } = {}) {
  let click;
  const navigator = { globalPrivacyControl: gpc };
  let choice = JSON.stringify({ optOut });
  class Element {
    constructor(href) { this.href = href; this.dataset = { ctaLocation: 'test' }; }
    closest() { return this; }
  }
  const window = { location: { pathname: '/gift-cards' } };
  vm.runInNewContext(source, { GA_ID: 'G-TEST', window, navigator, Element, URL,
    localStorage: { getItem: () => choice, setItem: (_, value) => { choice = value; } },
    document: { createElement: () => ({}), head: { appendChild() {} }, addEventListener: (_, handler) => { click = handler; } },
  });
  // Inspect the same dataLayer GA uses; no network or measurement account involved.
  return { window, navigator, click: href => click?.({ target: new Element(href) }), events: () => window.dataLayer?.filter(args => args[0] === 'event').map(args => args[1]) ?? [] };
}

test('gift purchases and balance checks remain distinct from food ordering', () => {
  const b = browser();
  b.click('https://order.toasttab.com/egiftcards/park-101-3040-carlsbad-blvd');
  b.click('https://www.toasttab.com//park-101-3040-carlsbad-blvd/findcard');
  b.click('https://order.toasttab.com/online/park-101-3040-carlsbad-blvd');
  assert.deepEqual(Array.from(b.events()), ['gift_card_click', 'gift_card_balance_click', 'order_click']);
});

test('gift tracking honors stored opt-out, GPC and withdrawal after initialization', () => {
  const href = 'https://order.toasttab.com/egiftcards/park-101-3040-carlsbad-blvd';
  for (const options of [{ optOut: true }, { gpc: true }]) {
    const b = browser(options); b.click(href); assert.equal(b.events().length, 0); assert.equal(b.window.__lilosGA4Loaded, undefined);
  }
  const b = browser(); b.window.lilosPrivacy.optOut(); b.click(href); assert.equal(b.events().length, 0);
  const c = browser(); c.navigator.globalPrivacyControl = true; c.click(href); assert.equal(c.events().length, 0);
});
