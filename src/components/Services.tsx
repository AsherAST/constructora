import { services } from "@/data/services";

export default function Services() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-2xl font-bold text-white">Nuestros servicios</h2>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <li
            key={service.title}
            className="rounded-xl border border-zinc-700 bg-zinc-900 p-6"
          >
            <h3 className="font-semibold text-white">{service.title}</h3>
            <p className="mt-2 text-sm text-zinc-300">{service.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
