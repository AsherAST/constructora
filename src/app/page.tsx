import Hero from "@/components/Hero";
import Services from "@/components/Services";
import { company } from "@/data/company";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold text-white">Bienvenidos</h2>
        <p className="mt-4 max-w-2xl text-zinc-300">{company.description}</p>
      </section>
    </>
  );
}
