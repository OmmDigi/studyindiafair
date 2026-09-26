CREATE TABLE IF NOT EXISTS forms (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  form_id TEXT NOT NULL UNIQUE,
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  updated_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS form_enquiries (
  id SERIAL PRIMARY KEY,
  form_id TEXT NOT NULL REFERENCES forms(form_id) ON UPDATE CASCADE ON DELETE RESTRICT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  details JSONB NOT NULL DEFAULT '{}'::jsonb,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS form_enquiries_form_created_idx ON form_enquiries (form_id, created_at DESC);
