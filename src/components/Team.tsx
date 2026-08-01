import { about } from "@/data/about";

export default function Team() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-2xl font-bold text-white">Nuestro equipo</h2>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {about.team.map((member) => (
          <li
            key={member.name}
            className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 text-center"
          >
            <p className="font-semibold text-white">{member.name}</p>
            <p className="mt-1 text-sm text-zinc-400">{member.role}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
