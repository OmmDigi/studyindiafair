ALTER TABLE upcoming_events ADD COLUMN IF NOT EXISTS banner_images JSONB NOT NULL DEFAULT '[]'::jsonb;
