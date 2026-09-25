export type SchemaPosition = 'head' | 'body'

export type PageSeoSummary = {
  page_id: number
  name: string
  slug: string
  meta_title: string | null
  meta_description: string | null
  canonical_url: string | null
  og_image_path: string | null
  has_schema: boolean
  updated_at: string | null
}

export type PageSeo = {
  page_id: number
  page_name: string
  page_slug: string
  meta_title: string | null
  meta_description: string | null
  canonical_url: string | null
  og_title: string | null
  og_description: string | null
  og_image_path: string | null
  schema_script: string | null
  schema_position: SchemaPosition
  updated_at: string | null
}
