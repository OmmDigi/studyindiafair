"use client";

import { useEffect } from "react";
import { usePageSeo } from "@/hooks/api/useSeo";

interface ClientSeoProps {
  slug: any;
}

/**
 * ClientSeo ensures that client-rendered pages dynamically update document.title,
 * meta description, canonical, and schema tags when data changes.
 */
export function ClientSeo({ slug }: ClientSeoProps) {
  const { data: seo } = usePageSeo(slug);

  useEffect(() => {
    if (!seo) return;

    if (seo.meta_title) {
      document.title = seo.meta_title;
    }

    if (seo.meta_description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", seo.meta_description);
    }

    if (seo.canonical_url) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", seo.canonical_url);
    }

    if (seo.schema_script) {
      const scriptId = `seo-schema-${slug}`;
      let scriptElem = document.getElementById(scriptId);
      if (!scriptElem) {
        scriptElem = document.createElement("div");
        scriptElem.id = scriptId;
        scriptElem.style.display = "none";
        document.body.appendChild(scriptElem);
      }
      scriptElem.innerHTML = seo.schema_script;
    }
  }, [seo, slug]);

  return null;
}
