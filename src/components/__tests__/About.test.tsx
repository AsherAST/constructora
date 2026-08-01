import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "@/components/About";
import Team from "@/components/Team";
import { about } from "@/data/about";

describe("About (US4)", () => {
  test("muestra la historia, misión y visión de la empresa", () => {
    render(<About />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Nosotros" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Nuestra historia" }),
    ).toBeInTheDocument();
    expect(screen.getByText(about.history)).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { level: 2, name: "Misión" }),
    ).toBeInTheDocument();
    expect(screen.getByText(about.mission)).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { level: 2, name: "Visión" }),
    ).toBeInTheDocument();
    expect(screen.getByText(about.vision)).toBeInTheDocument();
  });

  test("Team muestra todos los miembros del equipo con su cargo", () => {
    render(<Team />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Nuestro equipo" }),
    ).toBeInTheDocument();

    for (const member of about.team) {
      expect(screen.getByText(member.name)).toBeInTheDocument();
      expect(screen.getByText(member.role)).toBeInTheDocument();
    }
  });

  test("Team renderiza un elemento de lista por cada miembro", () => {
    const { container } = render(<Team />);
    expect(container.querySelectorAll("li")).toHaveLength(about.team.length);
  });
});
