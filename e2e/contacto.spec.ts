import { test, expect } from "@playwright/test";
import { company } from "../src/data/company";

test("US11: la página de contacto muestra el formulario y los datos", async ({
  page,
}) => {
  await page.goto("/contacto");

  await expect(
    page.getByRole("heading", { level: 1, name: "Contacto" }),
  ).toBeVisible();
  await expect(
    page.getByLabel(/Nombre/i),
  ).toBeVisible();
  await expect(
    page.getByLabel(/Correo electrónico/i),
  ).toBeVisible();
  await expect(page.getByLabel(/Mensaje/i)).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Enviar mensaje" }),
  ).toBeVisible();

  const main = page.getByRole("main");
  await expect(main.getByText(company.contact.phone)).toBeVisible();
  await expect(main.getByText(company.contact.email)).toBeVisible();
  await expect(main.getByText(company.contact.address)).toBeVisible();
});

test("US11: enviar el formulario vacío muestra errores de validación", async ({
  page,
}) => {
  await page.goto("/contacto");

  await page.getByRole("button", { name: "Enviar mensaje" }).click();

  await expect(page.getByText("Escribe tu nombre.")).toBeVisible();
  await expect(
    page.getByText("Escribe tu correo electrónico."),
  ).toBeVisible();
  await expect(page.getByText("Escribe tu mensaje.")).toBeVisible();
});

test("US11: un correo inválido muestra error específico", async ({
  page,
}) => {
  await page.goto("/contacto");

  await page.getByRole("textbox", { name: "Nombre" }).fill("Ana Torres");
  await page
    .getByRole("textbox", { name: "Correo electrónico" })
    .fill("correo-invalido");
  await page.getByRole("textbox", { name: "Mensaje" }).fill("Quiero un presupuesto");
  await page.getByRole("button", { name: "Enviar mensaje" }).click();

  await expect(page.getByText("El correo no es válido.")).toBeVisible();
});

test("US12: un formulario válido muestra la confirmación de envío", async ({
  page,
}) => {
  await page.route("**/api/contact", async (route) => {
    await route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) });
  });

  await page.goto("/contacto");

  const name = page.locator("#contact-name");
  await name.click();
  await name.pressSequentially("Ana Torres");

  const email = page.locator("#contact-email");
  await email.click();
  await email.pressSequentially("ana@ejemplo.com");

  const message = page.locator("#contact-message");
  await message.click();
  await message.pressSequentially("Quiero un presupuesto");

  await page.getByRole("button", { name: "Enviar mensaje" }).click();

  await expect(
    page.getByRole("status").getByRole("heading", { name: "¡Mensaje enviado!" }),
  ).toBeVisible();
  await expect(page.getByText(/Gracias, Ana Torres\./i)).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Enviar mensaje" }),
  ).not.toBeVisible();
});
