import { MetadataRoute } from 'next';
import { get } from '@/utils/fetcher';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://studyindiafair.com';

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/why-india`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/visitors-registration`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/scholarship`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/exhibitors`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/career-guidance`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/digital-addiction`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-conditions`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Dynamic routes for upcoming expo events
  let dynamicEventRoutes: MetadataRoute.Sitemap = [];
  try {
    const events = await get<any[]>('/upcoming-events/public', {
      next: { revalidate: 3600 },
    });

    if (Array.isArray(events)) {
      dynamicEventRoutes = events
        .filter((event) => Boolean(event?.slug))
        .map((event) => ({
          url: `${baseUrl}/upcoming_expo/${event.slug}`,
          lastModified: event.updated_at ? new Date(event.updated_at) : new Date(),
          changeFrequency: 'daily' as const,
          priority: 0.9,
        }));
    }
  } catch (error) {
    console.error('Failed to fetch events for sitemap generation:', error);
  }

  return [...staticRoutes, ...dynamicEventRoutes];
}
