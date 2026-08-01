import { test, expect } from "@playwright/test";
import { about } from "../src/data/about";
import { services } from "../src/data/services";

test("US4: la página de nosotros muestra historia, misión, visión y equipo", async ({
  page,
}) => {
  await page.goto("/nosotros");

  await expect(
    page.getByRole("heading", { level: 1, name: "Nosotros" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Nuestra historia" }),
  ).toBeVisible();
  await expect(page.getByText(about.history)).toBeVisible();

  await expect(page.getByRole("heading", { name: "Misión" })).toBeVisible();
  await expect(page.getByText(about.mission)).toBeVisible();

  await expect(page.getByRole("heading", { name: "Visión" })).toBeVisible();
  await expect(page.getByText(about.vision)).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "Nuestro equipo" }),
  ).toBeVisible();
  for (const member of about.team) {
    await expect(page.getByText(member.name)).toBeVisible();
    await expect(page.getByText(member.role)).toBeVisible();
  }
});

test("US5: la portada muestra la sección de servicios completa", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Nuestros servicios" }),
  ).toBeVisible();
  for (const service of services) {
    await expect(
      page.getByRole("heading", { level: 3, name: service.title }),
    ).toBeVisible();
    await expect(page.getByText(service.description)).toBeVisible();
  }
});
