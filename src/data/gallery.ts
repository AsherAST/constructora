export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
  width: number;
  height: number;
};

export const galleryItems: GalleryItem[] = [
  {
    id: "residencial",
    src: "/proyectos/residencial.svg",
    alt: "Fachada de casa residencial de dos plantas",
    title: "Casa residencial Los Robles",
    category: "Residencial",
    width: 800,
    height: 600,
  },
  {
    id: "industrial",
    src: "/proyectos/industrial.svg",
    alt: "Nave industrial con estructura metálica",
    title: "Nave industrial Andrade Norte",
    category: "Industrial",
    width: 800,
    height: 600,
  },
  {
    id: "oficinas",
    src: "/proyectos/oficinas.svg",
    alt: "Edificio de oficinas de tres niveles",
    title: "Edificio corporativo Torre Norte",
    category: "Comercial",
    width: 800,
    height: 600,
  },
  {
    id: "hotel",
    src: "/proyectos/hotel.svg",
    alt: "Hotel boutique con fachada de ladrillo",
    title: "Hotel Boutique Mar Azul",
    category: "Hotelero",
    width: 800,
    height: 600,
  },
  {
    id: "vivienda",
    src: "/proyectos/vivienda.svg",
    alt: "Conjunto de viviendas unifamiliares",
    title: "Fraccionamiento Los Pinos",
    category: "Residencial",
    width: 800,
    height: 600,
  },
  {
    id: "puente",
    src: "/proyectos/puente.svg",
    alt: "Puente vehicular sobre un río",
    title: "Puente vehicular Santa Fe",
    category: "Obra civil",
    width: 800,
    height: 600,
  },
] as const;
