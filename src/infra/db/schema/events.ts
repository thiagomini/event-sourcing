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
    data: jsonb('data').notNull(),
  },
  (events) => {
    return {
      uniqueStreamVersion: unique().on(events.streamId),
    };
  },
);
