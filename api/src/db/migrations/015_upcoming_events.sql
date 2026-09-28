CREATE TABLE IF NOT EXISTS upcoming_events (
  id SERIAL PRIMARY KEY,
  page_id INTEGER NOT NULL UNIQUE REFERENCES pages(id) ON DELETE RESTRICT,
  images JSONB NOT NULL DEFAULT '[]'::jsonb,
  schedules JSONB NOT NULL DEFAULT '[]'::jsonb,
  position INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  updated_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_upcoming_events_active_position ON upcoming_events(is_active, position, id);
