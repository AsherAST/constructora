import Image from "next/image";
import type { GalleryItem } from "@/data/gallery";

interface GalleryProps {
  items: GalleryItem[];
  onSelect?: (item: GalleryItem) => void;
}

export default function Gallery({ items, onSelect }: GalleryProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold text-white">Nuestros proyectos</h1>
      <p className="mt-4 max-w-2xl text-zinc-300">
        Una muestra de las obras que hemos entregado. Haz clic en una imagen
        para verla en grande.
      </p>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onSelect?.(item)}
              className="group block w-full overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label={`Ver ${item.title}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="p-4">
                <h2 className="font-semibold text-white">{item.title}</h2>
                <p className="mt-1 text-sm text-amber-400">{item.category}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
