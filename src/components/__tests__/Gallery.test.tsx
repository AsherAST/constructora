import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Gallery from "@/components/Gallery";
import { galleryItems } from "@/data/gallery";

describe("Gallery (US8)", () => {
  test("muestra el encabezado y la descripción de la galería", () => {
    render(<Gallery items={galleryItems} />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Nuestros proyectos" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Haz clic en una imagen para verla en grande/i),
    ).toBeInTheDocument();
  });

  test("muestra cada proyecto con su imagen, título y categoría", () => {
    render(<Gallery items={galleryItems} />);

    for (const item of galleryItems) {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getAllByText(item.category).length).toBeGreaterThan(0);
      expect(screen.getByAltText(item.alt)).toBeInTheDocument();
    }
  });

  test("renderiza una tarjeta con botón por cada proyecto", () => {
    render(<Gallery items={galleryItems} />);
    for (const item of galleryItems) {
      expect(
        screen.getByRole("button", { name: `Ver ${item.title}` }),
      ).toBeInTheDocument();
    }
  });

  test("las imágenes next/image tienen alt, width y height (US10)", () => {
    render(<Gallery items={galleryItems} />);

    for (const item of galleryItems) {
      const img = screen.getByAltText(item.alt);
      expect(img).toHaveAttribute("width");
      expect(img).toHaveAttribute("height");
      expect(img).toHaveAttribute("src");
      expect(img).not.toHaveAttribute("src", "");
    }
  });

  test("llama a onSelect con el proyecto al hacer clic", async () => {
    const onSelect = vi.fn();
    render(<Gallery items={galleryItems} onSelect={onSelect} />);

    await userEvent.click(
      screen.getByRole("button", { name: `Ver ${galleryItems[0].title}` }),
    );
    expect(onSelect).toHaveBeenCalledWith(galleryItems[0]);
  });
});
