import { test, expect } from "@playwright/test";
import { company } from "../src/data/company";

test("US1: la portada carga y muestra el hero con nombre y eslogan", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { level: 1, name: company.name }),
  ).toBeVisible();
  await expect(page.getByText(company.slogan)).toBeVisible();
  await expect(
    page.getByRole("link", { name: company.ctaText }),
  ).toHaveAttribute("href", "/contacto");
});

test("US2: cada enlace de la navegación lleva a su página", async ({
  page,
}) => {
  await page.goto("/");

  const nav = page.getByRole("navigation", {
    name: "Navegación principal",
  });

  for (const link of company.navLinks) {
    const anchor = nav.getByRole("link", { name: link.label });
    await expect(anchor).toHaveAttribute("href", link.href);

    if (link.href === "/") {
      continue;
    }
    await Promise.all([page.waitForURL(link.href), anchor.click()]);
    await expect(page).not.toHaveURL(/404/);
  }
});

test("US3: el footer muestra los datos de contacto", async ({ page }) => {
  await page.goto("/");

  const footer = page.locator("footer");
  await expect(footer.getByText(company.name).first()).toBeVisible();
  await expect(footer.getByText(company.contact.phone)).toBeVisible();
  await expect(footer.getByText(company.contact.email)).toBeVisible();
  await expect(footer.getByText(company.contact.address)).toBeVisible();

  for (const item of company.social) {
    await expect(
      footer.getByRole("link", { name: item.label }),
    ).toHaveAttribute("target", "_blank");
  }
});

test("US2-mobile: el menú hamburguesa abre y cierra en viewport móvil", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/");

  const toggle = page.getByRole("button", { name: "Abrir menú" });
  await expect(toggle).toBeVisible();

  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("link", { name: company.navLinks[1].label }),
  ).toBeVisible();

  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(
    page.getByRole("link", { name: company.navLinks[1].label }),
  ).not.toBeVisible();
});
