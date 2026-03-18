import { neon } from '@neondatabase/serverless';

// Fallback to the provided URL if Vercel Environment Variables aren't configured
const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_3VkietPa6opX@ep-patient-waterfall-a1f40wgv-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

export const sql = neon(connectionString);
