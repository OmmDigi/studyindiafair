"use client";

import React, { useState, useEffect } from "react";
import { useGalleryCategories, useGallery } from "@/hooks/api/useGallery";
import CustomImage from "@/components/CustomImage"; // Assuming there's a custom image component based on open files
import GalleryLightbox, {
  LightboxItem,
} from "@/components/gallery/GalleryLightbox";
import { Play } from "lucide-react";

const getImageUrl = (item: any) =>
  item.image_path
    ? `${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || ""}${item.image_path}`
    : "/images/placeholder.jpg";

const isVideo = (item: any) => item.media_type === "video" && item.youtube_id;

const getCaption = (item: any) =>
  item.alt_text && item.alt_text !== "null" ? item.alt_text : undefined;

export default function GalleryPage() {
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGalleryCategories();

  // Extract categories array safely
  const categories = Array.isArray(categoriesData)
    ? categoriesData
    : categoriesData?.data || [];

  const [activeCategory, setActiveCategory] = useState<string>("");

  // Set the first category as active by default once loaded
  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].slug || categories[0].id?.toString());
    }
  }, [categories, activeCategory]);

  const { data: galleryData, isLoading: isGalleryLoading } = useGallery({
    category: activeCategory,
  });

  // Extract gallery array safely
  const galleryItems = Array.isArray(galleryData)
    ? galleryData
    : galleryData?.data || [];

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxItems: LightboxItem[] = galleryItems.map((item: any) =>
    isVideo(item)
      ? {
          type: "video",
          src: item.youtube_id,
          thumb: `https://img.youtube.com/vi/${item.youtube_id}/hqdefault.jpg`,
          caption: getCaption(item),
        }
      : {
          type: "image",
          src: getImageUrl(item),
          thumb: getImageUrl(item),
          caption: getCaption(item),
        }
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <div
        className="relative w-full py-3 md:py-6 bg-secondary flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=2000')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-secondary/80 backdrop-blur-sm"></div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-widest drop-shadow-md">
            Our Gallery
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            A glimpse into our past education fairs, connecting students with
            their dream universities across the globe.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl mt-12">
        {/* Categories Tabs */}
        {isCategoriesLoading ? (
          <div className="flex justify-center gap-4 mb-12">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-32 h-12 bg-gray-200 animate-pulse rounded-full"
              ></div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
            {categories.map((category: any) => {
              const catId = category.slug || category.id?.toString();
              const isActive = activeCategory === catId;
              return (
                <button
                  key={category.id || catId}
                  onClick={() => {
                    setActiveCategory(catId);
                    setLightboxIndex(null);
                  }}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
                    isActive
                      ? "bg-orange-500 text-white shadow-orange-500/30"
                      : "bg-white text-gray-700 hover:bg-gray-100 hover:text-secondary border border-gray-200"
                  }`}
                >
                  {category.name || category.title}
                </button>
              );
            })}
          </div>
        )}

        {/* Gallery Grid */}
        {isGalleryLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="aspect-square bg-gray-200 animate-pulse rounded-xl shadow-sm"
              ></div>
            ))}
          </div>
        ) : galleryItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryItems.map((item: any, idx: number) => (
              <button
                type="button"
                key={item.id || idx}
                onClick={() => setLightboxIndex(idx)}
                className="group relative aspect-square overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 bg-white cursor-pointer text-left"
              >
                <img
                  src={lightboxItems[idx].thumb}
                  alt={
                    item.alt_text || item.category_name || "Gallery Image"
                  }
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />

                {/* Play icon for videos */}
                {isVideo(item) && (
                  <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="w-16 h-16 rounded-full bg-orange-500/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-7 h-7 text-white fill-white ml-1" />
                    </span>
                  </span>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none">
                  {getCaption(item) && (
                    <h3 className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {getCaption(item)}
                    </h3>
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <svg
              className="w-16 h-16 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <h3 className="text-xl font-bold text-gray-600 mb-2">
              No Images Found
            </h3>
            <p className="text-gray-500">
              There are currently no images in this category.
            </p>
          </div>
        )}
      </div>

      {lightboxIndex !== null && lightboxItems.length > 0 && (
        <GalleryLightbox
          items={lightboxItems}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
        />
      )}
    </div>
  );
}
