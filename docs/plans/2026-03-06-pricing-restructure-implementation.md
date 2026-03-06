# Pricing Restructure + Competitive Positioning Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restructure pricing from 3 to 4 tiers (Starter 8 UF / Growth 32 UF / Business 55 UF / Enterprise custom), add competitive comparison section, remove pricing calculator, and update all related pages.

**Architecture:** Pure static site changes across 4 files. No build tools. CSS/HTML/JS only. nginx SSI for shared partials. Cache-bust version bump from v=10 to v=11.

**Tech Stack:** HTML, CSS, vanilla JS. No dependencies.

---

### Task 1: Remove Pricing Calculator CSS

**Files:**
- Modify: `public/css/styles.css:1892-2101`

**Step 1: Delete lines 1892-2101 in styles.css**

Remove the entire `.pricing-calc` block (lines 1892 through 2101 inclusive). This covers:
- `.pricing-calc` through `.pricing-calc__cta`
- The `@media (min-width: 769px)` block for `.pricing-calc` at lines 1928-1931

**Step 2: Verify no orphan references**

Search for `pricing-calc` in CSS to confirm all styles are gone.

**Step 3: Commit**

```bash
git add public/css/styles.css
git commit -m "style: remove pricing calculator CSS"
```

---

### Task 2: Update Pricing Grid CSS for 4 Columns + Add Comparison Section Styles

**Files:**
- Modify: `public/css/styles.css:1715-1724` (pricing-grid)
- Modify: `public/css/styles.css:2703-2710` (plans-teaser) — line numbers shifted after Task 1 deletion
- Add new styles after pricing-addon section

**Step 1: Update `.pricing-grid` to 4 columns**

Replace the pricing-grid block (lines 1715-1724) with:

```css
.pricing-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 64px;
}

@media (min-width: 640px) {
  .pricing-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 960px) {
  .pricing-grid { grid-template-columns: repeat(4, 1fr); }
}
```

**Step 2: Reduce pricing card padding for 4-col fit**

After the existing `.pricing-card` block, add a media query. Find `.pricing-card` (around line 1726 after Task 1) and after the `.pricing-card .btn` rule add:

```css
@media (min-width: 960px) {
  .pricing-card { padding: 32px 24px; }
}
```

**Step 3: Update `.plans-teaser` to 4 columns**

Find the `.plans-teaser` media query `repeat(3, 1fr)` and replace with:

```css
@media (min-width: 640px) {
  .plans-teaser { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 960px) {
  .plans-teaser { grid-template-columns: repeat(4, 1fr); }
}
```

Replace the existing single `@media (min-width: 768px)` block.

**Step 4: Add competitive comparison section styles**

Insert these styles right before the `/* Pricing FAQ */` comment (which follows where pricing-calc used to be):

```css
/* Pricing Comparison */
.pricing-comparison {
  margin-top: 80px;
  margin-bottom: 80px;
}

.pricing-comparison__header {
  text-align: center;
  margin-bottom: 48px;
}

.pricing-comparison__title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: var(--ink);
  margin-bottom: 12px;
}

.pricing-comparison__subtitle {
  color: var(--body);
  font-size: 0.95rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.pricing-comparison__table {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pricing-comparison__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: var(--surface);
  border: 1px solid var(--surface-border);
  border-radius: var(--radius);
  gap: 16px;
}

.pricing-comparison__row--highlight {
  border-color: var(--teal);
  background: var(--teal-muted);
  box-shadow: 0 0 0 1px var(--teal);
}

.pricing-comparison__category {
  font-size: 0.9rem;
  color: var(--body);
  font-weight: 500;
  flex: 1;
}

.pricing-comparison__row--highlight .pricing-comparison__category {
  color: var(--ink);
  font-weight: 700;
}

.pricing-comparison__price-range {
  font-family: var(--font);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--ink);
  white-space: nowrap;
}

.pricing-comparison__row--highlight .pricing-comparison__price-range {
  color: var(--teal);
}

.pricing-comparison__scope {
  font-size: 0.8rem;
  color: var(--body-light);
  margin-top: 2px;
}

.pricing-comparison__row--highlight .pricing-comparison__scope {
  color: var(--ink-secondary);
}

.pricing-comparison__note {
  text-align: center;
  font-size: 0.82rem;
  color: var(--body-light);
  margin-top: 16px;
  line-height: 1.6;
}
```

**Step 5: Commit**

```bash
git add public/css/styles.css
git commit -m "style: 4-column pricing grid, plans teaser, comparison section"
```

---

### Task 3: Remove Pricing Calculator JS

**Files:**
- Modify: `public/js/main.js:122-218`

**Step 1: Delete lines 122-218 in main.js**

Remove the entire `// --- Pricing calculator ---` block. This includes:
- `var calcEl = document.getElementById('pricing-calc');`
- `STARTER`, `GROWTH`, `GROWTH_VOLUME` constants
- `calculatePriceByUsers()` function
- `formatUF()` function
- `updateCalc()` function
- All slider/button event listeners
- The `if (calcEl) { ... }` wrapper

Leave the `// --- Contact form ---` block that follows intact.

**Step 2: Verify remaining JS is clean**

Confirm the file still has the IIFE wrapper `(function () { ... })();` with contact form as the last section.

**Step 3: Commit**

```bash
git add public/js/main.js
git commit -m "feat: remove pricing calculator JS"
```

---

### Task 4: Rebuild precios.html — Pricing Cards (4 tiers)

**Files:**
- Modify: `public/precios.html:7` (title)
- Modify: `public/precios.html:8` (meta description)
- Modify: `public/precios.html:13-14` (OG tags)
- Modify: `public/precios.html:17-18` (Twitter tags)
- Modify: `public/precios.html:99-108` (page hero subtitle)
- Modify: `public/precios.html:110-355` (pricing cards section + calculator removal)

**Step 1: Update meta tags**

Update `<title>` (line 7):
```html
<title>Precios y Planes — Kulvio | Software Protección de Datos | Desde 8 UF/mes</title>
```

Update `<meta name="description">` (line 8):
```html
<meta name="description" content="Planes Kulvio desde 8 UF/mes. Starter, Growth, Business y Enterprise para el cumplimiento de la Ley 21.719. Hasta 70% más accesible que alternativas globales. Solicita tu demo gratuita.">
```

Update OG title (line 13):
```html
<meta property="og:title" content="Precios y Planes — Kulvio | Desde 8 UF/mes">
```

Update OG description (line 14):
```html
<meta property="og:description" content="Planes desde 8 UF/mes para el cumplimiento de la Ley 21.719. Starter, Growth, Business y Enterprise. Hasta 70% más accesible que alternativas globales.">
```

Update Twitter description (line 18):
```html
<meta name="twitter:description" content="Planes desde 8 UF/mes para cumplir la Ley 21.719. Starter, Growth, Business y Enterprise.">
```

**Step 2: Replace all 3 pricing cards + remove calculator with 4 new cards**

Replace lines 110-355 (from `<!-- ======== PRICING CARDS ======== -->` through the closing `</div>` of pricing-calc) with the following. This removes the calculator HTML entirely and replaces the 3 cards with 4:

```html
  <!-- ======== PRICING CARDS ======== -->
  <section class="section">
    <div class="container">
      <div class="pricing-grid">

        <!-- Starter -->
        <div class="pricing-card reveal reveal--scale">
          <h3 class="pricing-card__name">Starter</h3>
          <p class="pricing-card__desc">Para empresas iniciando su proceso de cumplimiento.</p>
          <p class="pricing-card__price">8 UF<span style="font-size: 1rem; color: var(--body-light);">/mes</span></p>
          <p class="pricing-card__price-note">Hasta 3 usuarios incluidos</p>
          <div class="pricing-card__divider"></div>
          <ul class="pricing-card__features">
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Diagnóstico de brechas (gap analysis)
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Registro de Actividades (RAT)
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Evaluación de Riesgo básica
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Derechos ARCOP (portal público + gestión)
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Auditoría inmutable (SHA-256)
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Exportación PDF / CSV
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Soporte por email + documentación
            </li>
          </ul>
          <a href="https://www.solutoria.cl/_contacto.php" target="_blank" rel="noopener noreferrer" class="btn btn--secondary btn--lg btn--block">Solicitar Demo</a>
        </div>

        <!-- Growth -->
        <div class="pricing-card reveal reveal--scale reveal-delay-1">
          <h3 class="pricing-card__name">Growth</h3>
          <p class="pricing-card__desc">Para empresas que necesitan cumplimiento integral.</p>
          <p class="pricing-card__price">32 UF<span style="font-size: 1rem; color: var(--body-light);">/mes</span></p>
          <p class="pricing-card__price-note">Hasta 10 usuarios incluidos</p>
          <div class="pricing-card__divider"></div>
          <ul class="pricing-card__features">
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Todo lo del plan Starter
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              EIPD completa con wizard
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Gestión de Terceros y Encargados
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Portal del Encargado (acceso externo)
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Gestión de Consentimientos + widget embebible
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Canal de Denuncias (anónimo + nominado)
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Gestión de Brechas de Seguridad
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              4 roles configurables
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Notificaciones automáticas con reintentos
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Soporte prioritario (24 horas hábiles)
            </li>
          </ul>
          <a href="https://www.solutoria.cl/_contacto.php" target="_blank" rel="noopener noreferrer" class="btn btn--secondary btn--lg btn--block">Solicitar Demo</a>
        </div>

        <!-- Business (popular) -->
        <div class="pricing-card pricing-card--popular reveal reveal--scale reveal-delay-2">
          <h3 class="pricing-card__name">Business</h3>
          <p class="pricing-card__desc">Para empresas con necesidades avanzadas de compliance.</p>
          <p class="pricing-card__price">55 UF<span style="font-size: 1rem; color: var(--body-light);">/mes</span></p>
          <p class="pricing-card__price-note">Hasta 25 usuarios incluidos</p>
          <div class="pricing-card__divider"></div>
          <ul class="pricing-card__features">
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Todo lo del plan Growth
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Transferencias Internacionales
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Repositorio documental (wiki)
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              58 plantillas documentales predefinidas
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Políticas y Avisos de Privacidad
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              API REST básica + Webhooks
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Exportación PDF / CSV / JSON
            </li>
          </ul>
          <a href="https://www.solutoria.cl/_contacto.php" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--lg btn--block">Solicitar Demo</a>
        </div>

        <!-- Enterprise -->
        <div class="pricing-card reveal reveal--scale reveal-delay-3">
          <h3 class="pricing-card__name">Enterprise</h3>
          <p class="pricing-card__desc">Para grandes organizaciones, holdings y grupos empresariales.</p>
          <p class="pricing-card__price">Personalizado</p>
          <p class="pricing-card__price-note">Usuarios y filiales ilimitados</p>
          <div class="pricing-card__divider"></div>
          <ul class="pricing-card__features">
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Todo lo del plan Business
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Controladores Externos / Mandantes
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Instancia dedicada (tenant aislado)
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              SSO (SAML 2.0 / OpenID Connect) + SCIM
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              API REST + OAuth 2.0 completa
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Exportación SIEM (logs de auditoría)
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Multi-filial / multi-entidad
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Residencia de datos (Chile / región)
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              SLA personalizado (hasta 99,95%)
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Customer Success Manager dedicado
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Onboarding white-glove + capacitación
            </li>
            <li class="pricing-card__feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Revisiones ejecutivas trimestrales
            </li>
          </ul>
          <a href="https://www.solutoria.cl/_contacto.php" target="_blank" rel="noopener noreferrer" class="btn btn--navy btn--lg btn--block">Contactar Ventas</a>
        </div>

      </div>
```

Note: Keep the closing `</div>` for container and `</section>` tags from the original, which continue into the add-ons section.

**Step 3: Commit**

```bash
git add public/precios.html
git commit -m "feat: restructure pricing to 4 tiers (8/32/55/custom UF)"
```

---

### Task 5: Add Competitive Comparison Section to precios.html

**Files:**
- Modify: `public/precios.html` — insert after pricing cards grid `</div>`, before the add-ons section header

**Step 1: Insert comparison section**

After the closing `</div>` of `.pricing-grid` and before the `<!-- Add-ons -->` section header `<div class="section-header--center">`, insert:

```html
      <!-- Competitive Comparison -->
      <div class="pricing-comparison reveal">
        <div class="pricing-comparison__header">
          <h2 class="pricing-comparison__title">Hasta 70% más accesible que alternativas globales</h2>
          <p class="pricing-comparison__subtitle">Kulvio ofrece compliance integral a una fracción del costo de plataformas internacionales, con especialización en la Ley 21.719.</p>
        </div>
        <div class="pricing-comparison__table">
          <div class="pricing-comparison__row">
            <div>
              <div class="pricing-comparison__category">Plataformas enterprise</div>
              <div class="pricing-comparison__scope">Privacy suite integral con módulos avanzados</div>
            </div>
            <div class="pricing-comparison__price-range">USD $40.000 – $150.000+/año</div>
          </div>
          <div class="pricing-comparison__row">
            <div>
              <div class="pricing-comparison__category">Plataformas mid-market</div>
              <div class="pricing-comparison__scope">Compliance modular con integraciones</div>
            </div>
            <div class="pricing-comparison__price-range">USD $20.000 – $90.000/año</div>
          </div>
          <div class="pricing-comparison__row">
            <div>
              <div class="pricing-comparison__category">Consent management</div>
              <div class="pricing-comparison__scope">Solo gestión de consentimientos y cookies</div>
            </div>
            <div class="pricing-comparison__price-range">USD $1.000 – $10.000/año</div>
          </div>
          <div class="pricing-comparison__row pricing-comparison__row--highlight">
            <div>
              <div class="pricing-comparison__category">Kulvio</div>
              <div class="pricing-comparison__scope">Compliance integral Ley 21.719 — no solo consent</div>
            </div>
            <div class="pricing-comparison__price-range">Desde ~USD $3.600/año</div>
          </div>
        </div>
        <p class="pricing-comparison__note">Fuente: datos públicos de transacciones y benchmarks de mercado global de privacy compliance (2025). Los rangos representan contratos anuales medianos reportados.</p>
      </div>
```

**Step 2: Commit**

```bash
git add public/precios.html
git commit -m "feat: add competitive comparison section to pricing page"
```

---

### Task 6: Add 2 New FAQs to precios.html

**Files:**
- Modify: `public/precios.html` — FAQ section (the `.faq-list` div)
- Modify: `public/precios.html` — JSON-LD FAQPage schema in `<head>`

**Step 1: Add 2 new FAQ items to the HTML**

After the last `.faq-item` (the "Qué pasa con mis datos si cancelo" question), add:

```html
        <div class="faq-item reveal">
          <button class="faq-question">
            ¿Por qué Kulvio es más accesible que alternativas globales?
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="faq-answer">
            <div class="faq-answer__inner">Las plataformas globales de privacy compliance operan con contratos opacos de cinco y seis cifras anuales, modelos de cobro que escalan por tráfico, dominios o conectores, y renovaciones con aumentos de hasta 80%. Kulvio fue construido específicamente para el mercado chileno y la Ley 21.719, sin la estructura de costos de una multinacional. Eso nos permite ofrecer compliance integral — no solo consent management — a precios 70% a 95% inferiores, con cobro predecible en UF y sin sorpresas en la renovación.</div>
          </div>
        </div>
        <div class="faq-item reveal reveal-delay-1">
          <button class="faq-question">
            ¿Cuál es la diferencia entre Growth, Business y Enterprise?
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="faq-answer">
            <div class="faq-answer__inner"><strong>Growth</strong> (32 UF/mes, 10 usuarios) cubre el cumplimiento operativo: EIPD, gestión de terceros, brechas, consentimientos, canal de denuncias y soporte prioritario. <strong>Business</strong> (55 UF/mes, 25 usuarios) agrega transferencias internacionales, repositorio documental con 58 plantillas, políticas de privacidad y API REST con webhooks. <strong>Enterprise</strong> (personalizado, usuarios ilimitados) incluye tenant aislado, SSO/SCIM, multi-filial, residencia de datos, SLA hasta 99,95% y Customer Success Manager dedicado.</div>
          </div>
        </div>
```

**Step 2: Add new FAQ entries to the JSON-LD schema**

In the `<head>` section, find the `"mainEntity"` array in the FAQPage schema. Add these 2 entries to the end of the array (before the closing `]`):

```json
          ,
          {
            "@type": "Question",
            "name": "¿Por qué Kulvio es más accesible que alternativas globales?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Las plataformas globales de privacy compliance operan con contratos opacos de cinco y seis cifras anuales, modelos de cobro que escalan por tráfico, dominios o conectores, y renovaciones con aumentos de hasta 80%. Kulvio fue construido específicamente para el mercado chileno y la Ley 21.719, sin la estructura de costos de una multinacional. Eso nos permite ofrecer compliance integral a precios 70% a 95% inferiores, con cobro predecible en UF y sin sorpresas en la renovación."
            }
          },
          {
            "@type": "Question",
            "name": "¿Cuál es la diferencia entre Growth, Business y Enterprise?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Growth (32 UF/mes, 10 usuarios) cubre el cumplimiento operativo: EIPD, gestión de terceros, brechas, consentimientos, canal de denuncias y soporte prioritario. Business (55 UF/mes, 25 usuarios) agrega transferencias internacionales, repositorio documental con 58 plantillas, políticas de privacidad y API REST con webhooks. Enterprise (personalizado, usuarios ilimitados) incluye tenant aislado, SSO/SCIM, multi-filial, residencia de datos, SLA hasta 99,95% y Customer Success Manager dedicado."
            }
          }
```

**Step 3: Commit**

```bash
git add public/precios.html
git commit -m "feat: add competitive and tier comparison FAQs"
```

---

### Task 7: Update Homepage Plans Teaser (4 cards)

**Files:**
- Modify: `public/index.html:531-547` (plans-teaser div)

**Step 1: Replace plans teaser with 4 cards**

Replace the `.plans-teaser` div (lines 531-547) with:

```html
      <div class="plans-teaser">
        <div class="plans-teaser__card reveal reveal-delay-1">
          <h3 class="plans-teaser__name">Starter</h3>
          <p class="plans-teaser__desc">Para organizaciones que inician su proceso de adecuación a la ley.</p>
          <p class="plans-teaser__price">Desde 8 UF/mes</p>
        </div>
        <div class="plans-teaser__card reveal reveal-delay-2">
          <h3 class="plans-teaser__name">Growth</h3>
          <p class="plans-teaser__desc">Cumplimiento integral con EIPD, terceros, brechas y consentimientos.</p>
          <p class="plans-teaser__price">Desde 32 UF/mes</p>
        </div>
        <div class="plans-teaser__card plans-teaser__card--highlight reveal reveal-delay-3">
          <h3 class="plans-teaser__name">Business</h3>
          <p class="plans-teaser__desc">Transferencias, API, repositorio documental y 58 plantillas.</p>
          <p class="plans-teaser__price">Desde 55 UF/mes</p>
        </div>
        <div class="plans-teaser__card reveal reveal-delay-4">
          <h3 class="plans-teaser__name">Enterprise</h3>
          <p class="plans-teaser__desc">Tenant dedicado, SSO, API, multi-filial y soporte con CSM asignado.</p>
          <p class="plans-teaser__price">Personalizado</p>
        </div>
      </div>
```

**Step 2: Update AggregateOffer schema**

Find the `AggregateOffer` block in the JSON-LD (around line 71-76). Update:

```json
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "CLF",
            "lowPrice": "8",
            "highPrice": "55",
            "offerCount": "4"
          },
```

**Step 3: Commit**

```bash
git add public/index.html
git commit -m "feat: update homepage plans teaser to 4 tiers"
```

---

### Task 8: Bump Cache Version + Final Verification

**Files:**
- Modify: `public/precios.html` — `?v=10` to `?v=11` for CSS and JS links
- Modify: `public/index.html` — `?v=10` to `?v=11` for CSS and JS links

**Step 1: Bump version strings**

In both `precios.html` and `index.html`, find all `?v=10` and replace with `?v=11`:
- `css/styles.css?v=10` → `css/styles.css?v=11`
- `js/main.js?v=10` → `js/main.js?v=11`

**Step 2: Check all other pages for version bump**

Search all HTML files for `?v=10` and update to `?v=11`:

```bash
grep -rl "?v=10" public/ --include="*.html"
```

Update any files found.

**Step 3: Visual verification**

Deploy locally or check via Tailscale at `http://vsserver:8000`:
- `/precios` shows 4 pricing cards in a row on desktop, 2x2 on mobile
- Business card has "Más popular" badge
- Competitive comparison section visible between cards and add-ons
- Calculator is gone
- 7 FAQ items total (5 original + 2 new)
- Homepage `/` shows 4 plan teaser cards
- No JS console errors
- All links work

**Step 4: Final commit**

```bash
git add -A
git commit -m "chore: bump asset version to v=11"
```

---

## Task Summary

| Task | Description | Files |
|------|------------|-------|
| 1 | Remove pricing calculator CSS | styles.css |
| 2 | 4-column grids + comparison styles | styles.css |
| 3 | Remove pricing calculator JS | main.js |
| 4 | 4 pricing cards on precios.html | precios.html |
| 5 | Competitive comparison section | precios.html |
| 6 | 2 new FAQs + schema | precios.html |
| 7 | Homepage 4-card teaser + schema | index.html |
| 8 | Cache version bump + verification | all HTML files |
