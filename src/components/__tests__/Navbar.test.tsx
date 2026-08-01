import { describe, expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "@/components/Navbar";
import { company } from "@/data/company";

describe("Navbar (US2)", () => {
  test("muestra el nombre de la empresa como enlace a la portada", () => {
    render(<Navbar />);
    expect(
      screen.getByRole("link", { name: company.name }),
    ).toHaveAttribute("href", "/");
  });

  test("muestra un enlace de navegación por cada link del sitio", () => {
    render(<Navbar />);
    for (const link of company.navLinks) {
      const anchor = screen.getByRole("link", { name: link.label });
      expect(anchor).toHaveAttribute("href", link.href);
    }
  });

  test("el botón de menú móvil tiene aria-expanded=false al inicio", () => {
    render(<Navbar />);
    expect(screen.getByRole("button", { name: "Abrir menú" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  test("abre y cierra el menú móvil al hacer clic", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const toggle = screen.getByRole("button", { name: "Abrir menú" });
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByTestId("menu-movil")).toBeVisible();

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByTestId("menu-movil")).not.toBeInTheDocument();
  });

  test("cerrar el menú al hacer clic en un enlace", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByRole("button", { name: "Abrir menú" }));
    const menu = screen.getByTestId("menu-movil");
    await user.click(within(menu).getByRole("link", { name: company.navLinks[1].label }));

    expect(screen.queryByTestId("menu-movil")).not.toBeInTheDocument();
  });
});
