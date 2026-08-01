import { company } from "@/data/company";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="font-bold text-zinc-900">{company.name}</p>
          <p className="mt-2 text-sm text-zinc-600">{company.description}</p>
        </div>
        <div>
          <h2 className="font-semibold text-zinc-900">Contacto</h2>
          <address className="mt-2 text-sm not-italic text-zinc-600">
            <p>{company.contact.phone}</p>
            <p>{company.contact.email}</p>
            <p>{company.contact.address}</p>
          </address>
        </div>
        <div>
          <h2 className="font-semibold text-zinc-900">Redes</h2>
          <ul className="mt-2 flex flex-col gap-2 text-sm text-zinc-600">
            {company.social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-zinc-900"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-200 px-4 py-4 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} {company.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
