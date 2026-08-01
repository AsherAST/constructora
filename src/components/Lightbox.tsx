"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { GalleryItem } from "@/data/gallery";

interface LightboxProps {
  item: GalleryItem;
  onClose: () => void;
}

export default function Lightbox({ item, onClose }: LightboxProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Vista ampliada de ${item.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-full max-w-4xl"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          sizes="(max-width: 1024px) 100vw, 64rem"
          className="max-h-[80vh] w-full rounded-xl object-contain"
        />
        <div className="mt-4 flex items-center justify-between gap-4 text-white">
          <div>
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-sm text-amber-400">{item.category}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/30 px-4 py-2 text-sm transition-colors hover:bg-white/10"
          >
            Cerrar (ESC)
          </button>
        </div>
      </div>
    </div>
  );
}
