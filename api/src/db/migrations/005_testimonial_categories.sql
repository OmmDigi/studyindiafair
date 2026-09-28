CREATE TABLE IF NOT EXISTS testimonial_categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  updated_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_testimonial_categories_active_order ON testimonial_categories(is_active, sort_order, id);

INSERT INTO testimonial_categories (name, slug) VALUES ('General', 'general') ON CONFLICT (slug) DO NOTHING;

ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS category_id INTEGER REFERENCES testimonial_categories(id) ON DELETE RESTRICT;

UPDATE testimonials SET category_id = (SELECT id FROM testimonial_categories WHERE slug = 'general') WHERE category_id IS NULL;

ALTER TABLE testimonials ALTER COLUMN category_id SET NOT NULL;

CREATE INDEX IF NOT EXISTS idx_testimonials_category ON testimonials(category_id);
