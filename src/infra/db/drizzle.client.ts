import { Client } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

export const client = new Client({
  connectionString: 'postgres://postgres:pass123@localhost:5441/postgres',
});

await client.connect();

export const db = drizzle(client);
