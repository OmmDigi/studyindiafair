export type EventImage = {
  path: string
  alt_text: string | null
}

export type EventLogo = {
  path: string
  alt_text: string | null
  link: string | null
}

export type PastEditionCard = {
  icon_path: string
  value: string
  title: string
  description: string | null
  bg_color: string
  bg_image_path: string | null
}

export type PastEdition = {
  is_active: boolean
  heading: string
  description: unknown
  cards: PastEditionCard[]
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
  past_edition: PastEdition | null
  position: number
  is_active: boolean
  created_at: string
  updated_at: string
}
