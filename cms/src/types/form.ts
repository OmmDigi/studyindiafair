export type Form = {
  id: number
  name: string
  form_id: string
  enquiry_count: number
  created_at: string
  updated_at: string
}

export type Enquiry = {
  id: number
  name: string
  phone: string
  details: Record<string, unknown>
  created_at: string
}
