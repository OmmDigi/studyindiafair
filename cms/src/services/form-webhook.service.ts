import { api } from '@/lib/api'
import type { Webhook, WebhookForm, WebhookMethod, WebhookSetup, WebhookTestResult } from '@/types/form-webhook'

export type WebhookRequestPayload = {
  method: WebhookMethod
  url: string
  headers: Record<string, string>
  body: unknown
}

export type WebhookPayload = WebhookRequestPayload & { name: string; is_enabled: boolean }

export const formWebhookService = {
  list: () => api.get<WebhookForm[]>('/form-webhooks').then((r) => r.data),
  get: (formId: number) => api.get<WebhookSetup>(`/form-webhooks/${formId}`).then((r) => r.data),
  create: (formId: number, data: WebhookPayload) => api.post<Webhook>(`/form-webhooks/${formId}`, data).then((r) => r.data),
  update: (formId: number, id: number, data: WebhookPayload) =>
    api.put<Webhook>(`/form-webhooks/${formId}/${id}`, data).then((r) => r.data),
  remove: (formId: number, id: number) => api.delete(`/form-webhooks/${formId}/${id}`),
  test: (formId: number, data: WebhookRequestPayload) =>
    api.post<WebhookTestResult>(`/form-webhooks/${formId}/test`, data).then((r) => r.data),
  resend: (enquiryId: number, webhookId?: number) =>
    api
      .post<{ queued: number }>(`/form-webhooks/enquiries/${enquiryId}/resend`, { webhook_id: webhookId })
      .then((r) => r.data),
}
