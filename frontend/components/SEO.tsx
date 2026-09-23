import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

/**
 * Helper function to generate Next.js Metadata for App Router pages.
 * Use this function to export `metadata` from your `page.tsx` files.
 * 
 * Example usage in `page.tsx`:
 * 
 * import { generateSEO } from '@/components/SEO';
 * 
 * export const metadata = generateSEO({
 *   title: 'My Page Title',
 *   description: 'My page description'
 * });
 */
export function generateSEO({
  title,
  description,
  image = 'https://studyindiafair.com/wp-content/uploads/2025/09/Study-in-India-fair-logo.png',
  url = 'https://studyindiafair.com',
}: SEOProps): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Study in India Fair',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

// React component exported just in case, but using `generateSEO` is the recommended way in App Router.
export default function SEO() {
  return null;
}
