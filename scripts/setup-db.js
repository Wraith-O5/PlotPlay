require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
        console.error('Error: DATABASE_URL is not defined in your .env file.');
        process.exit(1);
    }

    const sql = neon(databaseUrl);

    async function runSqlFile(filePath) {
        console.log(`Reading ${path.basename(filePath)}...`);
        const content = fs.readFileSync(filePath, 'utf8');

        // Strip line comments (-- ...) and split by semicolon
        const queries = content
            .split('\n')
            .map(line => line.split('--')[0])
            .join('\n')
            .split(';')
            .map(q => q.trim())
            .filter(q => q.length > 0);

        for (const query of queries) {
            try {
                const querySummary = query.substring(0, 100).replace(/\n/g, ' ');
                console.log(`Executing: ${querySummary}...`);

                if (typeof sql.query === 'function') {
                    await sql.query(query);
                } else {
                    await sql(query);
                }
            } catch (err) {
                console.error(`\n❌ Error executing query: ${query.substring(0, 100)}...`);
                throw err;
            }
        }
    }

    try {
        console.log('--- Database Setup Started ---');
        console.log('Target DATABASE_URL:', process.env.DATABASE_URL.replace(/:([^:@]+)@/, ':****@'));

        // 1. Execute Schema
        console.log('\n--- Step 1: Creating Schema ---');
        await runSqlFile(path.join(__dirname, '../database/schema.sql'));
        console.log('✅ Schema created successfully.');

        // 2. Execute Seed Data
        console.log('\n--- Step 2: Seeding Data ---');
        await runSqlFile(path.join(__dirname, '../database/seed-data.sql'));
        console.log('✅ Mock data seeded successfully.');

        console.log('\n✨ Database setup complete!');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Failed to setup database.');
        console.error('Error Details:', error.message);
        process.exit(1);
    }
}

setupDatabase();
