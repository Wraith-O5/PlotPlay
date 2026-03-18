const { sql } = require('../_db.js');
const bcrypt = require('bcryptjs');

module.exports = async function handler(request, response) {
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

        // Insert into central users table
        const userResult = await sql`
            INSERT INTO users (username, email, password_hash)
            VALUES (${username}, ${email}, ${password_hash})
            RETURNING user_id, username, email, created_at
        `;
        const newUser = userResult[0];

        // Give them a reader profile
        const readerResult = await sql`
            INSERT INTO readers (user_id)
            VALUES (${newUser.user_id})
            RETURNING reader_id
        `;

        // Give them a writer profile
        const writerResult = await sql`
            INSERT INTO writers (user_id)
            VALUES (${newUser.user_id})
            RETURNING writer_id
        `;

        return response.status(201).json({
            message: 'Account created successfully!',
            user: newUser,
            reader: { reader_id: readerResult[0].reader_id, ...newUser },
            writer: { writer_id: writerResult[0].writer_id, ...newUser },
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
