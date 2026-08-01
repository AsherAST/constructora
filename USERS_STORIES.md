# Historias de Usuario — Constructora Horizonte

Documento de seguimiento del proyecto. Si la sesión se corta, este archivo permite retomar el trabajo leyendo las historias pendientes.

## Estado general

| Sprint | Historias | Estado |
|---|---|---|
| 1 — Base | US1, US2, US3 | ✅ Completado |
| 2 — Información | US4, US5 | ✅ Completado |
| 3 — Clientes | US6, US7 | ✅ Completado |
| 4 — Fotos | US8, US9, US10 | ✅ Completado |
| 5 — Contacto | US11, US12 | ✅ Completado |

**Cobertura actual:** 93.3% (unit) · E2E: 48/48 en chromium, firefox, webkit. **Todos los sprints completados.**

---

## Sprint 1 — Base

### US1 — Página de inicio con hero
Como visitante, quiero ver una página de inicio con encabezado, hero con el nombre y eslogan de la constructora, para saber qué hace la empresa.

- **Estado:** ✅ Hecho
- **Implementación:** `src/components/Hero.tsx`, `src/app/page.tsx`, datos en `src/data/company.ts`
- **Tests:** `src/components/__tests__/Hero.test.tsx`, `e2e/app.spec.ts` (US1)

### US2 — Barra de navegación
Como visitante, quiero una barra de navegación (Inicio, Nosotros, Proyectos, Clientes, Contacto) que funcione en móvil y escritorio, para moverme por la web.

- **Estado:** ✅ Hecho
- **Implementación:** `src/components/Navbar.tsx` (menú hamburguesa móvil con `aria-expanded`)
- **Tests:** `src/components/__tests__/Navbar.test.tsx`, `e2e/app.spec.ts` (US2, US2-mobile)

### US3 — Pie de página
Como visitante, quiero un pie de página con datos de contacto, dirección y redes sociales, para contactar a la empresa.

- **Estado:** ✅ Hecho
- **Implementación:** `src/components/Footer.tsx`
- **Tests:** `src/components/__tests__/Footer.test.tsx`, `e2e/app.spec.ts` (US3)

---

## Sprint 2 — Información

### US4 — Sección "Nosotros"
Como visitante, quiero una sección "Nosotros" con la historia, misión, visión y equipo, para conocer la empresa.

- **Estado:** ✅ Hecho
- **Implementación:** `src/components/About.tsx`, `src/components/Team.tsx`, página `/nosotros`, datos en `src/data/about.ts`
- **Tests:** `src/components/__tests__/About.test.tsx`, `e2e/about-services.spec.ts` (US4)

### US5 — Sección de servicios
Como visitante, quiero una sección de servicios (obra civil, remodelación, etc.), para saber qué ofrece la constructora.

- **Estado:** ✅ Hecho
- **Implementación:** `src/components/Services.tsx` (en la portada), datos en `src/data/services.ts`
- **Tests:** `src/components/__tests__/Services.test.tsx`, `e2e/about-services.spec.ts` (US5)

---

## Sprint 3 — Clientes

### US6 — Sección de clientes con logos y testimonios
Como visitante, quiero ver una sección de clientes con logos y testimonios, para generar confianza.

- **Estado:** ✅ Hecho
- **Implementación:** `src/components/Clients.tsx` (logo con iniciales en `ClientLogo`), página `/clientes`, datos en `src/data/clients.ts`
- **Tests:** `src/components/__tests__/Clients.test.tsx`, `e2e/clients.spec.ts` (US6)

### US7 — Detalle de proyectos por cliente
Como visitante, quiero ver qué tipo de proyectos se han realizado para cada cliente (tipo de obra, año, ubicación), para valorar la experiencia.

- **Estado:** ✅ Hecho
- **Implementación:** `src/components/ClientDetail.tsx` (tarjetas con tipo/año/ubicación + migas de pan), ruta SSG `/clientes/[id]` con `generateStaticParams`, página `not-found` en `src/app/not-found.tsx`
- **Tests:** `src/components/__tests__/ClientDetail.test.tsx`, `e2e/clients.spec.ts` (US7, US7-404)

---

## Sprint 4 — Fotos

### US8 — Galería de fotos en cuadrícula responsive
Como visitante, quiero ver una galería de fotos de proyectos con una cuadrícula responsive, para ver el trabajo realizado.

- **Estado:** ✅ Hecho
- **Implementación:** `src/components/Gallery.tsx` (grid `sm:grid-cols-2 lg:grid-cols-3`), datos en `src/data/gallery.ts`, imágenes SVG en `public/proyectos/`
- **Tests:** `src/components/__tests__/Gallery.test.tsx`, `e2e/proyectos.spec.ts` (US8)

### US9 — Lightbox
Como visitante, quiero poder abrir una foto en grande (lightbox) al hacer clic, para ver los detalles de la obra.

- **Estado:** ✅ Hecho
- **Implementación:** `src/components/Lightbox.tsx` (cierra con ESC, clic en fondo o botón; `role="dialog"`), `src/components/ProyectosGallery.tsx`
- **Tests:** `src/components/__tests__/Lightbox.test.tsx`, `e2e/proyectos.spec.ts` (US9, US9-cierre)

### US10 — Optimización de imágenes
Como visitante, quiero que las imágenes tengan carga optimizada (Next Image), para que la página cargue rápido.

- **Estado:** ✅ Hecho
- **Implementación:** `next/image` con `width`/`height`/`alt`/`sizes`; SVG habilitado en `next.config.ts` (`dangerouslyAllowSVG`)
- **Tests:** `src/components/__tests__/Gallery.test.tsx` (verifica atributos de imagen)

---

## Sprint 5 — Contacto

### US11 — Formulario de contacto con validación
Como visitante, quiero un formulario de contacto (nombre, email, mensaje) con validación, para solicitar un presupuesto.

- **Estado:** ✅ Hecho
- **Implementación:** `src/components/ContactForm.tsx` (client component con validación por campo, `aria-invalid`/`role="alert"` para accesibilidad), página `/contacto` con datos de contacto
- **Tests:** `src/components/__tests__/ContactForm.test.tsx`, `e2e/contacto.spec.ts` (US11)

### US12 — Confirmación de envío
Como cliente potencial, quiero recibir confirmación de que el mensaje se envió, para saber que mi solicitud llegó.

- **Estado:** ✅ Hecho
- **Implementación:** estado `submitted` en `ContactForm.tsx` muestra confirmación con `role="status"` y opción de enviar otro mensaje
- **Tests:** `src/components/__tests__/ContactForm.test.tsx`, `e2e/contacto.spec.ts` (US12)

---

## Proyecto completo

- **Total:** 12 historias de usuario en 5 sprints, todas completadas.
- **Verificación final:** lint OK · 49 tests unit · 48 E2E (16 por navegador) · build OK.

## Registro de progreso

- **Sprint 1 (2026-07-31):** Base del proyecto Next.js 16 + testing (Vitest/RTL/Playwright). 12 unit + 12 E2E. Cobertura 92.3%. Lint y build OK.
- **Sprint 2 (2026-07-31):** US4 y US5. 18 unit + 18 E2E. Cobertura 95%. Lint y build OK. Ajuste de eslint config para ignorar `coverage/`, `playwright-report/`, `test-results/`.
- **Sprint 3 (2026-07-31):** US6 y US7. 25 unit + 27 E2E. Cobertura 96.5%. Ruta dinámica `/clientes/[id]` con SSG. Página `not-found` personalizada. Lint y build OK.
- **Sprint 4 (2026-07-31):** US8, US9, US10. 35 unit + 36 E2E. Cobertura 97.7%. Galería con `next/image`, lightbox accesible, 6 imágenes SVG generadas en `public/proyectos/`. Lint y build OK.
- **Sprint 5 (2026-07-31):** US11, US12. 49 unit + 48 E2E. Cobertura 93.3%. Formulario de contacto con validación accesible, confirmación de envío y envío real vía Resend (`/api/contact`). Lint y build OK.
- **Deploy (2026-07-31):** Desplegado en Vercel → https://constructora-six-theta.vercel.app. Env vars: `RESEND_API_KEY`, `CONTACT_FROM_EMAIL=onboarding@resend.dev`, `CONTACT_TO_EMAIL=damianespinosadev@gmail.com`. Endpoint `/api/contact` verificado con envío real.

---

## Cómo verificar

- Ver página en desarrollo: `npm run dev` → http://localhost:3000
- Tests unit: `npm run test`
- Cobertura: `npm run test:coverage`
- Tests E2E: `npm run test:e2e`
- Lint: `npm run lint`
- Build: `npm run build`

Para retomar el trabajo en una sesión nueva: abrir este archivo y pedir "continúa con las historias de usuario pendientes". Todas las historias están completadas; se pueden plantear historias nuevas (p. ej., envío real del formulario por email, blog, o panel de administración).
