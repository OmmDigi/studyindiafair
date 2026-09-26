ALTER TABLE upcoming_events ADD COLUMN IF NOT EXISTS university_logos JSONB NOT NULL DEFAULT '[]'::jsonb;
