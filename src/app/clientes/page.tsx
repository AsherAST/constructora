import type { Metadata } from "next";
import Clients from "@/components/Clients";

export const metadata: Metadata = { title: "Clientes" };

export default function ClientesPage() {
  return <Clients />;
}
