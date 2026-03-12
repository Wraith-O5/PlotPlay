-- Mock Data Seed Script

-- 1. Insert Users first 
INSERT INTO users (username, email, password_hash) VALUES
('cosmic_author', 'author@example.com', '$2a$10$wN1q8vOxt5QZJbS2w/Zq8.R5Y33V2d1XnJ/xX3L3R1a2b3c4d5e6f'),
('story_weaver', 'weaver@example.com', '$2a$10$wN1q8vOxt5QZJbS2w/Zq8.R5Y33V2d1XnJ/xX3L3R1a2b3c4d5e6f'),
('bookworm99', 'reader@example.com', '$2a$10$wN1q8vOxt5QZJbS2w/Zq8.R5Y33V2d1XnJ/xX3L3R1a2b3c4d5e6f'),
('novel_lover', 'lover@example.com', '$2a$10$wN1q8vOxt5QZJbS2w/Zq8.R5Y33V2d1XnJ/xX3L3R1a2b3c4d5e6f')
ON CONFLICT (username) DO NOTHING;

-- 2. Insert Genres
INSERT INTO genres (name) VALUES 
('Fantasy'), ('Sci-Fi'), ('Romance'), ('Horror'), ('Slice of Life')
ON CONFLICT (name) DO NOTHING;

-- 3. Insert Writers (using user_id 1 and 2)
INSERT INTO writers (user_id) VALUES (1), (2);

-- 4. Insert Readers (using user_id 3 and 4)
INSERT INTO readers (user_id) VALUES (3), (4);

-- 5. Insert Novels
INSERT INTO novels (writer_id, name, description, genre_id, review_score) VALUES
(1, 'The Neon Void', 'A cyberpunk journey into the heart of a dying star.', 2, 4.8),
(2, 'Whispers in the Dark', 'A collection of haunting tales from the countryside.', 4, 4.5);

-- 6. Insert Chapters with Merged Chapter 0
INSERT INTO chapters (novel_id, title, chapter_num, content) VALUES
(1, 'Chapter 0: The Beginning', 0, 
'## Chapter 0: The Beginning


#### *Sigh*

A man in a black robe was sitting by himself in the seamless night under the stars.

‘The world went to shit in just five years.’

All he saw in those five years was annihilation, chaos, and corpses a lot of it in fact. But, some of those corpses refused to die alone.

`What a twisted world it is or is it already twisted in the first place?` He chuckled to himself while reminiscing.

"Young man! What are you doing by yourself?" The old man said. He reminds you of a typical grandpa, but isn`t it strange?

Why would there be any old people left when the whole world was on fire?

"Exploration" The man monotonously said without looking at the old man.

"Exploration of your mind? How philosophical!" The old man said while grinning slightly. Then, the two of them fell silent.

Next, came the harmony of the night under the starry sky.
===TYPING_START===
*Stars by the night sky*,

*Wind blow by the plain*,

*Song bring by the animals*,

*Harmony being born by nature*.

*It is the harmony of the night under the starry sky*,

*It is the unforgettable beauty of the world we live in*.

*It can bring us the strength to live for another day*,

*It can also bring us back the dream we once had*.
===TYPING_END===
“It’s beautiful, isn’t it? This world.” The old man said seemingly with his own insight of the world.

The man nodded before blandly said.

"How philosophical."

The old man looked stunned for a moment before laughing out loud.

### _HAHAHAHA_

"You`re gonna make this old geezer die of laughter. I didn`t know you could make a joke." The old man said while still laughing.

The man finally took a look at the older man who was still laughing his ass off. Then, he turned his head back to look at the night sky.

`How long has it been?` The man thought as a smile slightly formed on his face.

So, how did it get here?

It all began with something that happened five years ago.

---

Name:??? (A man in a black robe)

Age:???

Appearance: At that of a man, but none of that has been confirmed only his voice was.

Abilities:???

Rank:???

---

Name:??? (The old man)

Age:!?

Appearance: At that of a typical old man.

Abilities:!?

Rank:!?
'),
(1, 'Zero Gravity', 1, 'The ship hummed with a low resonance...'),
(1, 'Cyber Pulse', 2, 'In the alleys of Neo-Tokyo...'),
(2, 'The Old Oak', 1, 'The wind howled through the branches...'),
(2, 'Chapter 0: The Beginning', 0, 
'## Chapter 0: The Beginning


#### *Sigh*

A man in a black robe was sitting by himself in the seamless night under the stars.

‘The world went to shit in just five years.’

All he saw in those five years was annihilation, chaos, and corpses a lot of it in fact. But, some of those corpses refused to die alone.

`What a twisted world it is or is it already twisted in the first place?` He chuckled to himself while reminiscing.

"Young man! What are you doing by yourself?" The old man said. He reminds you of a typical grandpa, but isn`t it strange?

Why would there be any old people left when the whole world was on fire?

"Exploration" The man monotonously said without looking at the old man.

"Exploration of your mind? How philosophical!" The old man said while grinning slightly. Then, the two of them fell silent.

Next, came the harmony of the night under the starry sky.
===TYPING_START===
*Stars by the night sky*,

*Wind blow by the plain*,

*Song bring by the animals*,

*Harmony being born by nature*.

*It is the harmony of the night under the starry sky*,

*It is the unforgettable beauty of the world we live in*.

*It can bring us the strength to live for another day*,

*It can also bring us back the dream we once had*.
===TYPING_END===
“It’s beautiful, isn’t it? This world.” The old man said seemingly with his own insight of the world.

The man nodded before blandly said.

"How philosophical."

The old man looked stunned for a moment before laughing out loud.

### _HAHAHAHA_

"You`re gonna make this old geezer die of laughter. I didn`t know you could make a joke." The old man said while still laughing.

The man finally took a look at the older man who was still laughing his ass off. Then, he turned his head back to look at the night sky.

`How long has it been?` The man thought as a smile slightly formed on his face.

So, how did it get here?

It all began with something that happened five years ago.

---

Name:??? (A man in a black robe)

Age:???

Appearance: At that of a man, but none of that has been confirmed only his voice was.

Abilities:???

Rank:???

---

Name:??? (The old man)

Age:!?

Appearance: At that of a typical old man.

Abilities:!?

Rank:!?
');

-- 7. Insert Storyboards (using novel_id instead of novel_name)
INSERT INTO storyboards (writer_id, novel_id, work_status) VALUES
(1, 1, 'In Progress'),
(2, 2, 'Draft');

-- 8. Insert Assets
INSERT INTO assets (storyboard_id, asset_name, asset_type, asset_url) VALUES
(1, 'Neon City Sky', 'Image', '/assets/images/neon_sky.png'),
(1, 'Spooky Piano', 'Sound', '/assets/audio/horror_piano.mp3');
