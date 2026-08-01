import { afterEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/components/ContactForm";

const mockFetch = vi.fn();

afterEach(() => {
  mockFetch.mockReset();
  vi.stubGlobal("fetch", mockFetch);
});

function fillValidForm() {
  return {
    name: screen.getByLabelText(/Nombre/i),
    email: screen.getByLabelText(/Correo electrónico/i),
    message: screen.getByLabelText(/Mensaje/i),
  };
}

async function fillAndSubmit(user: ReturnType<typeof userEvent.setup>) {
  const fields = fillValidForm();
  await user.type(fields.name, "Ana Torres");
  await user.type(fields.email, "ana@ejemplo.com");
  await user.type(fields.message, "Quiero un presupuesto");
  await user.click(screen.getByRole("button", { name: "Enviar mensaje" }));
}

describe("ContactForm (US11)", () => {
  test("muestra los campos nombre, correo y mensaje con su botón de envío", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Enviar mensaje" }),
    ).toBeInTheDocument();
  });

  test("muestra errores al enviar el formulario vacío", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: "Enviar mensaje" }));

    expect(screen.getAllByRole("alert")).toHaveLength(3);
    expect(screen.getByText("Escribe tu nombre.")).toBeInTheDocument();
    expect(
      screen.getByText("Escribe tu correo electrónico."),
    ).toBeInTheDocument();
    expect(screen.getByText("Escribe tu mensaje.")).toBeInTheDocument();
  });

  test("muestra error cuando el correo no es válido", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const fields = fillValidForm();
    await user.type(fields.name, "Ana");
    await user.type(fields.email, "correo-invalido");
    await user.type(fields.message, "Hola");

    await user.click(screen.getByRole("button", { name: "Enviar mensaje" }));

    expect(screen.getByText("El correo no es válido.")).toBeInTheDocument();
  });

  test("marca los campos inválidos con aria-invalid", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: "Enviar mensaje" }));

    expect(screen.getByLabelText(/Nombre/i)).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText(/Correo electrónico/i)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByLabelText(/Mensaje/i)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });
});

describe("ContactForm (US12)", () => {
  test("muestra la confirmación al enviar un formulario válido", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillAndSubmit(user);

    expect(mockFetch).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          name: "Ana Torres",
          email: "ana@ejemplo.com",
          message: "Quiero un presupuesto",
        }),
      }),
    );
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "¡Mensaje enviado!" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Gracias, Ana Torres\./i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/ana@ejemplo\.com/i),
    ).toBeInTheDocument();
  });

  test("el formulario desaparece tras el envío exitoso", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillAndSubmit(user);

    expect(
      screen.queryByRole("button", { name: "Enviar mensaje" }),
    ).not.toBeInTheDocument();
  });

  test("el botón muestra 'Enviando…' mientras se envía", async () => {
    let resolveFetch: (value: Response) => void;
    mockFetch.mockReturnValueOnce(
      new Promise<Response>((resolve) => {
        resolveFetch = resolve;
      }),
    );
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillAndSubmit(user);

    expect(
      screen.getByRole("button", { name: "Enviando…" }),
    ).toBeInTheDocument();

    resolveFetch!({ ok: true } as Response);
  });

  test("muestra un error si el servidor rechaza el envío", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "No se pudo enviar el mensaje. Inténtalo de nuevo." }),
    });
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillAndSubmit(user);

    expect(
      screen.getByText("No se pudo enviar el mensaje. Inténtalo de nuevo."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Enviar mensaje" }),
    ).toBeInTheDocument();
  });
});
