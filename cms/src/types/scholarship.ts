import type { OutputData } from '@editorjs/editorjs'

export type ScholarshipPosition = 'left' | 'right'
export type EligibilityPoint = { heading: string; description: OutputData }
export type ApplyPoint = { heading: string; description: OutputData; icon_path: string; position: ScholarshipPosition }

export type Scholarship = {
  page_id: number
  page_name: string
  page_slug: string
  about_heading: string | null
  about_description: OutputData | null
  about_image_path: string | null
  eligibility_heading: string | null
  eligibility_description: OutputData | null
  eligibility_points: EligibilityPoint[]
  eligibility_notice: OutputData | null
  apply_heading: string | null
  apply_description: OutputData | null
  apply_points: ApplyPoint[]
  updated_at: string
}

export type ScholarshipPayload = {
  about_heading: string
  about_description: OutputData
  about_image_path: string
  eligibility_heading: string
  eligibility_description: OutputData
  eligibility_points: EligibilityPoint[]
  eligibility_notice: OutputData | null
  apply_heading: string
  apply_description: OutputData
  apply_points: ApplyPoint[]
}
