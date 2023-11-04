import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./drizzle.client";

await migrate(db, {
  migrationsFolder: './src/infra/db/migrations',
});