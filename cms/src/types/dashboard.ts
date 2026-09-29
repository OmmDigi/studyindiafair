export type EnquiryTotals = {
  all_time: number
  today: number
  last_7_days: number
  last_30_days: number
  in_range: number
}

export type FormEnquiryCount = {
  id: number
  name: string
  form_id: string
  count: number
}

export type RecentEnquiry = {
  id: number
  name: string
  phone: string
  created_at: string
  form: { id: number; name: string; form_id: string }
}

export type EnquiryStats = {
  totals: EnquiryTotals
  by_form: FormEnquiryCount[]
  recent: RecentEnquiry[]
}
