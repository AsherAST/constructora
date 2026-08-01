import Link from "next/link";
import { clients } from "@/data/clients";

export function ClientLogo({ name, alt }: { name: string; alt: string }) {
  const initials = name
    .split(" ")
    .filter((word) => word.length > 2)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div
      role="img"
      aria-label={alt}
      className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-lg font-bold text-amber-500"
    >
      {initials}
    </div>
  );
}

export default function Clients() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold text-white">Nuestros clientes</h1>
      <p className="mt-4 max-w-2xl text-zinc-300">
        La confianza de nuestros clientes es nuestro mejor aval. Estos son
        algunos de los que han depositado su proyecto en nosotros.
      </p>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2">
        {clients.map((client) => (
          <li
            key={client.id}
            className="flex flex-col gap-4 rounded-xl border border-zinc-700 bg-zinc-900 p-6"
          >
            <div className="flex items-center gap-4">
              <ClientLogo name={client.name} alt={client.logoAlt} />
              <h2 className="font-semibold text-white">{client.name}</h2>
            </div>
            <blockquote className="text-zinc-300">
              “{client.testimonial}”
            </blockquote>
            <Link
              href={`/clientes/${client.id}`}
              className="text-sm font-medium text-amber-400 transition-colors hover:text-amber-300"
            >
              Ver proyectos de {client.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
