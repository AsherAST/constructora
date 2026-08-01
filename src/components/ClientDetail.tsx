import Link from "next/link";
import type { Client } from "@/data/clients";

export default function ClientDetail({ client }: { client: Client }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <nav aria-label="Migajas de pan">
        <ol className="flex items-center gap-2 text-sm text-zinc-300">
          <li>
            <Link href="/clientes" className="hover:text-white">
              Clientes
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-zinc-100">
            {client.name}
          </li>
        </ol>
      </nav>

      <h1 className="mt-6 text-3xl font-bold text-white">{client.name}</h1>
      <blockquote className="mt-4 max-w-2xl text-zinc-300">
        “{client.testimonial}”
      </blockquote>

      <h2 className="mt-10 text-2xl font-bold text-white">Proyectos realizados</h2>
      <ul
        aria-label="Proyectos realizados"
        className="mt-6 grid gap-6 md:grid-cols-2"
      >
        {client.projects.map((project) => (
          <li
            key={project.name}
            className="rounded-xl border border-zinc-700 bg-zinc-900 p-6"
          >
            <h3 className="font-semibold text-white">{project.name}</h3>
            <dl className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div>
                <dt className="text-zinc-400">Tipo</dt>
                <dd className="mt-1 font-medium text-white">{project.type}</dd>
              </div>
              <div>
                <dt className="text-zinc-400">Año</dt>
                <dd className="mt-1 font-medium text-white">
                  {project.year}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-400">Ubicación</dt>
                <dd className="mt-1 font-medium text-white">
                  {project.location}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </section>
  );
}
