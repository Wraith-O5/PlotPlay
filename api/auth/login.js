import { sql } from '../_db.js';
import bcrypt from 'bcryptjs';

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }

    const { email, password } = request.body;

    if (!email || !password) {
        return response.status(400).json({ error: 'Missing required fields: email, password' });
    }

    try {
        // Look up user in readers table (by email or username)
        let users = await sql`
            SELECT reader_id as id, username, email, password_hash, 'reader' as role
            FROM readers
            WHERE email = ${email} OR username = ${email}
            LIMIT 1
        `;

        // If not found as a reader, check writers table
        if (users.length === 0) {
            users = await sql`
                SELECT writer_id as id, username, email, password_hash, 'writer' as role
                FROM writers
                WHERE email = ${email} OR username = ${email}
                LIMIT 1
            `;
        }

        if (users.length === 0) {
            return response.status(401).json({ error: 'Invalid email/username or password.' });
        }

        const user = users[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return response.status(401).json({ error: 'Invalid email/username or password.' });
        }

        // Return user info (excluding password_hash)
        return response.status(200).json({
            message: 'Login successful!',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return response.status(500).json({
            error: 'Internal server error during login.',
            details: error.message
        });
    }
}
