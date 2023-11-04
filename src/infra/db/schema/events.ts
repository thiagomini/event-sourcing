import {
  jsonb,
  pgTable,
  serial,
  unique,
  varchar
} from 'drizzle-orm/pg-core';

export const events = pgTable(
  'events',
  {
    id: serial('id').primaryKey(),
    streamId: varchar('stream_id').notNull(),
    version: serial('version'),
    data: jsonb('data').notNull(),
  },
  (events) => {
    return {
      uniqueStreamVersion: unique().on(events.streamId, events.version),
    };
  },
);
