import React from "react";
import { getPageSeo } from "@/lib/seo";

interface SeoSchemaProps {
  slug: string;
}

/**
 * Server component that injects raw JSON-LD or schema scripts from the dynamic SEO API.
 */
export async function SeoSchema({ slug }: SeoSchemaProps) {
  const seo = await getPageSeo(slug);

  if (!seo?.schema_script) {
    return null;
  }

  const rawScript = seo.schema_script.trim();

  // If the backend already returns <script ...> tags
  if (rawScript.startsWith("<script")) {
    return (
      <div
        className="seo-schema-script"
        style={{ display: "none" }}
        dangerouslySetInnerHTML={{ __html: rawScript }}
      />
    );
  }

  // If the backend returns raw JSON
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: rawScript }}
    />
  );
}
