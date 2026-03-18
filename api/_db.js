const { neon } = require('@neondatabase/serverless');

// Fallback to the hardcoded URL if environment variable is not configured
const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_3VkietPa6opX@ep-patient-waterfall-a1f40wgv-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const sql = neon(connectionString);

module.exports = { sql };
