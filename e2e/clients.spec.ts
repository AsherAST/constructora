import { test, expect } from "@playwright/test";
import { clients } from "../src/data/clients";

test("US6: la página de clientes muestra logos y testimonios", async ({
  page,
}) => {
  await page.goto("/clientes");

  await expect(
    page.getByRole("heading", { level: 1, name: "Nuestros clientes" }),
  ).toBeVisible();

  for (const client of clients) {
    await expect(
      page.getByRole("img", { name: client.logoAlt }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: client.name }),
    ).toBeVisible();
    await expect(page.getByText(`“${client.testimonial}”`)).toBeVisible();
  }
});

test("US7: navegar al detalle de un cliente muestra sus proyectos", async ({
  page,
}) => {
  const client = clients[0];
  await page.goto(`/clientes/${client.id}`);

  await expect(
    page.getByRole("heading", { level: 1, name: client.name }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Proyectos realizados" }),
  ).toBeVisible();

  for (const project of client.projects) {
    await expect(
      page.getByRole("heading", { level: 3, name: project.name }),
    ).toBeVisible();
    await expect(page.getByText(project.type, { exact: true })).toBeVisible();
    await expect(
      page.getByText(String(project.year), { exact: true }),
    ).toBeVisible();
    await expect(page.getByText(project.location, { exact: true })).toBeVisible();
  }

  await page
    .getByRole("navigation", { name: "Migajas de pan" })
    .getByRole("link", { name: "Clientes" })
    .click();
  await expect(page).toHaveURL("/clientes");
});

test("US7-404: un cliente inexistente muestra la página de no encontrado", async ({
  page,
}) => {
  await page.goto("/clientes/no-existe");
  await expect(
    page.getByRole("heading", { name: "Página no encontrada" }),
  ).toBeVisible();
});
