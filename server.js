require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { neon } = require('@neondatabase/serverless');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const sql = neon(process.env.DATABASE_URL);

// --- API ENDPOINTS ---

// 1. Signup Route
app.post('/api/auth/signup', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields: username, email, password' });
    }

    try {
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

        return res.status(201).json({
            message: 'Account created successfully!',
            user: newUser,
            reader: { reader_id: readerResult[0].reader_id, ...newUser },
            writer: { writer_id: writerResult[0].writer_id, ...newUser },
        });

    } catch (error) {
        console.error('Signup error:', error);
        if (error.message && error.message.includes('unique')) {
            return res.status(409).json({
                error: 'An account with that email or username already exists.'
            });
        }
        return res.status(500).json({ error: 'Internal server error during signup.' });
    }
});

// 2. Login Route
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Missing required fields: email, password' });
    }

    try {
        const users = await sql`
            SELECT u.user_id, u.username, u.email, u.password_hash,
                   r.reader_id, w.writer_id
            FROM users u
            LEFT JOIN readers r ON u.user_id = r.user_id
            LEFT JOIN writers w ON u.user_id = w.user_id
            WHERE u.email = ${email} OR u.username = ${email}
            LIMIT 1
        `;

        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid email/username or password.' });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email/username or password.' });
        }

        return res.status(200).json({
            message: 'Login successful!',
            user: {
                id: user.reader_id,
                writerId: user.writer_id,
                username: user.username,
                email: user.email,
                role: 'reader', // default to reader dashboard
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Internal server error during login.' });
    }
});

// 3. Get All Novels
app.get('/api/novels', async (req, res) => {
    try {
        const novels = await sql`
            SELECT
                n.novel_id,
                n.name,
                n.description,
                n.review_score,
                n.cover_image_url,
                n.created_at,
                g.name AS genre,
                u.username AS author
            FROM novels n
            LEFT JOIN genres g ON n.genre_id = g.genre_id
            LEFT JOIN writers w ON n.writer_id = w.writer_id
            LEFT JOIN users u ON w.user_id = u.user_id
            ORDER BY n.created_at DESC
        `;
        return res.status(200).json({ novels });
    } catch (error) {
        console.error('Fetch novels error:', error);
        return res.status(500).json({ error: 'Failed to fetch novels.' });
    }
});

// 4. Get Novel Details
app.get('/api/novels/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const novels = await sql`
            SELECT
                n.novel_id,
                n.name,
                n.description,
                n.review_score,
                n.cover_image_url,
                n.created_at,
                g.name AS genre,
                u.username AS author,
                w.writer_id
            FROM novels n
            LEFT JOIN genres g ON n.genre_id = g.genre_id
            LEFT JOIN writers w ON n.writer_id = w.writer_id
            LEFT JOIN users u ON w.user_id = u.user_id
            WHERE n.novel_id = ${id}
        `;

        if (novels.length === 0) {
            return res.status(404).json({ error: 'Novel not found.' });
        }

        const chapters = await sql`
            SELECT chapter_id, title, chapter_num, created_at
            FROM chapters
            WHERE novel_id = ${id}
            ORDER BY chapter_num ASC
        `;

        return res.status(200).json({
            novel: novels[0],
            chapters
        });
    } catch (error) {
        console.error('Fetch novel detail error:', error);
        return res.status(500).json({ error: 'Failed to fetch novel details.' });
    }
});

// 5. Get Writer's Works
app.get('/api/writers/:id/novels', async (req, res) => {
    const { id } = req.params;

    try {
        const novels = await sql`
            SELECT
                n.novel_id,
                n.name,
                n.description,
                n.review_score,
                n.cover_image_url,
                n.created_at,
                g.name AS genre,
                COUNT(c.chapter_id) AS chapter_count
            FROM novels n
            LEFT JOIN genres g ON n.genre_id = g.genre_id
            LEFT JOIN chapters c ON n.novel_id = c.novel_id
            WHERE n.writer_id = ${id}
            GROUP BY n.novel_id, g.name
            ORDER BY n.created_at DESC
        `;
        return res.status(200).json({ novels });
    } catch (error) {
        console.error('Fetch writer novels error:', error);
        return res.status(500).json({ error: 'Failed to fetch writer novels.' });
    }
});

// 6. Get Single Chapter Details & Content
app.get('/api/chapters/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const chapters = await sql`
            SELECT
                chapter_id,
                novel_id,
                title,
                chapter_num,
                content,
                created_at
            FROM chapters
            WHERE chapter_id = ${id}
        `;

        if (chapters.length === 0) {
            return res.status(404).json({ error: 'Chapter not found.' });
        }

        return res.status(200).json({ chapter: chapters[0] });
    } catch (error) {
        console.error('Fetch chapter error:', error);
        return res.status(500).json({ error: 'Failed to fetch chapter content.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`API endpoints ready...`);
});
