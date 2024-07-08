import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  schema: './utils/schema.tsx',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:UMSoLyDj26Zd@ep-red-flower-a1r4ift1.ap-southeast-1.aws.neon.tech/AI-Content-Generator?sslmode=require',
  },
  verbose: true,
  strict: true,
});
