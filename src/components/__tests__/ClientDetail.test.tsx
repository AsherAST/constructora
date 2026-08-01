import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import ClientDetail from "@/components/ClientDetail";
import { clients } from "@/data/clients";

describe("ClientDetail (US7)", () => {
  test("muestra el nombre, testimonio y migas de pan del cliente", () => {
    const client = clients[0];
    render(<ClientDetail client={client} />);

    expect(
      screen.getByRole("heading", { level: 1, name: client.name }),
    ).toBeInTheDocument();
    expect(screen.getByText(`“${client.testimonial}”`)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Clientes" }),
    ).toHaveAttribute("href", "/clientes");
    expect(
      screen.getByRole("heading", { level: 2, name: "Proyectos realizados" }),
    ).toBeInTheDocument();
  });

  test("muestra los proyectos con tipo, año y ubicación", () => {
    const client = clients[0];
    render(<ClientDetail client={client} />);

    for (const project of client.projects) {
      expect(
        screen.getByRole("heading", { level: 3, name: project.name }),
      ).toBeInTheDocument();
      expect(screen.getByText(project.type)).toBeInTheDocument();
      expect(screen.getByText(String(project.year))).toBeInTheDocument();
      expect(screen.getByText(project.location)).toBeInTheDocument();
    }
  });

  test("renderiza un elemento de lista por cada proyecto", () => {
    const client = clients[1];
    render(<ClientDetail client={client} />);
    const list = screen.getByRole("list", { name: /proyectos/i });
    expect(list.querySelectorAll("li")).toHaveLength(client.projects.length);
  });
});
