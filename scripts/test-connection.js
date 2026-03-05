require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

async function testConnection() {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
        console.error('Error: DATABASE_URL is not defined in your .env file.');
        process.exit(1);
    }

    console.log('Attempting to connect to NeonDB...');
    const sql = neon(databaseUrl);

    try {
        const result = await sql`SELECT NOW() as current_time, version() as db_version`;
        console.log('\n✅ Successfully connected to NeonDB!');
        console.log('Current Time (DB):', result[0].current_time);
        console.log('Database Version:', result[0].db_version);
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Failed to connect to NeonDB.');
        console.error('Error Details:', error.message);
        process.exit(1);
    }
}

testConnection();
