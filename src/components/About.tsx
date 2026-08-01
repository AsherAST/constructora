import { about } from "@/data/about";

export default function About() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold text-white">Nosotros</h1>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-white">Nuestra historia</h2>
          <p className="mt-3 text-zinc-300">{about.history}</p>
        </div>
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-xl font-semibold text-white">Misión</h2>
            <p className="mt-3 text-zinc-300">{about.mission}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Visión</h2>
            <p className="mt-3 text-zinc-300">{about.vision}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
