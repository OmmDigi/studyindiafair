import { api } from '@/lib/api'
import type { SiteSettings } from '@/types/site-settings'

export type SiteSettingsPayload = Partial<Omit<SiteSettings, 'updated_at'>>

export const siteSettingsService = {
  get: () => api.get<SiteSettings>('/site-settings').then((r) => r.data),
  update: (data: SiteSettingsPayload) => api.put<SiteSettings>('/site-settings', data).then((r) => r.data),
}
