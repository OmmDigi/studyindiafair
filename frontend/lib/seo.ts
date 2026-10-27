import { Metadata } from "next";
import { get } from "@/utils/fetcher";

export interface SeoData {
  page_name?: string;
  page_slug?: string;
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  og_image_path?: string | null;
  schema_script?: string | null;
  schema_position?: "head" | "body" | string | null;
}

/**
 * Fetch dynamic SEO configuration for a given page slug from the backend API.
 * Uses Next.js caching with 60-second revalidation (ISR).
 */
export async function getPageSeo(slug: string): Promise<SeoData | null> {
  try {
    const data = await get<SeoData>(`/seo/public/${slug}`, {
      next: { revalidate: 60 },
    });
    return data || null;
  } catch (error) {
    console.error(`[getPageSeo] Failed to fetch SEO for slug "${slug}":`, error);
    return null;
  }
}

/**
 * Helper to build Next.js Metadata dynamically from page slug with optional fallback defaults.
 */
export async function generateDynamicMetadata(
  slug: string,
  fallback?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
  }
): Promise<Metadata> {
  const seo = await getPageSeo(slug);

  const title = seo?.meta_title || fallback?.title || "Study in India Fair";
  const description =
    seo?.meta_description ||
    fallback?.description ||
    "Study in India Fair - Connecting students with premier Indian educational institutions.";

  const uploadBase = process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || "";
  const ogImage = seo?.og_image_path
    ? (seo.og_image_path.startsWith("http")
        ? seo.og_image_path
        : `${uploadBase}${seo.og_image_path}`)
    : fallback?.image || "/images/common/Study-in-India-fair-logo.png";

  const canonical =
    seo?.canonical_url || fallback?.url || `https://studyindiafair.com/${slug === "home" ? "" : slug}`;

  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: seo?.og_title || title,
      description: seo?.og_description || description,
      url: canonical,
      siteName: "Study in India Fair",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: seo?.og_title || title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.og_title || title,
      description: seo?.og_description || description,
      images: [ogImage],
    },
  };
}
