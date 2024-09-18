import { defineConfig } from 'drizzle-kit';
import { env } from './src/env';


export default defineConfig({
  schema: "./src/db/schema/index.ts",
  out: "./.migrations",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  dialect: 'postgresql'
})