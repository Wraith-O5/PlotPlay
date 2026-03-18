const { sql } = require('../../_db.js');

module.exports = async function handler(request, response) {
    if (request.method !== 'GET') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }

    const { id } = request.query;

    if (!id) {
        return response.status(400).json({ error: 'Chapter ID is required.' });
    }

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
            return response.status(404).json({ error: 'Chapter not found.' });
        }

        return response.status(200).json({ chapter: chapters[0] });

    } catch (error) {
        console.error('Fetch chapter error:', error);
        return response.status(500).json({
            error: 'Failed to fetch chapter content.',
            details: error.message
        });
    }
};
