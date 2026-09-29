import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateSEO } from "@/components/SEO";
import { Providers } from "@/components/Providers";

// Removed Geist since we are using Google Fonts from CDN

import { get } from "@/utils/fetcher";

export async function generateMetadata(): Promise<Metadata> {
  let favicon = "";
  try {
    const data = await get<any>("/site-settings/public", {
      next: { revalidate: 3600 },
    });
    if (data?.favicon_path) {
      favicon = `${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ""}${data.favicon_path}`;
    }
  } catch (error) {
    console.error("Failed to fetch site settings for metadata", error);
  }

  return generateSEO({
    title: "Study in India Fair",
    description: "Study in India Fair - Upcoming Fair in Bahrain",
    icons: favicon ? { icon: favicon } : undefined,
  });
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
