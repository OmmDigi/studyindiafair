CREATE TABLE IF NOT EXISTS faqs (
  id SERIAL PRIMARY KEY,
  page_slug TEXT NOT NULL,
  question TEXT NOT NULL,
  answer JSONB NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  updated_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_faqs_page_active_order ON faqs(page_slug, is_active, sort_order, id);
