import Link from "next/link";
import { company } from "@/data/company";

export default function Hero() {
  return (
    <section className="bg-zinc-900 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-24">
        <h1 className="text-4xl font-bold sm:text-5xl">{company.name}</h1>
        <p className="max-w-xl text-lg text-zinc-300">{company.slogan}</p>
        <Link
          href="/contacto"
          className="rounded-full bg-amber-500 px-6 py-3 font-medium text-zinc-900 transition-colors hover:bg-amber-400"
        >
          {company.ctaText}
        </Link>
      </div>
    </section>
  );
}
