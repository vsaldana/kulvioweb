# Site Enrichment + SEO Landing Pages — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Enrich the kulvioweb marketing site with missing product capabilities (38 functional domains vs ~10 currently shown) and create SEO landing pages for transactional keywords like "software proteccion datos Chile".

**Architecture:** Static HTML/CSS/JS site served by nginx:alpine with SSI includes for shared nav/footer/mobile-menu. No framework, no bundler. Single CSS file (`public/css/styles.css`), single JS file (`public/js/main.js`). Clean URLs via `try_files`. Cache busting via `?v=N` query params. All content in Spanish (es-CL).

**Tech Stack:** HTML5, CSS3 (BEM, custom properties), vanilla JS (IIFE), nginx SSI, Schema.org JSON-LD

**Content Source:** `/home/azureuser/repos/kulvio/docs/Funcionalidades_Implementadas.md` (38 functional domains) + 12-Phase Implementation Guide (user-provided during brainstorming, see design doc)

**Design Doc:** `docs/plans/2026-03-02-site-enrichment-seo-design.md`

---

## Conventions to Follow

- **BEM naming:** `.block__element--modifier` (e.g., `.module-card__title`, `.btn--primary`)
- **Design tokens:** Always use CSS custom properties from `:root` (never hardcode colors/shadows/transitions)
- **Responsive:** Mobile-first with breakpoints at 640px, 768px, 960px
- **Reveal animations:** Add `.reveal` class + variants (`.reveal--scale`, `.reveal--slide-left`, `.reveal-delay-N`) to animated elements
- **SVG icons:** Inline SVGs with `viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`
- **Links:** External links get `target="_blank" rel="noopener noreferrer"`. Internal links use clean URLs (e.g., `/features` not `/features.html`)
- **SSI includes:** Every page must have `<!--#include virtual="/includes/nav.html" -->`, `<!--#include virtual="/includes/mobile-menu.html" -->` after `<body>`, and `<!--#include virtual="/includes/footer.html" -->` before `</body>`
- **Cache busting:** All pages reference `css/styles.css?v=9` and `js/main.js?v=9` (bump from v=8)
- **CTA links:** "Solicitar Demo" links point to `https://www.solutoria.cl/_contacto.php`
- **Schema.org:** Inner pages use `WebPage` + `BreadcrumbList`. Homepage uses `@graph` with Organization, WebSite, SoftwareApplication, WebPage
- **Checkmark SVG** (used in `.module-card__feature`): `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`

---

### Task 1: Add CSS for implementation guide stepper and new components

**Files:**
- Modify: `public/css/styles.css` (append new styles at end, before any closing comment)

**Context:** We need CSS for a new "implementation guide" visual stepper component used on both the landing page and the enriched index.html. We also need styles for a "feature badge strip" component.

**Step 1: Add the implementation guide stepper CSS**

Append to `public/css/styles.css`:

```css
/* --- Implementation Guide Stepper --- */
.guide-stepper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-top: 48px;
}

@media (min-width: 640px) {
  .guide-stepper {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 960px) {
  .guide-stepper {
    grid-template-columns: repeat(3, 1fr);
  }
}

.guide-step {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 24px;
  background: var(--surface);
  border: 1px solid var(--surface-border);
  border-radius: var(--radius);
  transition: var(--transition);
}

.guide-step:hover {
  border-color: var(--teal);
  box-shadow: var(--shadow-sm);
}

.guide-step__number {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--teal-muted);
  color: var(--teal);
  font-weight: 700;
  font-size: 0.85rem;
  border-radius: 50%;
}

.guide-step__title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--ink);
  line-height: 1.4;
}

.guide-step__desc {
  font-size: 0.85rem;
  color: var(--body-light);
  margin-top: 4px;
  line-height: 1.5;
}

/* Dark variant (for navy sections) */
.section--navy .guide-step {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.12);
}

.section--navy .guide-step:hover {
  border-color: var(--teal);
  background: rgba(255, 255, 255, 0.10);
}

.section--navy .guide-step__title {
  color: var(--white);
}

.section--navy .guide-step__desc {
  color: rgba(255, 255, 255, 0.7);
}

/* --- Feature Badge Strip --- */
.badge-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-top: 40px;
}

.badge-strip__item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: var(--teal-muted);
  color: var(--teal);
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 600;
  transition: var(--transition);
}

.badge-strip__item:hover {
  background: var(--teal);
  color: var(--white);
}

.badge-strip__item svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

/* Dark variant */
.section--navy .badge-strip__item {
  background: rgba(0, 119, 238, 0.2);
  color: var(--teal-glow);
}

.section--navy .badge-strip__item:hover {
  background: var(--teal);
  color: var(--white);
}

/* --- Highlight Box (for differentiator callouts) --- */
.highlight-box {
  background: var(--teal-muted);
  border: 1px solid rgba(0, 119, 238, 0.2);
  border-radius: var(--radius-lg);
  padding: 32px 36px;
  margin-top: 40px;
}

.highlight-box__title {
  font-family: var(--font-display);
  font-size: 1.3rem;
  color: var(--ink);
  margin-bottom: 12px;
}

.highlight-box__list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

@media (min-width: 640px) {
  .highlight-box__list {
    grid-template-columns: repeat(2, 1fr);
  }
}

.highlight-box__item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.95rem;
  color: var(--ink-secondary);
  line-height: 1.5;
}

.highlight-box__item svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: var(--teal);
  margin-top: 2px;
}

/* Dark variant */
.section--navy .highlight-box {
  background: rgba(0, 119, 238, 0.12);
  border-color: rgba(0, 119, 238, 0.25);
}

.section--navy .highlight-box__title {
  color: var(--white);
}

.section--navy .highlight-box__item {
  color: rgba(255, 255, 255, 0.85);
}

/* --- Stats Row (for landing page metrics) --- */
.stats-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 40px;
}

@media (min-width: 768px) {
  .stats-row {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stats-row__item {
  text-align: center;
}

.stats-row__value {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 2.8rem);
  color: var(--teal);
  line-height: 1;
}

.stats-row__label {
  font-size: 0.85rem;
  color: var(--body-light);
  margin-top: 8px;
}

.section--navy .stats-row__value {
  color: var(--teal-glow);
}

.section--navy .stats-row__label {
  color: rgba(255, 255, 255, 0.7);
}
```

**Step 2: Verify styles render correctly**

Run: Open browser to `http://vsserver:8000` (won't see changes until container rebuild, but CSS syntax can be checked)

Verify: No syntax errors in the new CSS by checking the file loads correctly.

**Step 3: Commit**

```bash
git add public/css/styles.css
git commit -m "feat(css): add stepper, badge strip, highlight box, and stats row components"
```

---

### Task 2: Create SEO landing page `/software-proteccion-datos`

**Files:**
- Create: `public/software-proteccion-datos.html`

**Context:** This is the primary SEO landing page targeting "software proteccion datos Chile" and related transactional keywords. It follows the same HTML structure pattern as other pages (SSI includes, page-hero, sections, cta-banner). The hero differentiator is the 12-Phase Implementation Guide with smart progress tracking.

**Step 1: Create the landing page HTML**

Create `public/software-proteccion-datos.html` with the following structure:

```html
<!DOCTYPE html>
<html lang="es-CL">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#1B3A5C">
  <title>Software Protección de Datos Chile | Kulvio — Cumplimiento Ley 21.719</title>
  <meta name="description" content="Software de protección de datos personales para empresas en Chile. Guía de implementación de 12 fases con progreso inteligente, asistente IA, motor de riesgo automático y auditoría inmutable. Cumple la Ley 21.719 antes del 1 de diciembre de 2026.">
  <link rel="canonical" href="https://kulvio.cl/software-proteccion-datos">
  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_CL">
  <meta property="og:site_name" content="Kulvio">
  <meta property="og:title" content="Software Protección de Datos Chile | Kulvio">
  <meta property="og:description" content="Software de protección de datos personales para empresas en Chile. Guía de 12 fases con progreso inteligente. Cumple la Ley 21.719.">
  <meta property="og:url" content="https://kulvio.cl/software-proteccion-datos">
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="Software Protección de Datos Chile | Kulvio">
  <meta name="twitter:description" content="Plataforma de cumplimiento de la Ley 21.719 con guía de 12 fases, asistente IA y auditoría inmutable.">
  <link rel="icon" type="image/svg+xml" href="/img/favicon.svg?v=9">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap">
  <link rel="stylesheet" href="/css/styles.css?v=9">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Software Protección de Datos Chile | Kulvio",
    "description": "Software de protección de datos personales para empresas en Chile. Guía de implementación de 12 fases con progreso inteligente.",
    "url": "https://kulvio.cl/software-proteccion-datos",
    "isPartOf": { "@id": "https://kulvio.cl/#website" },
    "about": { "@id": "https://kulvio.cl/#software" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://kulvio.cl/" },
        { "@type": "ListItem", "position": 2, "name": "Software Protección de Datos", "item": "https://kulvio.cl/software-proteccion-datos" }
      ]
    }
  }
  </script>
</head>
<body>

  <!--#include virtual="/includes/nav.html" -->
  <!--#include virtual="/includes/mobile-menu.html" -->

  <main>

  <!-- ======== PAGE HERO ======== -->
  <section class="page-hero">
    <div class="container">
      <span class="section__label reveal">Software de cumplimiento normativo</span>
      <h1 class="page-hero__title">Software de protección de datos<br>personales para empresas en Chile</h1>
      <p class="page-hero__subtitle reveal reveal-delay-2">
        Kulvio es la plataforma que guía a tu organización paso a paso hacia el cumplimiento
        de la Ley 21.719, con evidencia auditable y trazabilidad completa. Desde el diagnóstico
        inicial hasta el monitoreo continuo.
      </p>
      <div style="margin-top: 32px;" class="reveal reveal-delay-3">
        <a href="https://www.solutoria.cl/_contacto.php" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--lg">
          Solicitar Demo
          <svg class="arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </a>
      </div>
    </div>
  </section>

  <!-- ======== PROBLEM → SOLUTION ======== -->
  <section class="section">
    <div class="container">
      <div class="section-header--split">
        <h2 class="section__heading reveal reveal--slide-left">El desafío del cumplimiento<br>en Chile</h2>
        <p class="section__subheading reveal reveal--slide-right">
          La Ley 21.719 entra en vigencia el 1 de diciembre de 2026, con multas de hasta
          20.000 UTM (~USD 1,2M) y un Registro Nacional de Sanciones público. Implementar
          un programa de cumplimiento sin herramientas especializadas puede tomar meses de
          consultoría y miles de horas de trabajo manual.
        </p>
      </div>

      <div class="stats-row reveal reveal-delay-1">
        <div class="stats-row__item">
          <div class="stats-row__value">20.000</div>
          <div class="stats-row__label">UTM en multas gravísimas</div>
        </div>
        <div class="stats-row__item">
          <div class="stats-row__value">4%</div>
          <div class="stats-row__label">de ingresos anuales por reincidencia</div>
        </div>
        <div class="stats-row__item">
          <div class="stats-row__value">30</div>
          <div class="stats-row__label">días para responder derechos ARCOP</div>
        </div>
        <div class="stats-row__item">
          <div class="stats-row__value">Dic 2026</div>
          <div class="stats-row__label">fecha de entrada en vigencia</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ======== GUÍA DE 12 FASES (HERO SECTION) ======== -->
  <section class="section section--navy">
    <div class="container">
      <div class="section-header--center">
        <span class="section__label reveal">Diferenciador clave</span>
        <h2 class="section__heading reveal reveal-delay-1">Guía de implementación de 12 fases<br>con progreso inteligente</h2>
        <p class="section__subheading reveal reveal-delay-2">
          No es un checklist estático. Es un roadmap vivo que acompaña a tu organización
          durante todo el ciclo de cumplimiento, con 40+ pasos concretos donde 22 se completan
          automáticamente desde los datos reales de la plataforma.
        </p>
      </div>

      <div class="guide-stepper">
        <div class="guide-step reveal reveal-delay-1">
          <div class="guide-step__number">0</div>
          <div>
            <div class="guide-step__title">Configuración Inicial</div>
            <div class="guide-step__desc">Registro, perfil legal, portales públicos, equipo y DPO</div>
          </div>
        </div>
        <div class="guide-step reveal reveal-delay-1">
          <div class="guide-step__number">1</div>
          <div>
            <div class="guide-step__title">Diagnóstico</div>
            <div class="guide-step__desc">Cuestionario que determina qué requisitos aplican</div>
          </div>
        </div>
        <div class="guide-step reveal reveal-delay-2">
          <div class="guide-step__number">2</div>
          <div>
            <div class="guide-step__title">Registro de Actividades (RAT)</div>
            <div class="guide-step__desc">Documentar cada actividad con flujo de aprobación</div>
          </div>
        </div>
        <div class="guide-step reveal reveal-delay-2">
          <div class="guide-step__number">3</div>
          <div>
            <div class="guide-step__title">Evaluación de Riesgo</div>
            <div class="guide-step__desc">Motor automático con reglas basadas en la normativa</div>
          </div>
        </div>
        <div class="guide-step reveal reveal-delay-3">
          <div class="guide-step__number">4</div>
          <div>
            <div class="guide-step__title">Seguridad y EIPD</div>
            <div class="guide-step__desc">Controles de seguridad con evidencia y EIPD firmada</div>
          </div>
        </div>
        <div class="guide-step reveal reveal-delay-3">
          <div class="guide-step__number">5</div>
          <div>
            <div class="guide-step__title">Terceros y Proveedores</div>
            <div class="guide-step__desc">DPA digital, portal externo y evaluación de riesgo</div>
          </div>
        </div>
        <div class="guide-step reveal reveal-delay-1">
          <div class="guide-step__number">6</div>
          <div>
            <div class="guide-step__title">Consentimientos</div>
            <div class="guide-step__desc">Widget embebible, CMP banner y suppression list</div>
          </div>
        </div>
        <div class="guide-step reveal reveal-delay-1">
          <div class="guide-step__number">7</div>
          <div>
            <div class="guide-step__title">Derechos ARCOP</div>
            <div class="guide-step__desc">Portal público con SLA automáticos y escalación</div>
          </div>
        </div>
        <div class="guide-step reveal reveal-delay-2">
          <div class="guide-step__number">8</div>
          <div>
            <div class="guide-step__title">Brechas de Seguridad</div>
            <div class="guide-step__desc">Protocolo de respuesta con notificación obligatoria</div>
          </div>
        </div>
        <div class="guide-step reveal reveal-delay-2">
          <div class="guide-step__number">9</div>
          <div>
            <div class="guide-step__title">Canal de Denuncias</div>
            <div class="guide-step__desc">Portal anónimo con seguimiento y protección</div>
          </div>
        </div>
        <div class="guide-step reveal reveal-delay-3">
          <div class="guide-step__number">10</div>
          <div>
            <div class="guide-step__title">Documentación</div>
            <div class="guide-step__desc">Wiki con 58 plantillas ISO y editor WYSIWYG</div>
          </div>
        </div>
        <div class="guide-step reveal reveal-delay-3">
          <div class="guide-step__number">11</div>
          <div>
            <div class="guide-step__title">Monitoreo Continuo</div>
            <div class="guide-step__desc">Dashboard KPIs, audit trail y mejora continua</div>
          </div>
        </div>
      </div>

      <div class="highlight-box reveal reveal-delay-4">
        <h3 class="highlight-box__title">¿Por qué es diferente?</h3>
        <div class="highlight-box__list">
          <div class="highlight-box__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            Se actualiza sola — el progreso se calcula desde la base de datos real
          </div>
          <div class="highlight-box__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            Cubre el ciclo completo — no solo el setup inicial
          </div>
          <div class="highlight-box__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            Conecta con los módulos — cada paso lleva al módulo correspondiente
          </div>
          <div class="highlight-box__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            Distingue roles — indica quién hace cada paso (Admin, DPO, Operador, Auditor)
          </div>
          <div class="highlight-box__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            Tips contextuales — consejos prácticos y advertencias legales por paso
          </div>
          <div class="highlight-box__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            Evidencia auditable — el progreso queda registrado y es demostrable
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ======== ASISTENTE IA ======== -->
  <section class="section">
    <div class="container">
      <div class="section-header--split">
        <h2 class="section__heading reveal reveal--slide-left">Asistente IA integrado<br>para compliance</h2>
        <p class="section__subheading reveal reveal--slide-right">
          Redacta políticas de privacidad, procedimientos, evaluaciones de impacto y
          documentos legales en segundos. El asistente IA de Kulvio genera borradores
          de calidad profesional adaptados a la normativa chilena, reduciendo semanas
          de trabajo a minutos.
        </p>
      </div>
    </div>
  </section>

  <!-- ======== MÓDULOS GRID ======== -->
  <section class="section section--gray">
    <div class="container">
      <div class="section-header--center">
        <span class="section__label reveal">Plataforma integral</span>
        <h2 class="section__heading reveal reveal-delay-1">Todos los módulos que necesitas</h2>
        <p class="section__subheading reveal reveal-delay-2">
          Más de 38 dominios funcionales que cubren cada obligación de la Ley 21.719.
        </p>
      </div>

      <div class="value-grid">
        <div class="value-card reveal reveal-delay-1">
          <div class="value-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </div>
          <h3 class="value-card__title">Registro de Actividades (RAT)</h3>
          <p class="value-card__text">Catálogo completo con flujo de aprobación, versionamiento granular y validación de bases de licitud.</p>
        </div>
        <div class="value-card reveal reveal-delay-2">
          <div class="value-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <h3 class="value-card__title">EIPD y Motor de Riesgo</h3>
          <p class="value-card__text">13 reglas automáticas (4 hard + 9 soft), clasificación de riesgo y EIPD con firma digital SHA-256.</p>
        </div>
        <div class="value-card reveal reveal-delay-3">
          <div class="value-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h3 class="value-card__title">Derechos ARCOP</h3>
          <p class="value-card__text">Portal público, SLA automáticos de 30 días, escalamiento progresivo y propagación a terceros.</p>
        </div>
        <div class="value-card reveal reveal-delay-1">
          <div class="value-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <h3 class="value-card__title">Gestión de Brechas</h3>
          <p class="value-card__text">Reporte, triaje, notificación a la Agencia y titulares con countdown configurable.</p>
        </div>
        <div class="value-card reveal reveal-delay-2">
          <div class="value-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
          </div>
          <h3 class="value-card__title">Terceros y DPA Digital</h3>
          <p class="value-card__text">DPA con firma electrónica, portal del encargado, evaluación de riesgo de vendors y certificaciones.</p>
        </div>
        <div class="value-card reveal reveal-delay-3">
          <div class="value-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/><path d="M9 12l2 2 4-4"/>
            </svg>
          </div>
          <h3 class="value-card__title">Auditoría Inmutable</h3>
          <p class="value-card__text">Cadena SHA-256 tipo blockchain, WORM, Legal Hold y exportación con checksum verificable.</p>
        </div>
      </div>

      <div class="badge-strip reveal reveal-delay-4">
        <span class="badge-strip__item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          Motor de Riesgo Automático
        </span>
        <span class="badge-strip__item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          Protección por Diseño (PbD)
        </span>
        <span class="badge-strip__item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          CMP Banner + Google Consent Mode
        </span>
        <span class="badge-strip__item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          Dashboard KPIs
        </span>
        <span class="badge-strip__item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          Import Masivo CSV
        </span>
        <span class="badge-strip__item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          Report Builder
        </span>
      </div>

      <div style="text-align: center; margin-top: 40px;">
        <a href="/features" class="btn btn--primary btn--lg reveal reveal-delay-5">
          Ver todos los módulos en detalle
          <svg class="arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </a>
      </div>
    </div>
  </section>

  <!-- ======== TRUST ======== -->
  <section class="section">
    <div class="container">
      <div class="section-header--center">
        <span class="section__label reveal">Seguridad Enterprise</span>
        <h2 class="section__heading reveal reveal-delay-1">Construido con seguridad<br>desde el primer día</h2>
      </div>

      <div class="value-grid">
        <div class="value-card reveal reveal-delay-1">
          <div class="value-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h3 class="value-card__title">Cifrado AES-256 + TLS 1.3</h3>
          <p class="value-card__text">Datos cifrados en reposo y en tránsito con los estándares más exigentes de la industria.</p>
        </div>
        <div class="value-card reveal reveal-delay-2">
          <div class="value-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h3 class="value-card__title">Aislamiento por tenant</h3>
          <p class="value-card__text">Los datos de cada organización están completamente aislados. Imposibilidad técnica de acceso cruzado.</p>
        </div>
        <div class="value-card reveal reveal-delay-3">
          <div class="value-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/><path d="M9 12l2 2 4-4"/>
            </svg>
          </div>
          <h3 class="value-card__title">ISO 27001 en proceso</h3>
          <p class="value-card__text">Consultoría activa para certificación ISO 27001. Compatible con RGPD. Roadmap ISO 27701.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ======== CTA BANNER ======== -->
  <section class="cta-banner">
    <div class="container">
      <h2 class="cta-banner__heading reveal">Comienza tu programa de cumplimiento hoy</h2>
      <p class="cta-banner__text reveal reveal-delay-1">Solicita una demostración y conoce cómo Kulvio puede llevar a tu organización al cumplimiento de la Ley 21.719 antes del 1 de diciembre de 2026.</p>
      <a href="https://www.solutoria.cl/_contacto.php" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--lg reveal reveal-delay-2">
        Solicitar Demo
        <svg class="arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
      </a>
      <div class="trust-badges reveal reveal-delay-3">
        <div class="trust-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/></svg>
          Ley 21.719
        </div>
        <div class="trust-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          AES-256
        </div>
        <div class="trust-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          RGPD Compatible
        </div>
      </div>
    </div>
  </section>

  <!-- ======== PRE-FOOTER CTA ======== -->
  <section class="pre-footer">
    <div class="container">
      <h3 class="pre-footer__heading reveal">¿Listo para cumplir?</h3>
      <a href="https://www.solutoria.cl/_contacto.php" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--lg reveal reveal-delay-1">
        Agendar Demo
        <svg class="arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
      </a>
    </div>
  </section>

  </main>

  <!--#include virtual="/includes/footer.html" -->

  <script src="/js/main.js?v=9"></script>
</body>
</html>
```

**Step 2: Commit**

```bash
git add public/software-proteccion-datos.html
git commit -m "feat: add SEO landing page /software-proteccion-datos"
```

---

### Task 3: Create SEO landing page `/plataforma-dpo`

**Files:**
- Create: `public/plataforma-dpo.html`

**Context:** Landing page targeting DPOs and technical users. Keywords: "software DPO Chile", "herramienta DPO", "plataforma delegado proteccion datos", "gestion datos personales empresa". Focuses on technical capabilities: risk engine, EIPD, PbD with AI, dashboard KPIs, report builder, audit trail.

**Step 1: Create the landing page HTML**

Create `public/plataforma-dpo.html` following the same structure as Task 2 but with DPO-focused content:

```html
<!DOCTYPE html>
<html lang="es-CL">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#1B3A5C">
  <title>Plataforma para DPO Chile | Software Gestión Datos Personales | Kulvio</title>
  <meta name="description" content="La plataforma de gestión de datos personales para DPOs en Chile. Motor de riesgo automático, EIPD con firma digital, Protección por Diseño con IA, dashboard de KPIs, report builder y auditoría inmutable SHA-256.">
  <link rel="canonical" href="https://kulvio.cl/plataforma-dpo">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_CL">
  <meta property="og:site_name" content="Kulvio">
  <meta property="og:title" content="Plataforma para DPO Chile | Kulvio">
  <meta property="og:description" content="Herramientas especializadas para el Delegado de Protección de Datos. Motor de riesgo, EIPD, PbD con IA, dashboard KPIs y auditoría inmutable.">
  <meta property="og:url" content="https://kulvio.cl/plataforma-dpo">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="Plataforma para DPO Chile | Kulvio">
  <meta name="twitter:description" content="Herramientas para el DPO: motor de riesgo, EIPD, PbD, dashboard KPIs y auditoría inmutable.">
  <link rel="icon" type="image/svg+xml" href="/img/favicon.svg?v=9">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap">
  <link rel="stylesheet" href="/css/styles.css?v=9">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Plataforma para DPO Chile | Kulvio",
    "description": "La plataforma de gestión de datos personales para DPOs en Chile.",
    "url": "https://kulvio.cl/plataforma-dpo",
    "isPartOf": { "@id": "https://kulvio.cl/#website" },
    "about": { "@id": "https://kulvio.cl/#software" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://kulvio.cl/" },
        { "@type": "ListItem", "position": 2, "name": "Plataforma DPO", "item": "https://kulvio.cl/plataforma-dpo" }
      ]
    }
  }
  </script>
</head>
<body>

  <!--#include virtual="/includes/nav.html" -->
  <!--#include virtual="/includes/mobile-menu.html" -->

  <main>

  <!-- ======== PAGE HERO ======== -->
  <section class="page-hero">
    <div class="container">
      <span class="section__label reveal">Para Delegados de Protección de Datos</span>
      <h1 class="page-hero__title">La plataforma de gestión de datos<br>personales para DPOs en Chile</h1>
      <p class="page-hero__subtitle reveal reveal-delay-2">
        Herramientas especializadas que automatizan la evaluación de riesgo, generan evidencia
        auditable y mantienen el programa de cumplimiento actualizado de forma continua.
      </p>
      <div style="margin-top: 32px;" class="reveal reveal-delay-3">
        <a href="https://www.solutoria.cl/_contacto.php" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--lg">
          Solicitar Acceso DPO
          <svg class="arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </a>
      </div>
    </div>
  </section>

  <!-- ======== MOTOR DE RIESGO ======== -->
  <section class="section">
    <div class="container">
      <div class="section-header--split">
        <h2 class="section__heading reveal reveal--slide-left">Motor de evaluación<br>de riesgo automático</h2>
        <p class="section__subheading reveal reveal--slide-right">
          13 reglas basadas en los criterios del WP248rev.01 del Grupo de Trabajo del
          Artículo 29, adaptadas a la normativa chilena. 4 reglas hard de disparo obligatorio
          y 9 reglas soft ponderadas. Eliminan la subjetividad en la clasificación de riesgo.
        </p>
      </div>

      <div class="value-grid">
        <div class="value-card reveal reveal-delay-1">
          <div class="value-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <h3 class="value-card__title">4 Hard Rules obligatorias</h3>
          <p class="value-card__text">IA con efecto jurídico, masivo >10.000 registros, monitoreo público y sensibles sin consentimiento disparan EIPD automáticamente.</p>
        </div>
        <div class="value-card reveal reveal-delay-2">
          <div class="value-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <h3 class="value-card__title">9 Soft Rules WP29</h3>
          <p class="value-card__text">Scoring, decisiones automáticas, observación, sensibles, gran escala, cruce de bases, vulnerables, nuevas tecnologías, bloqueo de derechos.</p>
        </div>
        <div class="value-card reveal reveal-delay-3">
          <div class="value-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <h3 class="value-card__title">PDF sellado de análisis</h3>
          <p class="value-card__text">Cada evaluación genera un PDF con el resultado, reglas aplicadas y justificación. Recálculo dinámico ante cambios en el RAT.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ======== EIPD ======== -->
  <section class="section section--gray">
    <div class="container">
      <div class="section-header--split">
        <h2 class="section__heading reveal reveal--slide-left">EIPD automatizada<br>con firma digital</h2>
        <p class="section__subheading reveal reveal--slide-right">
          Sub-wizard de 4 secciones que cubre los requisitos del Art. 15 ter:
          descripción sistemática, necesidad y proporcionalidad, matriz de riesgos
          (Probabilidad x Impacto) y medidas de mitigación. Los campos se pre-llenan
          desde el RAT, reduciendo duplicación.
        </p>
      </div>

      <div class="value-grid">
        <div class="value-card reveal reveal-delay-1">
          <div class="value-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/><path d="M9 12l2 2 4-4"/>
            </svg>
          </div>
          <h3 class="value-card__title">Firma digital SHA-256</h3>
          <p class="value-card__text">El RDP firma digitalmente la EIPD con hash SHA-256. PDF exportable con dictamen del DPO y matriz de riesgo residual.</p>
        </div>
        <div class="value-card reveal reveal-delay-2">
          <div class="value-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <h3 class="value-card__title">Consulta previa automática</h3>
          <p class="value-card__text">Cuando el riesgo residual supera el umbral de aceptabilidad, el sistema activa el flujo de consulta previa a la Agencia.</p>
        </div>
        <div class="value-card reveal reveal-delay-3">
          <div class="value-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <h3 class="value-card__title">Invalidación inteligente</h3>
          <p class="value-card__text">Cambios en campos críticos del RAT invalidan automáticamente la EIPD aprobada, forzando revisión.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ======== PBD + IA ======== -->
  <section class="section">
    <div class="container">
      <div class="section-header--split">
        <h2 class="section__heading reveal reveal--slide-left">Protección por Diseño (PbD)<br>con scoring IA</h2>
        <p class="section__subheading reveal reveal--slide-right">
          Obligación directa del Art. 14 quater. Sub-wizard de 4 secciones con justificación
          de datos normalizada, defaults restrictivos documentados y análisis automático por
          IA en 4 dimensiones: completitud, minimización, defaults y medidas.
          Score PbD de 0 a 100 con dictamen descargable en PDF.
        </p>
      </div>
    </div>
  </section>

  <!-- ======== DASHBOARD + REPORT BUILDER ======== -->
  <section class="section section--navy">
    <div class="container">
      <div class="section-header--center">
        <span class="section__label reveal">Visibilidad ejecutiva</span>
        <h2 class="section__heading reveal reveal-delay-1">Dashboard de KPIs<br>y Report Builder</h2>
        <p class="section__subheading reveal reveal-delay-2">
          Métricas de cumplimiento en tiempo real, semáforos por módulo, alertas pendientes
          y tendencias temporales. Reportes a demanda y programados para auditorías
          internas y externas.
        </p>
      </div>

      <div class="value-grid">
        <div class="value-card reveal reveal-delay-1">
          <div class="value-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
          </div>
          <h3 class="value-card__title">Dashboard ejecutivo</h3>
          <p class="value-card__text">Vista consolidada con KPIs de cumplimiento, semáforos por módulo y snapshots diarios automáticos.</p>
        </div>
        <div class="value-card reveal reveal-delay-2">
          <div class="value-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </div>
          <h3 class="value-card__title">Report Builder</h3>
          <p class="value-card__text">Reportes consolidados: Mapa de Mandantes, Mapa de Proveedores, RAT Enriquecido. PDF, CSV y JSON.</p>
        </div>
        <div class="value-card reveal reveal-delay-3">
          <div class="value-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/><path d="M9 12l2 2 4-4"/>
            </svg>
          </div>
          <h3 class="value-card__title">Audit trail inmutable</h3>
          <p class="value-card__text">Cadena SHA-256 blockchain-lite, modelo WORM, Legal Hold para investigaciones y exportación con checksum.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ======== CTA BANNER ======== -->
  <section class="cta-banner">
    <div class="container">
      <h2 class="cta-banner__heading reveal">¿Eres DPO y necesitas herramientas profesionales?</h2>
      <p class="cta-banner__text reveal reveal-delay-1">Solicita acceso a la plataforma y conoce cada herramienta en acción.</p>
      <a href="https://www.solutoria.cl/_contacto.php" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--lg reveal reveal-delay-2">
        Solicitar Acceso DPO
        <svg class="arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
      </a>
    </div>
  </section>

  </main>

  <!--#include virtual="/includes/footer.html" -->

  <script src="/js/main.js?v=9"></script>
</body>
</html>
```

**Step 2: Commit**

```bash
git add public/plataforma-dpo.html
git commit -m "feat: add SEO landing page /plataforma-dpo for DPO audience"
```

---

### Task 4: Enrich features.html with missing modules

**Files:**
- Modify: `public/features.html`

**Context:** Currently shows 8 core modules + 2 additional (Consentimientos, Canal de Denuncias). We need to add: (1) Implementation Guide section at top, (2) Motor de Evaluación de Riesgo as standalone module, (3) Additional modules: PbD, Ciclo de Vida, Dashboard/KPIs, Asistente IA, Report Builder, Import Masivo, CMP Banner inside Consentimientos, Avisos de Privacidad. Also add "Impugnación de Decisiones Automatizadas" as a feature inside ARCOP.

**Step 1: Update page hero subtitle and meta tags**

In `public/features.html`:

- **Line 7** — Update title to include SEO keywords:
  ```
  <title>Funcionalidades y Módulos — Kulvio | Software Protección de Datos Chile</title>
  ```

- **Line 8** — Update meta description:
  ```
  <meta name="description" content="Todos los módulos de Kulvio: guía de implementación de 12 fases, RAT, EIPD, motor de riesgo automático, brechas, ARCOP, terceros, transferencias, consentimientos con CMP Banner, Protección por Diseño con IA, dashboard KPIs, asistente IA y auditoría inmutable.">
  ```

- **Line 14** — Update og:description:
  ```
  <meta property="og:description" content="Más de 38 dominios funcionales para el cumplimiento de la Ley 21.719. Guía de 12 fases, RAT, EIPD, motor de riesgo, ARCOP, terceros y auditoría inmutable.">
  ```

- **Line 18** — Update twitter:description:
  ```
  <meta name="twitter:description" content="38+ funcionalidades para cumplir la Ley 21.719: guía de 12 fases, motor de riesgo, EIPD, ARCOP, terceros y auditoría inmutable.">
  ```

- **Lines 23, 532** — Bump CSS/JS version: `?v=8` → `?v=9`

**Step 2: Add Implementation Guide section after page-hero, before modules**

Insert after line 60 (closing `</section>` of page-hero), before line 62 (`<!-- ======== MODULES MVP ========`):

```html

  <!-- ======== GUÍA DE IMPLEMENTACIÓN ======== -->
  <section class="section section--navy">
    <div class="container">
      <div class="section-header--center">
        <span class="section__label reveal">Guía paso a paso</span>
        <h2 class="section__heading reveal reveal-delay-1">12 fases de implementación<br>con progreso inteligente</h2>
        <p class="section__subheading reveal reveal-delay-2">
          Kulvio no es solo una herramienta de compliance: incluye una guía de 12 fases con
          40+ pasos concretos que acompaña a tu organización durante todo el ciclo de cumplimiento.
          22 pasos se completan automáticamente desde los datos reales de la plataforma.
        </p>
      </div>

      <div class="guide-stepper">
        <div class="guide-step reveal reveal-delay-1">
          <div class="guide-step__number">0</div>
          <div>
            <div class="guide-step__title">Configuración Inicial</div>
            <div class="guide-step__desc">Registro, perfil legal, portales, equipo y DPO</div>
          </div>
        </div>
        <div class="guide-step reveal reveal-delay-1">
          <div class="guide-step__number">1</div>
          <div>
            <div class="guide-step__title">Diagnóstico</div>
            <div class="guide-step__desc">Cuestionario que evalúa qué requisitos aplican</div>
          </div>
        </div>
        <div class="guide-step reveal reveal-delay-2">
          <div class="guide-step__number">2</div>
          <div>
            <div class="guide-step__title">RAT</div>
            <div class="guide-step__desc">Registrar actividades con flujo de aprobación</div>
          </div>
        </div>
        <div class="guide-step reveal reveal-delay-2">
          <div class="guide-step__number">3</div>
          <div>
            <div class="guide-step__title">Evaluación de Riesgo</div>
            <div class="guide-step__desc">Motor automático de 13 reglas normativas</div>
          </div>
        </div>
        <div class="guide-step reveal reveal-delay-3">
          <div class="guide-step__number">4</div>
          <div>
            <div class="guide-step__title">Seguridad y EIPD</div>
            <div class="guide-step__desc">Controles con evidencia y EIPD firmada</div>
          </div>
        </div>
        <div class="guide-step reveal reveal-delay-3">
          <div class="guide-step__number">5</div>
          <div>
            <div class="guide-step__title">Terceros</div>
            <div class="guide-step__desc">DPA digital y portal del encargado</div>
          </div>
        </div>
        <div class="guide-step reveal reveal-delay-1">
          <div class="guide-step__number">6</div>
          <div>
            <div class="guide-step__title">Consentimientos</div>
            <div class="guide-step__desc">Widget embebible y CMP banner</div>
          </div>
        </div>
        <div class="guide-step reveal reveal-delay-1">
          <div class="guide-step__number">7</div>
          <div>
            <div class="guide-step__title">ARCOP</div>
            <div class="guide-step__desc">Portal público con SLA automáticos</div>
          </div>
        </div>
        <div class="guide-step reveal reveal-delay-2">
          <div class="guide-step__number">8</div>
          <div>
            <div class="guide-step__title">Brechas</div>
            <div class="guide-step__desc">Protocolo con notificación obligatoria</div>
          </div>
        </div>
        <div class="guide-step reveal reveal-delay-2">
          <div class="guide-step__number">9</div>
          <div>
            <div class="guide-step__title">Denuncias</div>
            <div class="guide-step__desc">Canal anónimo con seguimiento</div>
          </div>
        </div>
        <div class="guide-step reveal reveal-delay-3">
          <div class="guide-step__number">10</div>
          <div>
            <div class="guide-step__title">Documentación</div>
            <div class="guide-step__desc">Wiki con 58 plantillas ISO</div>
          </div>
        </div>
        <div class="guide-step reveal reveal-delay-3">
          <div class="guide-step__number">11</div>
          <div>
            <div class="guide-step__title">Monitoreo</div>
            <div class="guide-step__desc">Dashboard KPIs y mejora continua</div>
          </div>
        </div>
      </div>
    </div>
  </section>
```

**Step 3: Add "Impugnación de Decisiones Automatizadas" feature to ARCOP card**

In the ARCOP module card (around line 325), change:
```
              6 tipos: Acceso, Rectificación, Supresión, Oposición, Portabilidad y Bloqueo
```
to:
```
              7 tipos: Acceso, Rectificación, Supresión, Oposición, Portabilidad, Bloqueo e Impugnación de Decisiones Automatizadas
```

**Step 4: Add CMP Banner feature to Consentimientos card**

In the Consentimientos module card (after the last `module-card__feature` around line 417), add:
```html
            <div class="module-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              CMP Banner para cookies con Google Consent Mode
            </div>
```

**Step 5: Add new modules to the "Módulos Adicionales" section**

After the Canal de Denuncias card (after line 451, inside the `<div class="module-grid">` of the additional modules section), add 6 new module cards:

```html

        <!-- Protección por Diseño (PbD) -->
        <div class="module-card reveal reveal--scale">
          <div class="module-card__header">
            <div class="module-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <div>
              <h3 class="module-card__title">Protección por Diseño (PbD)</h3>
              <span class="module-card__tag">Art. 14 quater</span>
            </div>
          </div>
          <p class="module-card__text">
            Evaluación de privacidad desde el diseño con sub-wizard de 4 secciones, análisis
            automático por IA con scoring en 4 dimensiones y dictamen PDF descargable.
          </p>
          <div class="module-card__features">
            <div class="module-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Score PbD de 0 a 100 con análisis IA via OpenRouter
            </div>
            <div class="module-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Justificación de datos normalizada como evidencia legal
            </div>
            <div class="module-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Workflow DRAFT → IN_REVIEW → APPROVED con firma digital
            </div>
          </div>
        </div>

        <!-- Asistente IA -->
        <div class="module-card reveal reveal--scale">
          <div class="module-card__header">
            <div class="module-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <div>
              <h3 class="module-card__title">Asistente IA</h3>
              <span class="module-card__tag module-card__tag--amber">Inteligencia Artificial</span>
            </div>
          </div>
          <p class="module-card__text">
            Generación automática de borradores de políticas, procedimientos, evaluaciones de
            impacto y documentos legales adaptados a la normativa chilena.
          </p>
          <div class="module-card__features">
            <div class="module-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Redacción de políticas de privacidad y procedimientos
            </div>
            <div class="module-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Análisis DPO automático en evaluaciones PbD
            </div>
            <div class="module-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Powered by OpenRouter con modelos de última generación
            </div>
          </div>
        </div>

        <!-- Dashboard y KPIs -->
        <div class="module-card reveal reveal--scale">
          <div class="module-card__header">
            <div class="module-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
            </div>
            <div>
              <h3 class="module-card__title">Dashboard y KPIs</h3>
              <span class="module-card__tag module-card__tag--navy">Visibilidad</span>
            </div>
          </div>
          <p class="module-card__text">
            Vista ejecutiva en tiempo real con indicadores de cumplimiento, semáforos por módulo,
            alertas pendientes, tendencias temporales y snapshots diarios automáticos.
          </p>
          <div class="module-card__features">
            <div class="module-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              KPIs de cumplimiento con semáforos por módulo
            </div>
            <div class="module-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Detección automática de actividades que requieren revisión
            </div>
            <div class="module-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Snapshots diarios de KPIs para trazabilidad temporal
            </div>
          </div>
        </div>

        <!-- Ciclo de Vida del Dato -->
        <div class="module-card reveal reveal--scale">
          <div class="module-card__header">
            <div class="module-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
            </div>
            <div>
              <h3 class="module-card__title">Ciclo de Vida del Dato</h3>
              <span class="module-card__tag">Retención y Destrucción</span>
            </div>
          </div>
          <p class="module-card__text">
            Gestión automatizada del ciclo completo desde recopilación hasta eliminación segura,
            con plazos de retención por actividad y certificados de destrucción inmutables.
          </p>
          <div class="module-card__features">
            <div class="module-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Plazos de retención configurables por actividad RAT
            </div>
            <div class="module-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Supresión diferenciada: Hard Delete, Bloqueo o Anonimización
            </div>
            <div class="module-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Certificado de Destrucción PDF inmutable
            </div>
          </div>
        </div>

        <!-- Report Builder -->
        <div class="module-card reveal reveal--scale">
          <div class="module-card__header">
            <div class="module-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
            <div>
              <h3 class="module-card__title">Report Builder</h3>
              <span class="module-card__tag module-card__tag--navy">Reportes</span>
            </div>
          </div>
          <p class="module-card__text">
            Generación de reportes a demanda y programados. Mapa de Mandantes,
            Mapa de Proveedores, RAT Enriquecido. Exportación en PDF, CSV y JSON.
          </p>
          <div class="module-card__features">
            <div class="module-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Reportes consolidados multi-módulo
            </div>
            <div class="module-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Exportación PDF, CSV y JSON con checksum
            </div>
          </div>
        </div>

        <!-- Import Masivo -->
        <div class="module-card reveal reveal--scale">
          <div class="module-card__header">
            <div class="module-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <div>
              <h3 class="module-card__title">Import Masivo</h3>
              <span class="module-card__tag module-card__tag--amber">Migración</span>
            </div>
          </div>
          <p class="module-card__text">
            Carga masiva de actividades de tratamiento y proveedores mediante CSV
            con validación inteligente, reduciendo la implementación de días a minutos.
          </p>
          <div class="module-card__features">
            <div class="module-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Validación inteligente con reporte de errores
            </div>
            <div class="module-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Templates CSV descargables para cada tipo de importación
            </div>
          </div>
        </div>
```

**Step 6: Update the "Módulos Adicionales" section heading**

Change the heading text (around line 380):
```
        <h2 class="section__heading reveal reveal-delay-1">Capacidades de expansión</h2>
```
to:
```
        <h2 class="section__heading reveal reveal-delay-1">Módulos adicionales y herramientas avanzadas</h2>
```

**Step 7: Commit**

```bash
git add public/features.html
git commit -m "feat(features): add 12-phase guide, PbD, AI assistant, dashboard, lifecycle, report builder, import"
```

---

### Task 5: Enrich index.html with SEO keywords and 12-phase section

**Files:**
- Modify: `public/index.html`

**Context:** Update hero copy to include SEO keywords, add a compact 12-phase guide section, update counters, add internal links to new landing pages.

**Step 1: Update meta tags for SEO**

- **Line 7** — Update title:
  ```
  <title>Kulvio — Software de Protección de Datos Chile | Cumplimiento Ley 21.719</title>
  ```

- **Line 8** — Update meta description:
  ```
  <meta name="description" content="Software de protección de datos personales para empresas en Chile. Guía de implementación de 12 fases, motor de riesgo automático, asistente IA, auditoría inmutable SHA-256 y más de 38 funcionalidades para cumplir la Ley 21.719 antes del 1 de diciembre de 2026.">
  ```

- **Line 14** — Update og:title:
  ```
  <meta property="og:title" content="Kulvio — Software de Protección de Datos Chile">
  ```

- **Line 15** — Update og:description:
  ```
  <meta property="og:description" content="Software de protección de datos personales para Chile. Guía de 12 fases con progreso inteligente, asistente IA, motor de riesgo automático y auditoría inmutable. Cumple la Ley 21.719.">
  ```

- **Line 19** — Update twitter:title:
  ```
  <meta name="twitter:title" content="Kulvio — Software Protección de Datos Chile">
  ```

- **Line 20** — Update twitter:description:
  ```
  <meta name="twitter:description" content="Software de protección de datos para Chile. Guía de 12 fases, asistente IA y auditoría inmutable. Cumple la Ley 21.719.">
  ```

- **Lines 25, 540** — Bump CSS/JS version: `?v=8` → `?v=9`

**Step 2: Update SoftwareApplication featureList in Schema.org**

Replace the `featureList` array (lines 78-87):
```json
        "featureList": [
          "Guía de Implementación de 12 Fases con Progreso Inteligente",
          "Registro de Actividades de Tratamiento (RAT)",
          "Motor de Evaluación de Riesgo Automático (13 reglas)",
          "Evaluación de Impacto (EIPD) con Firma Digital",
          "Gestión de Brechas de Seguridad",
          "Derechos ARCOP con Portal Público",
          "Gestión de Terceros con DPA Digital",
          "Transferencias Internacionales",
          "Gestión de Consentimientos con CMP Banner",
          "Protección por Diseño (PbD) con Scoring IA",
          "Asistente IA para Redacción de Políticas",
          "Dashboard de KPIs y Report Builder",
          "Auditoría Inmutable SHA-256",
          "Canal de Denuncias"
        ]
```

**Step 3: Update hero subtitle to include SEO keywords**

Replace lines 121-125:
```html
        <p class="hero__subtitle reveal reveal--blur reveal-delay-2">
          El software de protección de datos personales que guía a las organizaciones chilenas
          paso a paso hacia el cumplimiento de la Ley 21.719. Guía de 12 fases, motor de riesgo
          automático, asistente IA y auditoría inmutable en un solo lugar.
        </p>
```

**Step 4: Update metrics bar with new numbers**

Replace the metrics section (lines 160-182):
```html
  <!-- ======== METRICS BAR ======== -->
  <section class="metrics">
    <div class="container">
      <div class="metrics__inner">
        <div class="metrics__item reveal">
          <div class="metrics__value"><span data-count="12">12</span> Fases</div>
          <div class="metrics__label">de implementación guiada</div>
        </div>
        <div class="metrics__item reveal reveal-delay-1">
          <div class="metrics__value"><span data-count="38">38</span>+</div>
          <div class="metrics__label">dominios funcionales</div>
        </div>
        <div class="metrics__item reveal reveal-delay-2">
          <div class="metrics__value"><span data-count="58">58</span> Plantillas</div>
          <div class="metrics__label">documentales listas para usar</div>
        </div>
        <div class="metrics__item reveal reveal-delay-3">
          <div class="metrics__value">SHA-256</div>
          <div class="metrics__label">Audit trail inmutable</div>
        </div>
      </div>
    </div>
  </section>
```

**Step 5: Add 12-Phase Guide compact section after the value props**

Insert after line 295 (closing `</section>` of #value), before line 297 (`<!-- ======== MODULES PREVIEW`):

```html

  <!-- ======== GUÍA DE 12 FASES (COMPACT) ======== -->
  <section class="section section--gray">
    <div class="container">
      <div class="section-header--center">
        <span class="section__label reveal">Guía de implementación</span>
        <h2 class="section__heading reveal reveal-delay-1">De cero a cumplimiento<br>en 12 fases guiadas</h2>
        <p class="section__subheading reveal reveal-delay-2">
          Una guía viva con 40+ pasos concretos que acompaña a tu organización desde
          el diagnóstico hasta el monitoreo continuo. 22 pasos se completan automáticamente
          desde los datos reales de la plataforma.
        </p>
      </div>

      <div class="guide-stepper">
        <div class="guide-step reveal reveal-delay-1">
          <div class="guide-step__number">0</div>
          <div><div class="guide-step__title">Configuración</div></div>
        </div>
        <div class="guide-step reveal reveal-delay-1">
          <div class="guide-step__number">1</div>
          <div><div class="guide-step__title">Diagnóstico</div></div>
        </div>
        <div class="guide-step reveal reveal-delay-2">
          <div class="guide-step__number">2</div>
          <div><div class="guide-step__title">RAT</div></div>
        </div>
        <div class="guide-step reveal reveal-delay-2">
          <div class="guide-step__number">3</div>
          <div><div class="guide-step__title">Riesgo</div></div>
        </div>
        <div class="guide-step reveal reveal-delay-3">
          <div class="guide-step__number">4</div>
          <div><div class="guide-step__title">Seguridad</div></div>
        </div>
        <div class="guide-step reveal reveal-delay-3">
          <div class="guide-step__number">5</div>
          <div><div class="guide-step__title">Terceros</div></div>
        </div>
        <div class="guide-step reveal reveal-delay-1">
          <div class="guide-step__number">6</div>
          <div><div class="guide-step__title">Consentimientos</div></div>
        </div>
        <div class="guide-step reveal reveal-delay-1">
          <div class="guide-step__number">7</div>
          <div><div class="guide-step__title">ARCOP</div></div>
        </div>
        <div class="guide-step reveal reveal-delay-2">
          <div class="guide-step__number">8</div>
          <div><div class="guide-step__title">Brechas</div></div>
        </div>
        <div class="guide-step reveal reveal-delay-2">
          <div class="guide-step__number">9</div>
          <div><div class="guide-step__title">Denuncias</div></div>
        </div>
        <div class="guide-step reveal reveal-delay-3">
          <div class="guide-step__number">10</div>
          <div><div class="guide-step__title">Documentación</div></div>
        </div>
        <div class="guide-step reveal reveal-delay-3">
          <div class="guide-step__number">11</div>
          <div><div class="guide-step__title">Monitoreo</div></div>
        </div>
      </div>

      <div style="text-align: center; margin-top: 40px;">
        <a href="/software-proteccion-datos" class="btn btn--primary btn--lg reveal reveal-delay-4">
          Conocer la guía completa
          <svg class="arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </a>
      </div>
    </div>
  </section>
```

**Step 6: Commit**

```bash
git add public/index.html
git commit -m "feat(index): add SEO keywords, 12-phase guide section, updated metrics"
```

---

### Task 6: Update SEO meta tags on remaining pages

**Files:**
- Modify: `public/seguridad.html`
- Modify: `public/integraciones.html`
- Modify: `public/chile-2026.html`
- Modify: `public/precios.html`
- Modify: `public/contact.html`

**Context:** Integrate SEO keywords ("software protección datos Chile", "plataforma cumplimiento Ley 21.719") into meta tags of remaining pages. Also bump CSS/JS to ?v=9.

**Step 1: For each page, update the following**

Apply these changes to **all 5 pages**:

1. Bump `?v=8` to `?v=9` on both `styles.css` and `main.js` references
2. Add internal link to `/software-proteccion-datos` where contextually relevant (e.g., in CTAs)

Specific per-page meta tag changes:

**seguridad.html:**
- Title: `"Seguridad y Trust Center — Kulvio | Software Protección de Datos Chile"` (add keyword)
- Description: Prepend "Software de protección de datos con " before existing description

**integraciones.html:**
- Title: `"Integraciones Enterprise — Kulvio | Software Protección de Datos Chile"` (add keyword)

**chile-2026.html:**
- Title: keep as is (already good for informational intent)
- Add a link in the CTA section to `/software-proteccion-datos` as "Ver la solución"

**precios.html:**
- Title: `"Precios y Planes — Kulvio | Software Protección de Datos desde 8 UF/mes"` (add keyword)

**contact.html:**
- Bump versions only, no meta changes needed

**Step 2: Commit**

```bash
git add public/seguridad.html public/integraciones.html public/chile-2026.html public/precios.html public/contact.html
git commit -m "feat(seo): update meta tags with transactional keywords, bump asset versions"
```

---

### Task 7: Update legal pages and 404 page versions

**Files:**
- Modify: `public/legal/privacy.html`
- Modify: `public/legal/terms.html`
- Modify: `public/legal/ley-21719.html`
- Modify: `public/404.html`

**Step 1: Bump CSS/JS versions**

In each file, replace `?v=8` with `?v=9` on both the stylesheet and script references.

**Step 2: Commit**

```bash
git add public/legal/privacy.html public/legal/terms.html public/legal/ley-21719.html public/404.html
git commit -m "chore: bump asset versions to v9 on legal pages and 404"
```

---

### Task 8: Update sitemap.xml with new URLs

**Files:**
- Modify: `public/sitemap.xml`

**Step 1: Add new landing page URLs**

Insert before the closing `</urlset>` tag:

```xml
  <url>
    <loc>https://kulvio.cl/software-proteccion-datos</loc>
    <lastmod>2026-03-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://kulvio.cl/plataforma-dpo</loc>
    <lastmod>2026-03-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
```

Also update all existing `<lastmod>` dates from `2026-02-24` to `2026-03-02` (since we're modifying most pages).

**Step 2: Commit**

```bash
git add public/sitemap.xml
git commit -m "feat(seo): add new landing pages to sitemap, update lastmod dates"
```

---

### Task 9: Add internal linking from chile-2026 and other pages

**Files:**
- Modify: `public/chile-2026.html`
- Modify: `public/features.html` (if not already done)

**Context:** Cross-link between pages to strengthen internal linking structure for SEO.

**Step 1: In chile-2026.html CTA section**

Add a secondary CTA linking to the software landing page. Find the existing CTA banner section and add below the primary button:

```html
        <a href="/software-proteccion-datos" class="btn btn--outline-white btn--lg reveal reveal-delay-3">
          Ver cómo Kulvio te ayuda a cumplir
          <svg class="arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </a>
```

**Step 2: Commit**

```bash
git add public/chile-2026.html
git commit -m "feat(seo): add internal cross-links to landing pages"
```

---

### Task 10: Final verification and deploy

**Step 1: Verify all HTML files have consistent v=9 references**

Run:
```bash
grep -r "?v=8" public/ --include="*.html"
```
Expected: No results (all should be v=9)

Run:
```bash
grep -r "?v=9" public/ --include="*.html" | wc -l
```
Expected: Count should match (number of pages * 2, for css + js)

**Step 2: Verify new pages exist**

Run:
```bash
ls -la public/software-proteccion-datos.html public/plataforma-dpo.html
```
Expected: Both files exist

**Step 3: Verify sitemap has new URLs**

Run:
```bash
grep -c "<url>" public/sitemap.xml
```
Expected: 12 (was 10, added 2)

**Step 4: Deploy**

Run:
```bash
git push origin main
```

This triggers the auto-deploy via GitHub Actions → webhook → deploy.sh.

**Step 5: Verify live pages**

After deploy completes (1-2 minutes), verify:
- `https://kulvio.cl/software-proteccion-datos` loads correctly
- `https://kulvio.cl/plataforma-dpo` loads correctly
- `https://kulvio.cl/features` shows new modules
- `https://kulvio.cl/` shows updated hero and metrics

---

## Notes for Implementer

- **Content source:** All product capability descriptions come from `/home/azureuser/repos/kulvio/docs/Funcionalidades_Implementadas.md`. When in doubt about a feature description, consult this file.
- **12-Phase Guide:** The detailed phase descriptions were provided by the product owner during the brainstorming session. They are captured in the design doc at `docs/plans/2026-03-02-site-enrichment-seo-design.md`.
- **No JS changes needed:** All new components use existing CSS animation patterns (`.reveal`, `.visible`, counter animation) that are already handled by `main.js`. No new JS is needed.
- **nginx routing:** Clean URLs work automatically via `try_files $uri $uri.html $uri/` — no nginx changes needed for the new pages.
- **Asset paths:** New landing pages are at root level in `public/`, so they use absolute paths for assets: `/css/styles.css`, `/js/main.js`, `/img/favicon.svg`.
