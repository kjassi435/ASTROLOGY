"use client";

import { useState } from "react";
import { IconPlay } from "@/components/Icons";

// Click-to-play facade: loads only a thumbnail (~15KB) instead of the full
// YouTube player (~1MB+ JS) for every video on the page.
export function YouTubeFacade({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="relative w-full" style={{ paddingBottom: "177.78%" }}>
      {play ? (
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlay(true)}
          aria-label={`Play ${title}`}
          className="absolute inset-0 w-full h-full group cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt={title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/10 transition">
            <span className="flex w-14 h-14 rounded-full bg-red-600 items-center justify-center shadow-lg group-hover:scale-110 transition">
              <IconPlay size={22} />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
