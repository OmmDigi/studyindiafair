CREATE TABLE IF NOT EXISTS site_settings (
  id SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  phones JSONB NOT NULL DEFAULT '[]',
  emails JSONB NOT NULL DEFAULT '[]',
  addresses JSONB NOT NULL DEFAULT '[]',
  social_links JSONB NOT NULL DEFAULT '[]',
  logo_path TEXT,
  favicon_path TEXT,
  notice JSONB,
  notice_active BOOLEAN NOT NULL DEFAULT FALSE,
  updated_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
