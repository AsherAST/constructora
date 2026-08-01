export const clients = [
  {
    id: "grupo-andrade",
    name: "Grupo Andrade",
    logoAlt: "Logo de Grupo Andrade",
    testimonial:
      "Constructora Horizonte entregó nuestra nave industrial antes de lo previsto y con una calidad impecable. Sin duda nuestro socio de confianza.",
    projects: [
      {
        name: "Nave industrial Andrade Norte",
        type: "Nave industrial",
        year: 2024,
        location: "Querétaro, Qro.",
      },
      {
        name: "Bodega de distribución Puebla",
        type: "Bodega",
        year: 2022,
        location: "Puebla, Pue.",
      },
    ],
  },
  {
    id: "hoteles-mar",
    name: "Hoteles del Mar",
    logoAlt: "Logo de Hoteles del Mar",
    testimonial:
      "La remodelación de nuestro hotel boutique quedó espectacular. Respetaron los tiempos y el presupuesto acordado.",
    projects: [
      {
        name: "Remodelación Hotel Boutique Mar Azul",
        type: "Remodelación hotelera",
        year: 2023,
        location: "Cancún, Q. Roo.",
      },
    ],
  },
  {
    id: "urbania",
    name: "Urbania Desarrollos",
    logoAlt: "Logo de Urbania Desarrollos",
    testimonial:
      "Las 120 viviendas del fraccionamiento se entregaron en tiempo y forma. Profesionalismo de principio a fin.",
    projects: [
      {
        name: "Fraccionamiento Los Pinos",
        type: "Vivienda residencial",
        year: 2021,
        location: "Toluca, Edo. Méx.",
      },
      {
        name: "Conjunto habitacional El Mirador",
        type: "Vivienda residencial",
        year: 2019,
        location: "Guadalajara, Jal.",
      },
    ],
  },
  {
    id: "agrocom",
    name: "Agrocom S.A.",
    logoAlt: "Logo de Agrocom S.A.",
    testimonial:
      "La planta de producción quedó lista a tiempo para la temporada. Equipo técnico y humano de primer nivel.",
    projects: [
      {
        name: "Planta de producción Agrocom",
        type: "Planta industrial",
        year: 2024,
        location: "Irapuato, Gto.",
      },
    ],
  },
] as const;

export type Client = (typeof clients)[number];
