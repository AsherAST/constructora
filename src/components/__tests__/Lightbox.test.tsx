import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Lightbox from "@/components/Lightbox";
import { galleryItems } from "@/data/gallery";

describe("Lightbox (US9)", () => {
  test("muestra el diálogo con la imagen ampliada y los datos del proyecto", () => {
    const item = galleryItems[0];
    render(<Lightbox item={item} onClose={vi.fn()} />);

    const dialog = screen.getByRole("dialog", {
      name: `Vista ampliada de ${item.title}`,
    });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByAltText(item.alt)).toBeInTheDocument();
    expect(screen.getByText(item.title)).toBeInTheDocument();
    expect(screen.getByText(item.category)).toBeInTheDocument();
  });

  test("cierra al hacer clic en el botón Cerrar", async () => {
    const onClose = vi.fn();
    render(<Lightbox item={galleryItems[0]} onClose={onClose} />);

    await userEvent.click(
      screen.getByRole("button", { name: "Cerrar (ESC)" }),
    );
    expect(onClose).toHaveBeenCalledOnce();
  });

  test("cierra al presionar la tecla Escape", async () => {
    const onClose = vi.fn();
    render(<Lightbox item={galleryItems[0]} onClose={onClose} />);

    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledOnce();
  });

  test("cierra al hacer clic en el fondo oscuro", async () => {
    const onClose = vi.fn();
    const { container } = render(
      <Lightbox item={galleryItems[0]} onClose={onClose} />,
    );

    await userEvent.click(container.firstChild as Element);
    expect(onClose).toHaveBeenCalledOnce();
  });

  test("no cierra al hacer clic dentro del contenido", async () => {
    const onClose = vi.fn();
    render(<Lightbox item={galleryItems[0]} onClose={onClose} />);

    await userEvent.click(screen.getByAltText(galleryItems[0].alt));
    expect(onClose).not.toHaveBeenCalled();
  });
});
