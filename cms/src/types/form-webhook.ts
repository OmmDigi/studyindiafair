export const WEBHOOK_METHODS = ['GET', 'POST', 'PUT', 'PATCH'] as const
export type WebhookMethod = (typeof WEBHOOK_METHODS)[number]

export type Webhook = {
  id: number
  form_id: number
  name: string
  is_enabled: boolean
  method: WebhookMethod
  url: string
  headers: Record<string, string>
  body: unknown
  updated_at: string
}

export type WebhookForm = {
  id: number
  name: string
  form_id: string
  enquiry_count: number
  webhook_count: number
  enabled_count: number
}

export type WebhookSetup = {
  form: { id: number; name: string; form_id: string; enquiry_count: number }
  variables: string[]
  sample: Record<string, string>
  webhooks: Webhook[]
}

export type WebhookTestResult = {
  request: { method: WebhookMethod; url: string; headers: Record<string, string>; body: string | null }
  result: { ok: boolean; status_code: number | null; response: string | null; error: string | null; duration_ms: number }
}

export type EnquiryWebhookLog = {
  id: number
  webhook_id: number | null
  webhook_name: string
  method: WebhookMethod
  url: string
  request_body: string | null
  status: 'pending' | 'success' | 'failed'
  status_code: number | null
  attempts: number
  response: string | null
  error: string | null
  created_at: string
  updated_at: string
}
