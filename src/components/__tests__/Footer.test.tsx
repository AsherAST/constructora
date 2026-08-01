import { describe, expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Footer from "@/components/Footer";
import { company } from "@/data/company";

describe("Footer (US3)", () => {
  test("muestra el nombre y la descripción de la empresa", () => {
    render(<Footer />);
    expect(screen.getByText(company.name)).toBeInTheDocument();
    expect(screen.getByText(company.description)).toBeInTheDocument();
  });

  test("muestra teléfono, email y dirección", () => {
    render(<Footer />);
    const contacto = screen.getByRole("heading", { name: "Contacto" });
    const info = within(contacto.closest("div")!);

    expect(info.getByText(company.contact.phone)).toBeInTheDocument();
    expect(info.getByText(company.contact.email)).toBeInTheDocument();
    expect(info.getByText(company.contact.address)).toBeInTheDocument();
  });

  test("muestra un enlace por cada red social, abiertos en pestaña nueva", () => {
    render(<Footer />);
    for (const item of company.social) {
      const link = screen.getByRole("link", { name: item.label });
      expect(link).toHaveAttribute("href", item.href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  test("muestra el año actual y el nombre de la empresa en el copyright", () => {
    render(<Footer />);
    expect(
      screen.getByText(
        `© ${new Date().getFullYear()} ${company.name}. Todos los derechos reservados.`,
      ),
    ).toBeInTheDocument();
  });
});
