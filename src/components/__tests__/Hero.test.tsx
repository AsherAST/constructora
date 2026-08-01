import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "@/components/Hero";
import { company } from "@/data/company";

describe("Hero (US1)", () => {
  test("muestra el nombre de la constructora como encabezado de nivel 1", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", { level: 1, name: company.name }),
    ).toBeInTheDocument();
  });

  test("muestra el eslogan de la empresa", () => {
    render(<Hero />);
    expect(screen.getByText(company.slogan)).toBeInTheDocument();
  });

  test("muestra un botón CTA que enlaza a la página de contacto", () => {
    render(<Hero />);
    const cta = screen.getByRole("link", { name: company.ctaText });
    expect(cta).toHaveAttribute("href", "/contacto");
  });
});
