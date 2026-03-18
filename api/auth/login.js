const { sql } = require('../_db.js');
const bcrypt = require('bcryptjs');

module.exports = async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }

    const { email, password } = request.body;

    if (!email || !password) {
        return response.status(400).json({ error: 'Missing required fields: email, password' });
    }

    try {
        const users = await sql`
            SELECT u.user_id as id, u.username, u.email, u.password_hash,
                   r.reader_id, w.writer_id
            FROM users u
            LEFT JOIN readers r ON u.user_id = r.user_id
            LEFT JOIN writers w ON u.user_id = w.user_id
            WHERE u.email = ${email} OR u.username = ${email}
            LIMIT 1
        `;

        if (users.length === 0) {
            return response.status(401).json({ error: 'Invalid email/username or password.' });
        }

        const user = users[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return response.status(401).json({ error: 'Invalid email/username or password.' });
        }

        // Return user info
        return response.status(200).json({
            message: 'Login successful!',
            user: {
                id: user.reader_id,
                writerId: user.writer_id,
                username: user.username,
                email: user.email,
                role: 'reader', 
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
