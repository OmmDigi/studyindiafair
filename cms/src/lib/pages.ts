export const PAGES = [{ slug: 'home', name: 'Home' }] as const

export type PageSlug = (typeof PAGES)[number]['slug']

export const pageName = (slug: string) => PAGES.find((p) => p.slug === slug)?.name ?? slug
