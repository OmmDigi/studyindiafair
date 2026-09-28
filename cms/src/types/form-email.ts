import type { OutputData } from '@editorjs/editorjs'

export const TEMPLATE_TYPES = ['admin', 'student'] as const
export type TemplateType = (typeof TEMPLATE_TYPES)[number]

export const TEMPLATE_TYPE_LABELS: Record<TemplateType, string> = {
  admin: 'Admin Email',
  student: 'Student Email',
}

export type EmailTemplate = {
  id: number
  form_id: number
  type: TemplateType
  is_enabled: boolean
  to_emails: string[]
  recipient_field: string | null
  cc: string[]
  bcc: string[]
  reply_to: string | null
  subject: string
  body: OutputData | null
  body_html: string
  updated_at: string
}

export type TemplateStatus = { is_enabled: boolean; updated_at: string } | null

export type EmailTemplateForm = {
  id: number
  name: string
  form_id: string
  enquiry_count: number
  admin: TemplateStatus
  student: TemplateStatus
}

export type EmailSetup = {
  form: { id: number; name: string; form_id: string; enquiry_count: number }
  variables: string[]
  sample: Record<string, string>
  templates: Record<TemplateType, EmailTemplate | null>
}

export type EnquiryEmailLog = {
  id: number
  type: TemplateType
  recipients: string
  subject: string
  status: 'sent' | 'failed' | 'skipped'
  error: string | null
  created_at: string
}
