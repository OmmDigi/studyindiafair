ALTER TABLE gallery_items
  ADD COLUMN IF NOT EXISTS media_type TEXT NOT NULL DEFAULT 'image',
  ADD COLUMN IF NOT EXISTS youtube_id TEXT,
  ALTER COLUMN image_path DROP NOT NULL;

ALTER TABLE gallery_items
  ADD CONSTRAINT gallery_items_media_check CHECK (
    (media_type = 'image' AND image_path IS NOT NULL AND youtube_id IS NULL)
    OR (media_type = 'youtube' AND youtube_id IS NOT NULL AND image_path IS NULL)
  );
