# Phase 1: Legal Risk Corrections — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix normative legal errors, add company identification, correct plan inconsistency, and update badge wording across kulvio.cl.

**Architecture:** Pure HTML text edits across 6 static files. No CSS, JS, or structural changes. No new files created.

**Tech Stack:** Static HTML, nginx SSI. Verification via grep.

**Spec:** `docs/superpowers/specs/2026-03-10-legal-phase1-corrections-design.md`

---

## Chunk 1: Normative Errors + Company Identification

### Task 1: Fix normative errors in ley-21719.html

**Files:**
- Modify: `public/legal/ley-21719.html:74` (registry name)
- Modify: `public/legal/ley-21719.html:100` (ARCOP days)
- Modify: `public/legal/ley-21719.html:119` (DPO faculty)

- [ ] **Step 1: Fix registry name (line 74)**

Replace:
```html
<li>Llevar un registro público de sanciones y de bases de datos.</li>
```
With:
```html
<li>Llevar el <strong>Registro Nacional de Sanciones y Cumplimiento</strong>.</li>
```

- [ ] **Step 2: Fix ARCOP response time (line 100)**

Replace:
```html
<p>El responsable debe responder a estas solicitudes en un plazo máximo de <strong>30 días hábiles</strong>.</p>
```
With:
```html
<p>El responsable debe pronunciarse dentro de <strong>30 días corridos</strong> desde la recepción de la solicitud, prorrogables una sola vez por otros 30 días corridos.</p>
```

- [ ] **Step 3: Fix DPO obligation wording (line 119)**

Replace:
```html
<li><strong>Delegado de protección de datos (DPO):</strong> designar un delegado cuando se traten datos sensibles a gran escala o se realice monitoreo sistemático.</li>
```
With:
```html
<li><strong>Delegado de protección de datos (DPO):</strong> la ley <strong>permite</strong> designarlo (Art. 50). Su adopción puede fortalecer el modelo de cumplimiento, la interlocución con la autoridad y constituir un atenuante de responsabilidad.</li>
```

- [ ] **Step 4: Verify no orphaned errors**

Run:
```bash
grep -rn "días hábiles" public/legal/ley-21719.html
grep -rn "registro público de sanciones" public/legal/ley-21719.html
```
Expected: no matches.

- [ ] **Step 5: Commit**

```bash
git add public/legal/ley-21719.html
git commit -m "fix: correct normative errors in Ley 21.719 summary

- ARCOP response: 30 días hábiles → 30 días corridos
- DPO: mandatory → facultative (Art. 50)
- Registry: registro público → Registro Nacional de Sanciones y Cumplimiento"
```

---

### Task 2: Add company identification

**Files:**
- Modify: `public/legal/terms.html:63` (provider section)
- Modify: `public/contact.html:99` (location)
- Modify: `public/includes/footer.html:14` (company line)
- Modify: `public/index.html:39-43` (JSON-LD schema)

- [ ] **Step 1: Update terms.html provider section (line 63)**

Replace:
```html
<p>La plataforma Kulvio es operada por <strong>Solutoria SpA</strong>, con domicilio en Providencia, Santiago, Chile. Contacto: <a href="mailto:contacto@kulvio.com">contacto@kulvio.com</a>.</p>
```
With:
```html
<p>La plataforma Kulvio es operada por <strong>Solutoria SpA</strong>, RUT 76.471.965-4, con domicilio en Antonio Bellet 193, Oficina 1306, Providencia, Santiago, Chile. Teléfono: +562 3250 1909. Contacto: <a href="mailto:contacto@kulvio.com">contacto@kulvio.com</a>.</p>
```

- [ ] **Step 2: Update contact.html location (line 99)**

Replace:
```html
<p class="contact-info__item-value">Providencia, Santiago, Chile</p>
```
With:
```html
<p class="contact-info__item-value">Antonio Bellet 193, Of. 1306, Providencia, Santiago</p>
```

- [ ] **Step 3: Update footer company line (line 14)**

Replace:
```html
<p class="footer-expanded__company">Una solución de <a href="https://www.solutoria.cl" target="_blank" rel="noopener noreferrer">Solutoria SpA</a></p>
```
With:
```html
<p class="footer-expanded__company">Una solución de <a href="https://www.solutoria.cl" target="_blank" rel="noopener noreferrer">Solutoria SpA</a> · RUT 76.471.965-4</p>
```

- [ ] **Step 4: Update JSON-LD schema in index.html (lines 39-43)**

Replace:
```json
"address": {
  "@type": "PostalAddress",
  "addressLocality": "Providencia",
  "addressRegion": "Santiago",
  "addressCountry": "CL"
},
```
With:
```json
"address": {
  "@type": "PostalAddress",
  "streetAddress": "Antonio Bellet 193, Oficina 1306",
  "addressLocality": "Providencia",
  "addressRegion": "Santiago",
  "postalCode": "7500000",
  "addressCountry": "CL"
},
"telephone": "+56232501909",
"taxID": "76.471.965-4",
```

- [ ] **Step 5: Commit**

```bash
git add public/legal/terms.html public/contact.html public/includes/footer.html public/index.html
git commit -m "fix: add complete company identification (RUT, address, phone)

Add Solutoria SpA RUT 76.471.965-4, full address (Antonio Bellet 193,
Of. 1306, Providencia), and phone to terms, contact page, footer,
and JSON-LD schema."
```

---

### Task 3: Fix plan inconsistency in terms

**Files:**
- Modify: `public/legal/terms.html:83`

- [ ] **Step 1: Add missing Business plan (line 83)**

Replace:
```html
<p>Los servicios se ofrecen bajo planes de suscripción (Starter, Growth, Enterprise). Los precios se expresan en UF y se facturan en pesos chilenos. Los detalles de cada plan están disponibles en la página de <a href="/precios">precios</a>.</p>
```
With:
```html
<p>Los servicios se ofrecen bajo planes de suscripción (Starter, Growth, Business, Enterprise). Los precios se expresan en UF y se facturan en pesos chilenos. Los detalles de cada plan están disponibles en la página de <a href="/precios">precios</a>.</p>
```

- [ ] **Step 2: Commit**

```bash
git add public/legal/terms.html
git commit -m "fix: add missing Business plan to terms of service

Terms listed 3 plans (Starter, Growth, Enterprise) but pricing page
has 4. Added Business to match."
```

---

## Chunk 2: Badge Corrections

### Task 4: Correct ISO 27001 badges

**Files:**
- Modify: `public/index.html:610` (trust badge in trust section)
- Modify: `public/seguridad.html:14` (meta description)
- Modify: `public/seguridad.html:216` (compliance badge label)
- Modify: `public/seguridad.html:225` (compliance badge label — second instance)
- Modify: `public/software-proteccion-datos.html:390` (value card title)
- Modify: `public/software-proteccion-datos.html:391` (value card text)

- [ ] **Step 1: Fix index.html trust badge (line 610)**

Replace:
```
          ISO 27001
```
(in the trust-badge div after the lock SVG icon, around line 610)

With:
```
          Alineado a controles ISO 27001
```

- [ ] **Step 2: Fix seguridad.html meta description (line 14)**

Replace:
```html
<meta property="og:description" content="Cifrado AES-256, SSO enterprise, RBAC granular, audit trail inmutable y cumplimiento ISO 27001. Conoce la arquitectura de seguridad de Kulvio.">
```
With:
```html
<meta property="og:description" content="Cifrado AES-256, SSO enterprise, RBAC granular, audit trail inmutable y controles alineados a ISO 27001. Conoce la arquitectura de seguridad de Kulvio.">
```

- [ ] **Step 3: Fix seguridad.html first compliance badge (line 216)**

Replace:
```html
<span class="compliance-badge__label">ISO 27001</span>
          <span class="compliance-badge__status">Consultoría activa</span>
```
With:
```html
<span class="compliance-badge__label">Alineado a ISO 27001</span>
          <span class="compliance-badge__status">Consultoría activa</span>
```

- [ ] **Step 4: Fix seguridad.html second compliance badge (line 225)**

Replace:
```html
<span class="compliance-badge__label">ISO 27001</span>
          <span class="compliance-badge__status">Roadmap</span>
```
With:
```html
<span class="compliance-badge__label">Certificación ISO 27001</span>
          <span class="compliance-badge__status">Roadmap</span>
```

- [ ] **Step 5: Fix software-proteccion-datos.html value card (lines 390-391)**

Replace:
```html
<h3 class="value-card__title">ISO 27001 en proceso</h3>
          <p class="value-card__text">Consultoría activa para certificación ISO 27001. Compatible con RGPD.</p>
```
With:
```html
<h3 class="value-card__title">Alineado a controles ISO 27001</h3>
          <p class="value-card__text">Experiencia en implementación ISO 27001. Alineado con principios RGPD.</p>
```

- [ ] **Step 6: Commit ISO 27001 badge changes**

```bash
git add public/index.html public/seguridad.html public/software-proteccion-datos.html
git commit -m "fix: correct ISO 27001 badge wording across all pages

Replace bare 'ISO 27001' badges with 'Alineado a controles ISO 27001'
to avoid implying certification. Keep 'Certificación ISO 27001: Roadmap'
where roadmap status is shown."
```

---

### Task 5: Correct RGPD badges

**Files:**
- Modify: `public/index.html:614` (trust badge in trust section)
- Modify: `public/index.html:417` — actually in `public/software-proteccion-datos.html:417`
- Modify: `public/seguridad.html:234-235` (compliance badge)
- Modify: `public/software-proteccion-datos.html:417` (trust badge)

Note: `public/software-proteccion-datos.html:391` already handled in Task 4 Step 5.

- [ ] **Step 1: Fix index.html RGPD trust badge (line 614)**

Replace:
```
          RGPD Compatible
```
(in the trust-badge div after the checkmark SVG, around line 614)

With:
```
          Alineado con principios RGPD
```

- [ ] **Step 2: Fix seguridad.html RGPD compliance badge (lines 234-235)**

Replace:
```html
<span class="compliance-badge__label">RGPD</span>
          <span class="compliance-badge__status">Compatible</span>
```
With:
```html
<span class="compliance-badge__label">RGPD</span>
          <span class="compliance-badge__status">Alineado</span>
```

- [ ] **Step 3: Fix software-proteccion-datos.html RGPD trust badge (line 417)**

Replace:
```
          RGPD Compatible
```
With:
```
          Alineado con principios RGPD
```

- [ ] **Step 4: Verify no orphaned "RGPD Compatible" anywhere**

Run:
```bash
grep -rn "RGPD Compatible" public/
grep -rn "Compatible con RGPD" public/
```
Expected: no matches.

- [ ] **Step 5: Commit RGPD badge changes**

```bash
git add public/index.html public/seguridad.html public/software-proteccion-datos.html
git commit -m "fix: correct RGPD badge wording across all pages

Replace 'RGPD Compatible' with 'Alineado con principios RGPD'
to avoid implying formal compatibility assessment."
```

---

## Chunk 3: Verification

### Task 6: Final verification sweep

- [ ] **Step 1: Grep for all corrected terms to confirm no orphans**

```bash
grep -rn "días hábiles" public/legal/
grep -rn "registro público de sanciones" public/
grep -rn "RGPD Compatible" public/
grep -rn "Compatible con RGPD" public/
```
Expected: zero matches for all four.

Note: "24 horas hábiles" in `contact.html` and `precios.html` is intentional (support SLA, not legal requirement).

- [ ] **Step 2: Confirm company identification is present**

```bash
grep -rn "76.471.965" public/
```
Expected: matches in `terms.html`, `footer.html`, `index.html` (JSON-LD).

- [ ] **Step 3: Confirm plan listing is correct**

```bash
grep -n "Starter, Growth" public/legal/terms.html
```
Expected: "Starter, Growth, Business, Enterprise"
