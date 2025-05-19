import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './config/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_xeAdt0RCu4VT@ep-calm-dawn-a8nvj49g-pooler.eastus2.azure.neon.tech/ai-room-redesign?sslmode=require',
  },
});
