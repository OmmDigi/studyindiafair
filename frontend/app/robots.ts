import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://studyindiafair.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/thank-you", "/api/", "/cms/*", "/cms"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
