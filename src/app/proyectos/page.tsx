import type { Metadata } from "next";
import ProyectosGallery from "@/components/ProyectosGallery";

export const metadata: Metadata = { title: "Proyectos" };

export default function ProyectosPage() {
  return <ProyectosGallery />;
}
