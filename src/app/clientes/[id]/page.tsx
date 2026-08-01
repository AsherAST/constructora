import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ClientDetail from "@/components/ClientDetail";
import { clients } from "@/data/clients";

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return clients.map((client) => ({ id: client.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const client = clients.find((c) => c.id === id);
  return { title: client?.name ?? "Cliente no encontrado" };
}

export default async function ClientePage({ params }: Props) {
  const { id } = await params;
  const client = clients.find((c) => c.id === id);

  if (!client) {
    notFound();
  }

  return <ClientDetail client={client} />;
}
