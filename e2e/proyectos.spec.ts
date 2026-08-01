import { test, expect } from "@playwright/test";
import { galleryItems } from "../src/data/gallery";

test("US8: la galería muestra todos los proyectos en una cuadrícula", async ({
  page,
}) => {
  await page.goto("/proyectos");

  await expect(
    page.getByRole("heading", { level: 1, name: "Nuestros proyectos" }),
  ).toBeVisible();

  for (const item of galleryItems) {
    await expect(
      page.getByRole("button", { name: `Ver ${item.title}` }),
    ).toBeVisible();
    await expect(page.getByText(item.title)).toBeVisible();
    await expect(page.getByAltText(item.alt)).toBeVisible();
  }
});

test("US9: hacer clic en una imagen abre el lightbox y ESC lo cierra", async ({
  page,
}) => {
  const item = galleryItems[0];
  await page.goto("/proyectos");

  await page.getByRole("button", { name: `Ver ${item.title}` }).click();

  const dialog = page.getByRole("dialog", {
    name: `Vista ampliada de ${item.title}`,
  });
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("heading", { name: item.title }),
  ).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
});

test("US9-cierre: clic en el fondo cierra el lightbox", async ({ page }) => {
  const item = galleryItems[0];
  await page.goto("/proyectos");

  await page.getByRole("button", { name: `Ver ${item.title}` }).click();
  const dialog = page.getByRole("dialog", {
    name: `Vista ampliada de ${item.title}`,
  });
  await expect(dialog).toBeVisible();

  await dialog.click({ position: { x: 5, y: 5 } });
  await expect(dialog).not.toBeVisible();
});
