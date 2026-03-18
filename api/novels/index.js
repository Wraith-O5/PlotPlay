import { sql } from '../_db.js';

export default async function handler(request, response) {
    if (request.method !== 'GET') {
        return response.status(405).json({ error: 'Method Not Allowed' });
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
                u.username AS author
            FROM novels n
            LEFT JOIN genres g ON n.genre_id = g.genre_id
            LEFT JOIN writers w ON n.writer_id = w.writer_id
            LEFT JOIN users u ON w.user_id = u.user_id
            ORDER BY n.created_at DESC
        `;

        return response.status(200).json({ novels });

    } catch (error) {
        console.error('Fetch novels error:', error);
        return response.status(500).json({
            error: 'Failed to fetch novels.',
            details: error.message
        });
    }
}
