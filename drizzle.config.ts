import { Config } from 'drizzle-kit';

export default {
  schema: './src/infra/db/schema',
  driver: 'pg',
  out: './src/infra/db/migrations',
  dbCredentials: {
    connectionString: 'postgres://postgres:pass123@localhost:5441/postgres'
  }
} satisfies Config