import type { OutputData } from '@editorjs/editorjs'

export type TeamMember = {
  id: number
  name: string
  designation: string
  details: OutputData | null
  image_path: string | null
  position: number
  is_active: boolean
  created_at: string
  updated_at: string
}
