-- Database Schema for Novel & Comic Web

-- 1. User Tables
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS readers (
    reader_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS writers (
    writer_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE
);

-- 2. Content Tables
CREATE TABLE IF NOT EXISTS genres (
    genre_id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS novels (
    novel_id SERIAL PRIMARY KEY,
    writer_id INTEGER REFERENCES writers(writer_id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    review_score NUMERIC(3, 2) DEFAULT 0,
    genre_id INTEGER REFERENCES genres(genre_id) ON DELETE SET NULL,
    cover_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS chapters (
    chapter_id SERIAL PRIMARY KEY,
    novel_id INTEGER REFERENCES novels(novel_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    chapter_num INTEGER NOT NULL,
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(novel_id, chapter_num)
);

-- 3. Interaction Tables
CREATE TABLE IF NOT EXISTS reviews (
    review_id SERIAL PRIMARY KEY,
    reader_id INTEGER REFERENCES readers(reader_id) ON DELETE CASCADE,
    novel_id INTEGER REFERENCES novels(novel_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reading_history (
    history_id SERIAL PRIMARY KEY,
    reader_id INTEGER REFERENCES readers(reader_id) ON DELETE CASCADE,
    novel_id INTEGER REFERENCES novels(novel_id) ON DELETE CASCADE,
    last_chapter_id INTEGER REFERENCES chapters(chapter_id),
    read_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(reader_id, novel_id)
);

-- 4. Financial Tables
CREATE TABLE IF NOT EXISTS transaction_history (
    transaction_id SERIAL PRIMARY KEY,
    reader_id INTEGER REFERENCES readers(reader_id),
    novel_id INTEGER REFERENCES novels(novel_id),
    amount NUMERIC(10, 2) NOT NULL,
    transaction_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS income_history (
    income_id SERIAL PRIMARY KEY,
    writer_id INTEGER REFERENCES writers(writer_id),
    amount NUMERIC(10, 2) NOT NULL,
    source_novel_id INTEGER REFERENCES novels(novel_id),
    income_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Writer Workspace (Storyboard)
CREATE TABLE IF NOT EXISTS storyboards (
    storyboard_id SERIAL PRIMARY KEY,
    writer_id INTEGER REFERENCES writers(writer_id) ON DELETE CASCADE,
    novel_id INTEGER REFERENCES novels(novel_id) ON DELETE CASCADE,
    work_status VARCHAR(50) DEFAULT 'Draft', -- Draft, In Progress, Published
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS saved_works (
    work_id SERIAL PRIMARY KEY,
    storyboard_id INTEGER REFERENCES storyboards(storyboard_id) ON DELETE CASCADE,
    content TEXT,
    last_saved TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS assets (
    asset_id SERIAL PRIMARY KEY,
    storyboard_id INTEGER REFERENCES storyboards(storyboard_id) ON DELETE CASCADE,
    asset_name VARCHAR(255) NOT NULL,
    asset_type VARCHAR(50), -- Image, Sound, Animation
    asset_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
