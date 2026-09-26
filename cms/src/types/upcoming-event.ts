export type EventImage = {
  path: string
  alt_text: string | null
}

export type EventSchedule = {
  location: string
  date: string
}

export type UpcomingEvent = {
  id: number
  page_id: number
  name: string
  slug: string
  images: EventImage[]
  schedules: EventSchedule[]
  position: number
  is_active: boolean
  created_at: string
  updated_at: string
}
