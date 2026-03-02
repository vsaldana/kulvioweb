# Diseno: Enriquecimiento del Sitio + SEO para Kulvio Web

**Fecha:** 2026-03-02
**Estado:** Aprobado
**Objetivo:** Cerrar la brecha entre las 38 funcionalidades implementadas en Kulvio y lo que muestra el sitio de marketing, posicionando para keywords transaccionales SEO.

---

## Contexto

El sitio actual (kulvio.cl) cubre bien los 8 modulos core y seguridad/integraciones, pero omite funcionalidades diferenciadores clave:
- Guia de Implementacion de 12 Fases con progreso inteligente (auto-tracking desde BD)
- Motor de evaluacion de riesgo (13 reglas automaticas)
- Proteccion por Diseno (PbD) con scoring IA
- Asistente IA para redaccion
- Dashboard y KPIs de compliance
- Ciclo de vida del dato y retencion
- Report Builder, Import masivo
- CMP Banner cookies con Google Consent Mode
- Impugnacion de decisiones automatizadas

En SEO, el sitio no captura keywords transaccionales como "software proteccion datos Chile", "software DPO", "plataforma cumplimiento ley proteccion datos".

## Enfoque seleccionado

**Enfoque A: Landing Pages SEO + Enriquecimiento quirurgico**
- 2 nuevas landing pages SEO
- Enriquecimiento de features.html e index.html
- Optimizacion SEO global

---

## 1. Nuevas Landing Pages SEO

### 1.1 `/software-proteccion-datos`

**Keywords objetivo:** "software proteccion de datos Chile", "plataforma proteccion datos personales", "software cumplimiento ley proteccion datos"

**Estructura:**
1. **Hero:** "El software de proteccion de datos personales disenado para Chile" + urgencia (1 dic 2026) + CTA
2. **Guia de 12 Fases (seccion estrella):**
   - Timeline visual con las 12 fases
   - Callout: "40+ pasos concretos, 22 auto-tracked, progreso en tiempo real"
   - Diferenciador vs competencia: "No es un checklist PDF. Es un roadmap vivo."
   - 6 ventajas: se actualiza sola, cubre ciclo completo, conecta con modulos, distingue roles, tips contextuales, evidencia auditable
3. **Asistente IA:** Redaccion automatica de politicas y evaluaciones
4. **Modulos en grid:** 8+ modulos core con iconos + descripcion corta
5. **Funcionalidades avanzadas:** Strip con badges (Motor de riesgo, PbD, CMP Banner, Dashboard, Import masivo, Report Builder)
6. **Trust + CTA final**

**SEO:**
- Title: `Software Proteccion de Datos Chile | Kulvio — Cumplimiento Ley 21.719`
- H1: "Software de proteccion de datos personales para empresas en Chile"
- Schema: SoftwareApplication + WebPage + BreadcrumbList

### 1.2 `/plataforma-dpo`

**Keywords objetivo:** "software DPO Chile", "herramienta DPO", "plataforma delegado proteccion datos", "gestion datos personales empresa"

**Estructura:**
1. **Hero:** "La plataforma que todo DPO necesita" — productividad + evidencia auditable
2. **Motor de riesgo:** 13 reglas (4 hard + 9 soft), recalculo dinamico, PDF sellado
3. **EIPD automatizada:** Sub-wizard 4 secciones, pre-llenado desde RAT, firma SHA-256
4. **PbD con IA:** Scoring 0-100 en 4 dimensiones
5. **Dashboard y KPIs:** Visibilidad ejecutiva tiempo real
6. **Report Builder:** Reportes a demanda y programados
7. **Audit trail inmutable:** Cadena SHA-256, WORM, Legal Hold
8. **CTA:** "Solicitar acceso para DPO"

**SEO:**
- Title: `Plataforma para DPO Chile | Software Gestion Datos Personales | Kulvio`
- H1: "La plataforma de gestion de datos personales para DPOs en Chile"
- Schema: SoftwareApplication + WebPage + BreadcrumbList

---

## 2. Enriquecimiento de features.html

Agregar modulos/secciones faltantes:

| Modulo nuevo | Posicion | Detalle |
|---|---|---|
| Guia de Implementacion (12 Fases) | Seccion destacada antes de modulos | Alto |
| Motor de Evaluacion de Riesgo | Despues de RAT, antes de EIPD | Medio |
| Proteccion por Diseno (PbD) | Modulo adicional | Medio |
| Ciclo de Vida del Dato | Modulo adicional | Medio |
| Dashboard y KPIs | Modulo adicional | Medio |
| Asistente IA | Modulo adicional destacado | Medio |
| Report Builder | Modulo adicional | Bajo |
| Import Masivo | Feature de plataforma | Bajo |
| CMP Banner cookies | Dentro de Consentimientos | Medio |
| Avisos de Privacidad | Modulo adicional | Bajo |
| Impugnacion Decisiones Automatizadas | Dentro de ARCOP | Bajo |

---

## 3. Enriquecimiento de index.html

1. Hero: integrar keywords SEO en copy
2. Nueva seccion "Guia de 12 Fases" — version compacta con stepper visual
3. Contadores actualizados: 12 fases, 40+ pasos, 22 auto-tracked
4. Callout "Potenciado por IA"

---

## 4. Optimizacion SEO global

### Meta titles y descriptions
Integrar keywords transaccionales en todas las paginas:
- "software proteccion de datos Chile"
- "plataforma cumplimiento ley proteccion datos"
- "software DPO Chile" / "herramienta DPO"
- "gestion datos personales empresa"

### Schema.org
- Homepage: SoftwareApplication con features expandidas
- Landing pages: WebPage + SoftwareApplication + BreadcrumbList
- Features: ItemList con modulos como ListItem

### Internal linking
- Landing pages -> features.html (detalle)
- features.html -> landing pages (contexto)
- chile-2026.html -> landing pages (solucion)

### Sitemap y robots
- Agregar nuevas URLs al sitemap.xml

### Navegacion
- Landing pages NO van en nav principal (son paginas de captura SEO)
- Se acceden via busqueda organica y links internos

---

## Fuente de contenido

Todas las funcionalidades estan documentadas en:
- `/home/azureuser/repos/kulvio/docs/Funcionalidades_Implementadas.md` (38 dominios funcionales)
- Guia de Implementacion de 12 Fases (proporcionada por el usuario, ver notas de sesion)

---

## Restricciones tecnicas

- Sitio estatico puro (HTML/CSS/JS), nginx SSI para nav/footer/mobile-menu
- Sin framework, sin bundler
- CSS en un solo archivo (styles.css), JS en un solo archivo (main.js)
- Cache busting via ?v=N query params
- Diseno responsive mobile-first
- Idioma: espanol (es-CL)
