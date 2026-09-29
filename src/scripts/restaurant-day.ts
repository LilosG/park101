/**
 * Decides "today" in the restaurant's time zone (exposed as <html data-time-zone>), so static
 * pages never depend on the build date or the visitor's own time zone.
 *
 * - Sets <html data-today="YYYY-MM-DD">.
 * - Hides every [data-expires="YYYY-MM-DD"] element once that day has passed.
 * - For a [data-expiring-list], reveals its [data-empty-state] sibling and hides the list when
 *   every item has expired.
 *
 * Without JavaScript nothing is hidden, so the server-rendered list is shown as built.
 */
function restaurantToday(timeZone: string): string | null {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(new Date());
    const get = (type: string) => parts.find((part) => part.type === type)?.value;
    return `${get('year')}-${get('month')}-${get('day')}`;
  } catch {
    return null;
  }
}

function applyRestaurantDay(): void {
  const root = document.documentElement;
  const timeZone = root.dataset.timeZone;
  if (!timeZone) return;
  const today = restaurantToday(timeZone);
  if (!today) return;
  root.dataset.today = today;

  document.querySelectorAll<HTMLElement>('[data-expires]').forEach((item) => {
    item.hidden = (item.dataset.expires ?? '') < today;
  });

  document.querySelectorAll<HTMLElement>('[data-expiring-list]').forEach((list) => {
    const anyLeft = list.querySelector('[data-expires]:not([hidden])') !== null;
    list.hidden = !anyLeft;
    const empty = list.parentElement?.querySelector<HTMLElement>('[data-empty-state]');
    if (empty) empty.hidden = anyLeft;
  });
}

applyRestaurantDay();
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) applyRestaurantDay();
});
