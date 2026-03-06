# Pricing Restructure + Competitive Positioning Design

**Date:** 2026-03-06
**Status:** Approved
**Goal:** Increase conversion, positioning, and perceived seriousness by restructuring pricing from 3 to 4 tiers and incorporating competitive market data.

## Context

Competitive analysis shows Kulvio is 70-95% cheaper than global privacy compliance platforms with comparable functionality. Current pricing (Starter 8 UF, Growth 20 UF) undervalues the product. The Ley 21.719 enforcement deadline (Dec 1, 2026) creates a 9-month window of urgency.

## Pricing Structure (4 tiers)

| | Starter | Growth | Business | Enterprise |
|---|---|---|---|---|
| **Precio** | 8 UF/mes | 32 UF/mes | 55 UF/mes | Personalizado |
| **Usuarios** | Hasta 3 | Hasta 10 | Hasta 25 | Ilimitados |
| **Highlighted** | No | No | Yes (popular badge) | No |

### Feature Split

**Starter (8 UF/mes, 3 usuarios):**
- Diagnostico de brechas (gap analysis)
- Registro de Actividades (RAT)
- Evaluacion de Riesgo basica
- Derechos ARCOP (portal publico + gestion)
- Auditoria inmutable (SHA-256)
- Exportacion PDF / CSV
- Soporte por email + documentacion

**Growth (32 UF/mes, 10 usuarios) — Todo Starter +:**
- EIPD completa con wizard
- Gestion de Terceros y Encargados
- Portal del Encargado (acceso externo)
- Gestion de Consentimientos + widget embebible
- Canal de Denuncias (anonimo + nominado)
- Gestion de Brechas de Seguridad
- 4 roles configurables (Admin, DPO, Operador, Auditor)
- Notificaciones automaticas con reintentos
- Soporte prioritario (24 horas habiles)

**Business (55 UF/mes, 25 usuarios) — Todo Growth +:**
- Transferencias Internacionales
- Repositorio documental (wiki)
- 58 plantillas documentales predefinidas
- Politicas y Avisos de Privacidad
- API REST basica + Webhooks
- Exportacion PDF / CSV / JSON

**Enterprise (Personalizado, usuarios ilimitados) — Todo Business +:**
- Controladores Externos / Mandantes
- Instancia dedicada (tenant aislado)
- SSO (SAML 2.0 / OpenID Connect) + SCIM
- API REST + OAuth 2.0 completa
- Exportacion SIEM (logs de auditoria)
- Multi-filial / multi-entidad
- Residencia de datos (Chile / region)
- SLA personalizado (hasta 99,95%)
- Customer Success Manager dedicado
- Onboarding white-glove + capacitacion
- Revisiones ejecutivas trimestrales

## Pricing Page Changes

### Remove
- Entire pricing calculator (`#pricing-calc` section + all JS logic)

### Add: Competitive Comparison Section
Between pricing cards and add-ons. Structure by competitor category (no brand names):

- Plataformas enterprise: $40K-$150K+/ano
- Plataformas mid-market: $20K-$90K/ano
- Consent management: $1K-$10K/ano
- **Kulvio**: desde $3.600/ano (compliance integral, no solo consent)

Visual: clean table or horizontal bars with Kulvio highlighted. Subheading: "Hasta 70% mas accesible que alternativas globales con funcionalidad comparable."

### Add: 2 New FAQ Questions
1. "Por que Kulvio es mas accesible que alternativas globales?" — addresses 70-95% price gap, transparent pricing vs opaque enterprise contracts, UF predictability
2. "Cual es la diferencia entre Growth, Business y Enterprise?" — clear tier comparison for buyers

### Update: Pricing Cards Grid
- 4 cards instead of 3
- Business gets the `pricing-card--popular` badge (currently on Growth)
- Growth card: disabled features list for Business-only features
- Business card: new card with all features listed

## Homepage Changes

### Plans Teaser
- 4 cards instead of 3: Starter / Growth / Business / Enterprise
- 4-column grid, collapses to 2x2 on mobile
- Update prices: 8 / 32 / 55 / Personalizado
- Business card gets highlight treatment

## JS Changes
- Remove entire pricing calculator: `STARTER`, `GROWTH`, `GROWTH_VOLUME` constants, `calculatePriceByUsers()`, `formatUF()`, `updateCalc()`, slider/button event listeners
- Remove calculator-related DOM queries

## CSS Changes
- Remove `.pricing-calc*` styles
- Add `.pricing-comparison*` styles for competitor section
- Update `.pricing-grid` for 4-column layout
- Update `.plans-teaser` for 4-card layout
- Both grids: 4-col desktop, 2x2 tablet/mobile

## SEO/Schema Updates
- `index.html`: Update `AggregateOffer` lowPrice/highPrice
- `precios.html`: Add 2 new FAQ entries to FAQPage schema, update meta description with new price range
- Update `<title>` tag on precios.html to reflect new range

## Files to Modify
1. `public/precios.html` — 4th card, comparison section, 2 new FAQs, remove calculator HTML
2. `public/index.html` — 4-card plans teaser, update schema
3. `public/js/main.js` — remove calculator JS
4. `public/css/styles.css` — new comparison styles, 4-col grids, remove calc styles
