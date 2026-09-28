INSERT INTO pages (name, slug) VALUES ('Scholarship', 'scholarship') ON CONFLICT (slug) DO NOTHING;

CREATE TABLE IF NOT EXISTS scholarship (
  id SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  page_id INTEGER NOT NULL UNIQUE REFERENCES pages(id) ON DELETE RESTRICT,
  about_heading TEXT,
  about_description JSONB,
  about_image_path TEXT,
  eligibility_heading TEXT,
  eligibility_description JSONB,
  eligibility_points JSONB NOT NULL DEFAULT '[]',
  eligibility_notice JSONB,
  apply_heading TEXT,
  apply_description JSONB,
  apply_points JSONB NOT NULL DEFAULT '[]',
  updated_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO scholarship (id, page_id) SELECT 1, id FROM pages WHERE slug = 'scholarship' ON CONFLICT (id) DO NOTHING;
