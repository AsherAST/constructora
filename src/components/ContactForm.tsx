"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};
    if (!name.trim()) {
      nextErrors.name = "Escribe tu nombre.";
    }
    if (!email.trim()) {
      nextErrors.email = "Escribe tu correo electrónico.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "El correo no es válido.";
    }
    if (!message.trim()) {
      nextErrors.message = "Escribe tu mensaje.";
    }
    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error ?? "No se pudo enviar el mensaje.");
      }

      setStatus("sent");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "No se pudo enviar el mensaje. Inténtalo de nuevo.",
      );
    }
  }

  function reset() {
    setName("");
    setEmail("");
    setMessage("");
    setErrors({});
    setStatus("idle");
    setErrorMessage("");
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-xl border border-green-700 bg-green-900/40 p-6"
      >
        <h2 className="text-lg font-semibold text-white">
          ¡Mensaje enviado!
        </h2>
        <p className="mt-2 text-zinc-300">
          Gracias, {name.trim()}. Hemos recibido tu solicitud y te
          contactaremos pronto al correo {email.trim()}.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-4 text-sm text-amber-400 hover:text-amber-300"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 rounded-xl border border-zinc-700 bg-zinc-900 p-6"
    >
      <div>
        <label htmlFor="contact-name" className="text-sm font-medium text-white">
          Nombre
        </label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className="mt-1 w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
          placeholder="Tu nombre"
        />
        {errors.name && (
          <p id="contact-name-error" role="alert" className="mt-1 text-sm text-red-400">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className="text-sm font-medium text-white">
          Correo electrónico
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className="mt-1 w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
          placeholder="tucorreo@ejemplo.com"
        />
        {errors.email && (
          <p id="contact-email-error" role="alert" className="mt-1 text-sm text-red-400">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="text-sm font-medium text-white"
        >
          Mensaje
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className="mt-1 w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
          placeholder="Cuéntanos sobre tu proyecto"
        />
        {errors.message && (
          <p id="contact-message-error" role="alert" className="mt-1 text-sm text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-lg border border-red-700 bg-red-900/40 p-3 text-sm text-red-300">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-amber-500 px-6 py-3 font-medium text-zinc-900 transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Enviando…" : "Enviar mensaje"}
      </button>
    </form>
  );
}
