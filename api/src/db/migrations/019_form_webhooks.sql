CREATE TABLE IF NOT EXISTS form_webhooks (
  id SERIAL PRIMARY KEY,
  form_id INTEGER NOT NULL REFERENCES forms(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  is_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  method TEXT NOT NULL DEFAULT 'POST' CHECK (method IN ('GET', 'POST', 'PUT', 'PATCH')),
  url TEXT NOT NULL,
  headers JSON NOT NULL DEFAULT '{}',
  body JSON,
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  updated_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS form_webhooks_form_idx ON form_webhooks (form_id);

CREATE TABLE IF NOT EXISTS form_enquiry_webhooks (
  id SERIAL PRIMARY KEY,
  enquiry_id INTEGER NOT NULL REFERENCES form_enquiries(id) ON DELETE CASCADE,
  webhook_id INTEGER REFERENCES form_webhooks(id) ON DELETE SET NULL,
  webhook_name TEXT NOT NULL,
  method TEXT NOT NULL,
  url TEXT NOT NULL,
  request_body TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'success', 'failed')),
  status_code INTEGER,
  attempts INTEGER NOT NULL DEFAULT 0,
  response TEXT,
  error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS form_enquiry_webhooks_enquiry_idx ON form_enquiry_webhooks (enquiry_id);
