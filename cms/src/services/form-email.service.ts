import type { OutputData } from '@editorjs/editorjs'
import { api } from '@/lib/api'
import type { EmailSetup, EmailTemplate, EmailTemplateForm, TemplateType } from '@/types/form-email'

export type TemplatePayload = {
  is_enabled: boolean
  to_emails: string[]
  recipient_field: string | null
  cc: string[]
  bcc: string[]
  reply_to: string | null
  subject: string
  body: OutputData | null
}

export const formEmailService = {
  list: () => api.get<EmailTemplateForm[]>('/form-email-templates').then((r) => r.data),
  get: (formId: number) => api.get<EmailSetup>(`/form-email-templates/${formId}`).then((r) => r.data),
  save: (formId: number, type: TemplateType, data: TemplatePayload) =>
    api.put<EmailTemplate>(`/form-email-templates/${formId}/${type}`, data).then((r) => r.data),
  test: (formId: number, type: TemplateType, data: TemplatePayload & { test_to: string }) =>
    api.post(`/form-email-templates/${formId}/${type}/test`, data).then((r) => r.data),
}
