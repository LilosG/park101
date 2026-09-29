import { z } from 'astro/zod';
import { label, text } from './common';

/**
 * One game on a team schedule shown on /sports. The page has one schedule
 * section per team, so `team` is a fixed choice.
 */
export const sportsTeams = ['bills', 'buckeyes'] as const;

export const sportsGameSchema = z.strictObject({
  slug: z
    .string()
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    .meta({
      ...label('Game ID', 'Controls the item identifier, for example bills-week-01. Do not change after publishing unless instructed.'),
      slug: true,
    }),
  team: z.enum(sportsTeams).meta({
    ...label('Team', 'Which schedule this game appears on.'),
    optionLabels: { bills: 'Buffalo Bills', buckeyes: 'Ohio State Buckeyes' },
  }),
  week: z.number().int().meta(label('Week', 'Week number shown in the first column.')),
  date: text.meta(label('Date', 'Shown as written, for example Sep 13 or TBD.')),
  opponent: text.meta(label('Matchup', 'Shown as written, for example @ Houston Texans or vs Detroit Lions.')),
  time: text.meta(label('Kickoff (PT)', 'Shown as written, for example 10:00 AM PT or TBA.')),
  status: z.enum(['home', 'away', 'off']).meta({
    ...label('Home, Away or Off Week', 'Off weeks are shown dimmed.'),
    optionLabels: { home: 'Home game', away: 'Away game', off: 'Off week / bye' },
  }),
});
