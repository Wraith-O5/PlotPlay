const { sql } = require('../../../_db.js');

module.exports = async function handler(request, response) {
    if (request.method !== 'GET') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }

    const { id } = request.query;

    if (!id) {
        return response.status(400).json({ error: 'Writer ID is required.' });
    }

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

        return response.status(200).json({ novels });

    } catch (error) {
        console.error('Fetch writer novels error:', error);
        return response.status(500).json({
            error: 'Failed to fetch writer novels.',
            details: error.message
        });
    }
}
