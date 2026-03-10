# Phase 1: Legal Risk Corrections — Design Spec

**Date:** 2026-03-10
**Scope:** Normative error fixes, company identification, plan inconsistency, badge corrections
**Files affected:** 6 HTML files (no CSS/JS changes)

## 1. Normative Error Fixes

### 1a. ARCOP Response Time (ley-21719.html:100)

- **Current:** "El responsable debe responder a estas solicitudes en un plazo máximo de **30 días hábiles**."
- **New:** "El responsable debe pronunciarse dentro de **30 días corridos** desde la recepción de la solicitud, prorrogables una sola vez por otros 30 días corridos."
- **Rationale:** The law specifies calendar days (corridos), not business days (hábiles). This error could propagate to client SLA configurations.

**Out of scope:** "24 horas hábiles" in contact.html and precios.html refers to Kulvio's support SLA, not a legal requirement.

### 1b. DPO — Facultative, Not Mandatory (ley-21719.html:119)

- **Current:** "Delegado de protección de datos (DPO): designar un delegado cuando se traten datos sensibles a gran escala o se realice monitoreo sistemático."
- **New:** "Delegado de protección de datos (DPO): la ley **permite** designarlo (Art. 50). Su adopción puede fortalecer el modelo de cumplimiento, la interlocución con la autoridad y constituir un atenuante de responsabilidad."
- **Rationale:** The law describes DPO designation as a faculty, not a mandate.

**Out of scope:** Other DPO references describe the product's DPO role feature, not a legal obligation.

### 1c. Registry Name (ley-21719.html:74)

- **Current:** "Llevar un registro público de sanciones y de bases de datos."
- **New:** "Llevar el **Registro Nacional de Sanciones y Cumplimiento**."
- **Rationale:** Correct official name per the new regime.

## 2. Company Identification

Add RUT 76.471.965-4, full address (Antonio Bellet 193, Oficina 1306, Providencia, Santiago), and phone (+562 3250 1909).

| File | Current | Change |
|---|---|---|
| legal/terms.html:63 | "Solutoria SpA, con domicilio en Providencia, Santiago, Chile" | Add RUT, full street address |
| contact.html:99 | "Providencia, Santiago, Chile" | Full street address |
| includes/footer.html | Just "Solutoria SpA" branding | Add RUT + address line below branding |
| index.html:41 | JSON-LD with "addressLocality: Providencia" | Add streetAddress, postalCode |

## 3. Plan Inconsistency (terms.html:83)

- **Current:** "Starter, Growth, Enterprise"
- **New:** "Starter, Growth, Business, Enterprise" + "Los detalles de cada plan están disponibles en kulvio.cl/precios."

## 4. Badge Corrections

### ISO 27001 (conservative — no certification claimed)

| File | Current | New |
|---|---|---|
| index.html:610 | "ISO 27001" | "Alineado a controles ISO 27001" |
| seguridad.html:216 | "ISO 27001" | "Alineado a ISO 27001" |
| seguridad.html:14 | meta "cumplimiento ISO 27001" | "alineado a controles ISO 27001" |
| software-proteccion-datos.html:390 | "ISO 27001 en proceso" | "Alineado a controles ISO 27001" |
| software-proteccion-datos.html:391 | "Consultoría activa para certificación ISO 27001" | "Experiencia en implementación ISO 27001" |

### RGPD (conservative — no compatibility claimed)

| File | Current | New |
|---|---|---|
| index.html:614 | "RGPD Compatible" | "Alineado con principios RGPD" |
| seguridad.html:234 | Status "Compatible" | Status "Alineado" |
| software-proteccion-datos.html:417 | "RGPD Compatible" | "Alineado con principios RGPD" |
| software-proteccion-datos.html:391 | "Compatible con RGPD" | "Alineado con principios RGPD" |

**Not changed:** legal/ley-21719.html:65 — RGPD mentioned as reference standard, fine as-is.

## Verification

- Visual check of all 6 modified pages
- Grep for orphaned "días hábiles" in legal context
- Grep for "RGPD Compatible" and bare "ISO 27001" badges
- Confirm footer renders correctly with added company info
