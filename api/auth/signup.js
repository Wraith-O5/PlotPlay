import { sql } from '../_db.js';
import bcrypt from 'bcryptjs';

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }

    const { username, email, password } = request.body;

    if (!username || !email || !password) {
        return response.status(400).json({ error: 'Missing required fields: username, email, password' });
    }

    try {
        // Hash the password
        const password_hash = await bcrypt.hash(password, 10);

        // Insert into readers table
        const readerResult = await sql`
            INSERT INTO readers (username, email, password_hash)
            VALUES (${username}, ${email}, ${password_hash})
            RETURNING reader_id, username, email, created_at
        `;

        // Insert into writers table
        const writerResult = await sql`
            INSERT INTO writers (username, email, password_hash)
            VALUES (${username}, ${email}, ${password_hash})
            RETURNING writer_id, username, email, created_at
        `;

        return response.status(201).json({
            message: 'Account created successfully!',
            reader: readerResult[0],
            writer: writerResult[0],
        });

    } catch (error) {
        console.error('Signup error:', error);

        // Handle unique constraint violations (duplicate email/username)
        if (error.message && error.message.includes('unique')) {
            return response.status(409).json({
                error: 'An account with that email or username already exists.'
            });
        }

        return response.status(500).json({
            error: 'Internal server error during signup.',
            details: error.message
        });
    }
}
