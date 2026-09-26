CREATE TABLE IF NOT EXISTS form_email_templates (
  id SERIAL PRIMARY KEY,
  form_id INTEGER NOT NULL REFERENCES forms(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('admin', 'student')),
  is_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  to_emails TEXT[] NOT NULL DEFAULT '{}',
  recipient_field TEXT,
  cc TEXT[] NOT NULL DEFAULT '{}',
  bcc TEXT[] NOT NULL DEFAULT '{}',
  reply_to TEXT,
  subject TEXT NOT NULL DEFAULT '',
  body JSONB,
  body_html TEXT NOT NULL DEFAULT '',
  updated_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (form_id, type)
);

CREATE TABLE IF NOT EXISTS form_enquiry_emails (
  id SERIAL PRIMARY KEY,
  enquiry_id INTEGER NOT NULL REFERENCES form_enquiries(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('admin', 'student')),
  recipients TEXT NOT NULL DEFAULT '',
  subject TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL CHECK (status IN ('sent', 'failed', 'skipped')),
  error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS form_enquiry_emails_enquiry_idx ON form_enquiry_emails (enquiry_id);
