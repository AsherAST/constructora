import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Clients, { ClientLogo } from "@/components/Clients";
import { clients } from "@/data/clients";

describe("Clients (US6)", () => {
  test("muestra el encabezado de la sección", () => {
    render(<Clients />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Nuestros clientes" }),
    ).toBeInTheDocument();
  });

  test("muestra cada cliente con su nombre, logo y testimonio", () => {
    render(<Clients />);

    for (const client of clients) {
      expect(
        screen.getByRole("heading", { level: 2, name: client.name }),
      ).toBeInTheDocument();
      expect(screen.getByRole("img", { name: client.logoAlt })).toBeInTheDocument();
      expect(screen.getByText(`“${client.testimonial}”`)).toBeInTheDocument();
    }
  });

  test("cada cliente enlaza a su página de proyectos", () => {
    render(<Clients />);

    for (const client of clients) {
      const link = screen.getByRole("link", {
        name: `Ver proyectos de ${client.name}`,
      });
      expect(link).toHaveAttribute("href", `/clientes/${client.id}`);
    }
  });

  test("ClientLogo muestra las iniciales y el label accesible", () => {
    render(<ClientLogo name="Grupo Andrade" alt="Logo de Grupo Andrade" />);
    const logo = screen.getByRole("img", { name: "Logo de Grupo Andrade" });
    expect(logo).toHaveTextContent("GA");
  });
});
