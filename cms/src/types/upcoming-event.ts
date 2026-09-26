export type EventImage = {
  path: string
  alt_text: string | null
}

export type EventLogo = {
  path: string
  alt_text: string | null
  link: string | null
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
  university_logos: EventLogo[]
  position: number
  is_active: boolean
  created_at: string
  updated_at: string
}
