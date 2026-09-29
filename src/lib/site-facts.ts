/**
 * Facts that live in site settings and must never be retyped into copy. FAQ answers may contain
 * these tokens; they are replaced with the settings values when the page is built.
 */
interface FactSettings {
  contact: { phone: string; neighborhood: string; address: { full: string } };
  hoursDisplay: { days: string; hours: string }[];
  happyHours: { label: string; days: string; hours: string; note?: string };
}

export const factTokens = ['[address]', '[neighborhood]', '[phone]', '[hours]', '[happyHour]'] as const;

/** True when every bracketed token in the text is a known fact token. */
export const hasOnlyKnownTokens = (value: string) =>
  (value.match(/\[[A-Za-z]+\]/g) ?? []).every((token) => (factTokens as readonly string[]).includes(token));

export const fillFacts = (value: string, settings: FactSettings) => {
  const { contact, hoursDisplay, happyHours } = settings;
  const values: Record<(typeof factTokens)[number], string> = {
    '[address]': contact.address.full,
    '[neighborhood]': contact.neighborhood,
    '[phone]': contact.phone,
    '[hours]': hoursDisplay.map((entry) => `${entry.days} ${entry.hours}`).join('; '),
    '[happyHour]': `${happyHours.label}: ${happyHours.days}, ${happyHours.hours}.${happyHours.note ? ` ${happyHours.note}.` : ''}`,
  };
  return value.replace(/\[[A-Za-z]+\]/g, (token) => values[token as (typeof factTokens)[number]] ?? token);
};
