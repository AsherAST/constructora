"use client";

import { useState } from "react";
import Gallery from "@/components/Gallery";
import Lightbox from "@/components/Lightbox";
import { galleryItems, type GalleryItem } from "@/data/gallery";

export default function ProyectosGallery() {
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  return (
    <>
      <Gallery items={galleryItems} onSelect={setSelected} />
      {selected && (
        <Lightbox item={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
