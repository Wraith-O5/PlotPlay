-- Mock Data Seed Script

-- 1. Insert Genres
INSERT INTO genres (name) VALUES 
('Fantasy'), ('Sci-Fi'), ('Romance'), ('Horror'), ('Slice of Life')
ON CONFLICT (name) DO NOTHING;

-- 2. Insert Writers
INSERT INTO writers (username, email, password_hash) VALUES
('cosmic_author', 'author@example.com', 'hashed_pass_1'),
('story_weaver', 'weaver@example.com', 'hashed_pass_2');

-- 3. Insert Readers
INSERT INTO readers (username, email, password_hash) VALUES
('bookworm99', 'reader@example.com', 'hashed_pass_3'),
('novel_lover', 'lover@example.com', 'hashed_pass_4');

-- 4. Insert Novels
INSERT INTO novels (writer_id, name, description, genre_id, review_score) VALUES
(1, 'The Neon Void', 'A cyberpunk journey into the heart of a dying star.', 2, 4.8),
(2, 'Whispers in the Dark', 'A collection of haunting tales from the countryside.', 4, 4.5);

-- 5. Insert Chapters
INSERT INTO chapters (novel_id, title, chapter_num, content) VALUES
(1, 'Zero Gravity', 1, 'The ship hummed with a low resonance...'),
(1, 'Cyber Pulse', 2, 'In the alleys of Neo-Tokyo...'),
(2, 'The Old Oak', 1, 'The wind howled through the branches...');

-- 6. Insert Storyboards
INSERT INTO storyboards (writer_id, novel_name, work_status) VALUES
(1, 'Gravity Falls', 'In Progress'),
(2, 'Haunted Archive', 'Draft');

-- 7. Insert Assets
INSERT INTO assets (storyboard_id, asset_name, asset_type, asset_url) VALUES
(1, 'Neon City Sky', 'Image', '/assets/images/neon_sky.png'),
(1, 'Spooky Piano', 'Sound', '/assets/audio/horror_piano.mp3');
