import { sql } from './_db.js';

export default async function handler(request, response) {
    try {
        // Basic connectivity test
        const result = await sql`SELECT NOW() as current_time, version()`;

        return response.status(200).json({
            message: "Successfully connected to Neon database!",
            data: result[0]
        });
    } catch (error) {
        console.error('Database connection error:', error);
        return response.status(500).json({
            error: "Failed to connect to the database",
            details: error.message
        });
    }
}
