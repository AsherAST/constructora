export const company = {
  name: "Constructora Horizonte",
  slogan: "Construimos el futuro de tu proyecto",
  description:
    "Más de 20 años de experiencia en obra civil, construcción residencial y proyectos industriales.",
  ctaText: "Solicita tu presupuesto",
  navLinks: [
    { label: "Inicio", href: "/" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Proyectos", href: "/proyectos" },
    { label: "Clientes", href: "/clientes" },
    { label: "Contacto", href: "/contacto" },
  ],
  contact: {
    phone: "+52 55 1234 5678",
    email: "contacto@constructorahorizonte.mx",
    address: "Av. Reforma 123, Ciudad de México",
  },
  social: [
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
} as const;
