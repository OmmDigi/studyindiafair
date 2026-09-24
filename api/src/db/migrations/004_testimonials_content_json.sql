ALTER TABLE testimonials
  ALTER COLUMN content TYPE JSONB
  USING CASE
    WHEN content IS NULL OR btrim(content) = '' THEN NULL
    ELSE jsonb_build_object(
      'time', (extract(epoch FROM NOW()) * 1000)::bigint,
      'blocks', jsonb_build_array(
        jsonb_build_object('type', 'paragraph', 'data', jsonb_build_object('text', content))
      ),
      'version', '2.31.4'
    )
  END;
