-- Создание таблицы пользователей
CREATE TABLE IF NOT EXISTS "user" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

-- Создание таблицы событий
CREATE TABLE IF NOT EXISTS "event" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  description VARCHAR(256) NOT NULL,
  location VARCHAR(256) NOT NULL,
  maxParticipants INT NOT NULL
);

-- Создание таблицы участников
CREATE TABLE IF NOT EXISTS "participant" (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES "user" (id) ON DELETE CASCADE,
  event_id INT REFERENCES "event" (id) ON DELETE CASCADE
);

-- Пример вставки данных в таблицу событий
INSERT INTO "event" (name, description, location, maxParticipants)
VALUES
  ('concert', 'some artist is going to the concert (we don\'t know who)', 'Middletown', 300),
  ('seminar', 'seminar about web development', 'New York', 50);

-- Пример вставки данных в таблицу пользователей
INSERT INTO "user" (name, email, password)
VALUES
  ('John Doe', 'john@example.com', 'hashedpassword'),
  ('Jane Doe', 'jane@example.com', 'hashedpassword');
  
-- Пример вставки данных в таблицу участников
INSERT INTO "participant" (user_id, event_id)
VALUES
  (1, 1), -- John Doe участвует в событии с id 1
  (2, 2); -- Jane Doe участвует в событии с id 2
