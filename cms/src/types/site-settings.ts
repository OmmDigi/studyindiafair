import type { OutputData } from '@editorjs/editorjs'

export type SitePhone = { label: string; number: string; is_primary: boolean; is_whatsapp: boolean }
export type SiteEmail = { label: string; email: string; is_primary: boolean }
export type SiteAddress = { label: string; address: string; map_link: string | null }
export type SiteSocialLink = { name: string; url: string; icon_path: string | null }

export type SiteSettings = {
  phones: SitePhone[]
  emails: SiteEmail[]
  addresses: SiteAddress[]
  social_links: SiteSocialLink[]
  logo_path: string | null
  favicon_path: string | null
  notice: OutputData | null
  notice_active: boolean
  updated_at: string
}
