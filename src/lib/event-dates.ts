const monthIndex: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

/**
 * Calendar date (`YYYY-MM-DD`) of an event stored as `date: "Sat, Jul 11"` plus `year`.
 * Events are dated by day only, so this is the last day the event is upcoming.
 */
export function eventIsoDate(date: string, year: number): string | null {
  const match = date.match(/([A-Z][a-z]{2})\s+(\d{1,2})$/);
  if (!match || monthIndex[match[1]] === undefined) return null;
  const month = String(monthIndex[match[1]] + 1).padStart(2, '0');
  return `${year}-${month}-${match[2].padStart(2, '0')}`;
}

/**
 * Build-time cut-off for the no-JavaScript fallback: an event stays in the page until it is
 * more than a full day old in UTC, which can never remove an event that is still upcoming
 * in any time zone. The exact per-day decision is made in the browser (restaurant-day.ts).
 */
export function fallbackCutoffIso(now: Date = new Date()): string {
  return new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
}
