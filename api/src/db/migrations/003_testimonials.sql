CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('text', 'text_image', 'video')),
  name TEXT NOT NULL,
  designation TEXT,
  content TEXT,
  image_path TEXT,
  youtube_id TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  updated_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_testimonials_active_order ON testimonials(is_active, sort_order, id);
