import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { company } from "@/data/company";

export const metadata: Metadata = { title: "Contacto" };

export default function ContactoPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold text-white">Contacto</h1>
      <p className="mt-4 max-w-2xl text-zinc-300">
        Cuéntanos sobre tu proyecto y te enviaremos un presupuesto sin costo.
        También puedes escribirnos o llamarnos directamente.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
          <h2 className="font-semibold text-white">Información de contacto</h2>
          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="text-zinc-400">Teléfono</dt>
              <dd className="mt-1 font-medium text-white">
                {company.contact.phone}
              </dd>
            </div>
            <div>
              <dt className="text-zinc-400">Correo</dt>
              <dd className="mt-1 font-medium text-white">
                {company.contact.email}
              </dd>
            </div>
            <div>
              <dt className="text-zinc-400">Dirección</dt>
              <dd className="mt-1 font-medium text-white">
                {company.contact.address}
              </dd>
            </div>
          </dl>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
