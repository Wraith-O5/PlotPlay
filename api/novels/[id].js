const { sql } = require('../_db.js');

module.exports = async function handler(request, response) {
    if (request.method !== 'GET') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }

    const { id } = request.query;

    if (!id) {
        return response.status(400).json({ error: 'Novel ID is required.' });
    }

    try {
        // Fetch novel metadata
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
            return response.status(404).json({ error: 'Novel not found.' });
        }

        // Fetch chapters for this novel
        const chapters = await sql`
            SELECT chapter_id, title, chapter_num, created_at
            FROM chapters
            WHERE novel_id = ${id}
            ORDER BY chapter_num ASC
        `;

        return response.status(200).json({
            novel: novels[0],
            chapters
        });

    } catch (error) {
        console.error('Fetch novel detail error:', error);
        return response.status(500).json({
            error: 'Failed to fetch novel details.',
            details: error.message
        });
    }
}
