import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Services from "@/components/Services";
import { services } from "@/data/services";

describe("Services (US5)", () => {
  test("muestra el encabezado de la sección", () => {
    render(<Services />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Nuestros servicios" }),
    ).toBeInTheDocument();
  });

  test("muestra todos los servicios con su título y descripción", () => {
    render(<Services />);

    for (const service of services) {
      expect(
        screen.getByRole("heading", { level: 3, name: service.title }),
      ).toBeInTheDocument();
      expect(screen.getByText(service.description)).toBeInTheDocument();
    }
  });

  test("renderiza un elemento de lista por cada servicio", () => {
    const { container } = render(<Services />);
    expect(container.querySelectorAll("li")).toHaveLength(services.length);
  });
});
