# Funcionalidades Implementadas — Kulvio Compliance PDP

**Ultima actualizacion:** 2026-03-02
**Normativa aplicable:** Ley 21.719 (modifica Ley 19.628 sobre Proteccion de la Vida Privada)
**Entrada en vigencia:** 1 de diciembre de 2026
**Criterio:** Inventario completo de funcionalidades implementadas, cada una mapeada a la normativa chilena que la exige o la recomienda como buena practica

---

## Indice

1. [Autenticacion y Seguridad de Acceso](#1-autenticacion-y-seguridad-de-acceso)
2. [Multi-tenancy y Aislamiento de Datos](#2-multi-tenancy-y-aislamiento-de-datos)
3. [Onboarding y Gobernanza Organizacional](#3-onboarding-y-gobernanza-organizacional)
4. [Wizard de Implementacion (5 Pasos)](#4-wizard-de-implementacion-5-pasos)
5. [Registro de Actividades de Tratamiento (RAT)](#5-registro-de-actividades-de-tratamiento-rat)
6. [Motor de Evaluacion de Riesgo](#6-motor-de-evaluacion-de-riesgo)
7. [Evaluacion de Impacto (EIPD)](#7-evaluacion-de-impacto-eipd)
8. [Medidas de Seguridad (Evidence-Based)](#8-medidas-de-seguridad-evidence-based)
9. [Derechos ARCOP del Titular](#9-derechos-arcop-del-titular)
10. [Gestion de Consentimientos](#10-gestion-de-consentimientos)
11. [Gestion de Brechas de Seguridad](#11-gestion-de-brechas-de-seguridad)
12. [Gestion de Terceros / Encargados](#12-gestion-de-terceros--encargados)
13. [Transferencias Internacionales](#13-transferencias-internacionales)
14. [Canal de Denuncias](#14-canal-de-denuncias)
15. [Proteccion por Diseno y por Defecto (PbD)](#15-proteccion-por-diseno-y-por-defecto-pbd)
16. [Impugnacion de Decisiones Automatizadas](#16-impugnacion-de-decisiones-automatizadas)
17. [Audit Log Inmutable](#17-audit-log-inmutable)
18. [Motor de Notificaciones](#18-motor-de-notificaciones)
19. [Repositorio Documental (Wiki)](#19-repositorio-documental-wiki)
20. [Motor de Reglas Legales](#20-motor-de-reglas-legales)
21. [Dashboard y KPIs de Compliance](#21-dashboard-y-kpis-de-compliance)
22. [Controladores Externos (Mandantes)](#22-controladores-externos-mandantes)
23. [RBAC — Control de Acceso por Roles](#23-rbac--control-de-acceso-por-roles)
24. [Ciclo de Vida del Dato y Retencion](#24-ciclo-de-vida-del-dato-y-retencion)
25. [API REST v1 y Webhooks](#25-api-rest-v1-y-webhooks)
26. [Trust Center](#26-trust-center)
27. [Sistema de Ayuda y Experiencia de Usuario](#27-sistema-de-ayuda-y-experiencia-de-usuario)
28. [Portales Externos](#28-portales-externos)
29. [Avisos de Privacidad](#29-avisos-de-privacidad)
30. [Compliance Records y Certificaciones](#30-compliance-records-y-certificaciones)
31. [Evaluacion de Riesgo de Vendors](#31-evaluacion-de-riesgo-de-vendors)
32. [Import Masivo](#32-import-masivo)
33. [Report Builder](#33-report-builder)
34. [Asistente IA](#34-asistente-ia)
35. [Plataforma Super-Admin](#35-plataforma-super-admin)
36. [Exportacion y Portabilidad del Tenant](#36-exportacion-y-portabilidad-del-tenant)
37. [Infraestructura de Seguridad](#37-infraestructura-de-seguridad)
38. [Scheduler y Automatizacion](#38-scheduler-y-automatizacion)

---

## Resumen Ejecutivo

Kulvio Compliance PDP implementa **38 dominios funcionales** que cubren de manera integral las obligaciones de la Ley 21.719, la cual modifica la Ley 19.628 sobre Proteccion de la Vida Privada y cuya entrada en vigencia esta fijada para el 1 de diciembre de 2026. Cada funcionalidad se clasifica segun su fundamento normativo:

| Clasificacion | Significado | Cantidad |
|---------------|-------------|----------|
| **EXIGIDO** | Obligacion legal directa derivada de un articulo especifico de la Ley 21.719 | ~22 |
| **BUENA PRACTICA** | Recomendado por la ley, estandares internacionales referenciados, o necesario para cumplimiento efectivo | ~16 |

La plataforma cubre el ciclo completo de cumplimiento: desde el registro inicial de la organizacion y su diagnostico de tratamiento, pasando por la gestion del RAT, evaluacion de riesgos, EIPD, derechos ARCOP, consentimientos, brechas, terceros y transferencias internacionales, hasta la generacion de evidencia auditable, dashboards ejecutivos y automatizacion continua de obligaciones recurrentes. Kulvio esta disenada como herramienta SaaS multi-tenant con aislamiento total de datos, autenticacion sin contrasenas y trazabilidad inmutable, permitiendo a organizaciones de cualquier tamano alcanzar y demostrar cumplimiento normativo de forma continua.

---

## 1. Autenticacion y Seguridad de Acceso

**Base legal:** Art. 14 quinquies (medidas de seguridad apropiadas), Art. 3 lit. f (principio de seguridad)
**Clasificacion:** EXIGIDO

### Para el DPO y equipo tecnico

Kulvio implementa autenticacion passwordless completa, eliminando por diseno el riesgo de almacenamiento y filtracion de contrasenas. El acceso se gestiona mediante OTP por email o Magic Link, con MFA TOTP opcional (compatible con Google Authenticator y apps TOTP estandar) donde los secretos se cifran con AES-GCM en la base de datos, incluyendo backup codes para recuperacion. El sistema soporta SSO OIDC completo con proveedores como Google, Azure AD y Okta, con discovery automatico, validacion state/nonce y ruteo por dominio de email al IdP correspondiente. La proteccion anti-abuso incluye rate limiting multi-capa (5 intentos por email por hora, limites por IP y por flujo), Turnstile CAPTCHA de Cloudflare con fail-open, y tracking de dispositivos y sesiones activas. Los Security Headers OWASP (HSTS, X-Frame-Options, CSP, X-Content-Type-Options) se aplican via middleware en todas las respuestas. Adicionalmente, se registra la aceptacion de Terminos y Condiciones por version con timestamp e IP.

### Para la gerencia

El acceso a la plataforma esta protegido por los mecanismos de autenticacion mas avanzados disponibles, sin necesidad de que los usuarios recuerden contrasenas. Esto reduce drasticamente el riesgo de brechas por credenciales comprometidas, uno de los vectores de ataque mas frecuentes. La compatibilidad con SSO empresarial permite integrarse con la infraestructura de identidad existente de la organizacion, simplificando el acceso sin sacrificar seguridad. El sistema de segundo factor (MFA) agrega una capa adicional de proteccion para roles criticos como el DPO y el administrador. Cada mecanismo de seguridad esta disenado para cumplir con las exigencias del Art. 14 quinquies, reduciendo la exposicion a sanciones por medidas de seguridad insuficientes.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Autenticacion Passwordless (OTP)** | Login mediante codigo OTP enviado por email, eliminando por completo el almacenamiento de contrasenas |
| **Magic Link** | Enlace de acceso unico con expiracion temporal, alternativa al OTP para login sin friccion |
| **MFA TOTP** | Segundo factor de autenticacion con secretos cifrados AES-GCM, enrollment por QR, backup codes y compatibilidad con apps TOTP estandar (Google Authenticator, Authy) |
| **SSO OIDC** | Single Sign-On completo con Google, Azure AD, Okta y cualquier proveedor OIDC. Incluye discovery automatico, validacion state/nonce y ruteo automatico por dominio de email al IdP configurado |
| **Rate Limiting multi-capa** | Maximo 5 intentos por email por hora, limites por IP y por flujo de autenticacion para prevenir ataques de fuerza bruta |
| **JWT con cookies HttpOnly** | Tokens de sesion seguros, no accesibles via JavaScript, con expiracion configurable |
| **Security Headers OWASP** | HSTS, X-Frame-Options, CSP y X-Content-Type-Options aplicados via middleware en todas las respuestas HTTP |
| **Turnstile CAPTCHA** | Proteccion anti-bot de Cloudflare en formularios publicos, con modo fail-open para no bloquear usuarios legitimos |
| **Device Tracking y Sesiones** | Registro de dispositivos conocidos (UserKnownDevice) y sesiones activas (UserSession) con IP y User-Agent |
| **Legal Acceptance Tracking** | Registro de aceptacion de Terminos y Condiciones por version, con timestamp e IP del usuario |

### Fundamento normativo

El Art. 14 quinquies exige que el responsable adopte medidas tecnicas y organizativas para garantizar la confidencialidad, integridad, disponibilidad y resiliencia de los sistemas de tratamiento. Menciona explicitamente la autenticacion robusta, el cifrado y la seudonimizacion como medidas apropiadas. El Art. 3 literal f establece el principio de seguridad como principio rector del tratamiento de datos personales, obligando a proteger los datos contra accesos no autorizados. La autenticacion sin contrasenas, el MFA y el cifrado de secretos implementados en Kulvio constituyen medidas de seguridad avanzadas que exceden el estandar minimo, reforzando la posicion de la organizacion ante una eventual fiscalizacion por parte de la Agencia de Proteccion de Datos Personales.

---

## 2. Multi-tenancy y Aislamiento de Datos

**Base legal:** Art. 14 quinquies (medidas de seguridad), Art. 14 bis (deber de confidencialidad), Art. 3 lit. f (principio de seguridad)
**Clasificacion:** EXIGIDO

### Para el DPO y equipo tecnico

La arquitectura multi-tenant de Kulvio garantiza aislamiento logico total mediante columna `tenant_id` presente en los 96 modelos de negocio. Toda consulta a la base de datos pasa obligatoriamente por la funcion `tenant_query()`, que aplica filtros de tenant y exclusion de registros eliminados de forma automatica, haciendo tecnicamente imposible el acceso cross-tenant. El TenantMiddleware intercepta cada request, extrae el tenant_id del JWT autenticado y lo inyecta en el estado de la solicitud, asegurando que ningun endpoint pueda operar fuera del contexto del tenant autenticado. Los usuarios pueden pertenecer a multiples organizaciones y cambiar de contexto mediante un selector seguro, sin que esto comprometa el aislamiento de datos entre tenants.

### Para la gerencia

Los datos de su organizacion estan completamente aislados de los de cualquier otro cliente de la plataforma. Kulvio opera como una plataforma SaaS donde multiples organizaciones coexisten en la misma infraestructura, pero con una barrera tecnica que impide el acceso cruzado entre ellas. Este aislamiento es un requisito legal bajo el deber de confidencialidad del Art. 14 bis y las medidas de seguridad del Art. 14 quinquies. La garantia de aislamiento permite a su organizacion confiar en que sus registros de tratamiento, brechas, derechos ejercidos y documentos internos son accesibles unicamente por los usuarios autorizados de su propia organizacion.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Aislamiento logico por tenant_id** | Las 96 tablas de negocio incluyen columna `tenant_id`, garantizando separacion de datos a nivel de base de datos |
| **TenantMiddleware** | Middleware que intercepta cada request, extrae el tenant_id desde el JWT y lo inyecta en el contexto de la solicitud |
| **tenant_query() centralizada** | Funcion unica que aplica automaticamente filtros `tenant_id` e `is_deleted=False` en todas las consultas, previniendo omisiones |
| **Multi-organizacion con context switcher** | Un usuario puede pertenecer a multiples organizaciones y cambiar entre ellas sin cerrar sesion |
| **Prohibicion de acceso cross-tenant** | Imposibilidad tecnica de acceder a datos de otra organizacion, enforced a nivel de query layer |

### Fundamento normativo

El Art. 14 bis establece el deber de confidencialidad para toda persona que intervenga en el tratamiento de datos personales, prohibiendo revelar o comunicar datos a terceros no autorizados. El Art. 14 quinquies exige medidas tecnicas que impidan el acceso no autorizado a datos personales. En una plataforma SaaS multi-tenant, el aislamiento logico por tenant_id es la medida tecnica fundamental que garantiza que los datos de un responsable no sean accesibles por otro. El Art. 3 literal f refuerza esta obligacion mediante el principio de seguridad, que exige proteger los datos contra todo tipo de acceso no autorizado.

---

## 3. Onboarding y Gobernanza Organizacional

**Base legal:** Art. 15 bis (relacion responsable-encargado), Art. 14 (deber de registro), Art. 50 (modelo de prevencion de infracciones)
**Clasificacion:** EXIGIDO

### Para el DPO y equipo tecnico

El flujo de onboarding de Kulvio estructura la gobernanza de datos personales desde el primer acceso. El registro de la organizacion captura los datos legales esenciales (RUT, Razon Social, email del administrador) y presenta el DPA de la plataforma para firma digital como parte del proceso de alta, cumpliendo con el Art. 15 bis. El sistema exige la designacion explicita del Representante de Datos Personales y permite asignar un DPO con generacion automatica de PDF acreditativo, requerido cuando la organizacion implementa un Modelo de Prevencion de Infracciones (Art. 50). Si no se ha designado DPO, el sistema genera alertas automaticas al administrador. La gestion de usuarios soporta 4 roles diferenciados (Admin, DPO, Operador, Auditor) con invitaciones por email, y la estructura departamental permite asignar responsabilidades con jerarquia organizacional.

### Para la gerencia

Kulvio guia a su organizacion paso a paso desde el registro inicial hasta la configuracion completa de gobernanza de datos personales. El proceso esta disenado para que en minutos se establezca la estructura basica de cumplimiento: designacion de responsables, firma del contrato de encargo de tratamiento con la plataforma, asignacion de roles al equipo y configuracion de departamentos. Si la organizacion ha adoptado un Modelo de Prevencion de Infracciones bajo el Art. 50, la designacion del DPO queda formalizada con un documento PDF exportable. El sistema alerta proactivamente cuando falta designar un DPO, evitando lagunas de gobernanza que podrian resultar en sanciones.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Auto-registro de organizacion** | Formulario de alta con RUT, Razon Social y email del administrador inicial |
| **DPA digital en Sign-up** | Contrato de encargo de tratamiento con la plataforma presentado y firmado durante el proceso de registro (Art. 15 bis) |
| **Designacion de RDP** | Asignacion explicita del Representante de Datos Personales de la organizacion |
| **Gestion de usuarios e invitaciones** | CRUD de usuarios con invitaciones por email y asignacion de 4 roles diferenciados |
| **Designacion DPO con PDF** | Designacion formal del Delegado de Proteccion de Datos con generacion de PDF exportable, obligatoria si la organizacion adopta un Modelo de Prevencion |
| **Alerta por ausencia de DPO** | Notificacion automatica al administrador cuando no se ha designado un DPO en la organizacion |
| **Guia de Onboarding** | Progreso paso a paso que orienta al usuario en la configuracion inicial de cumplimiento |
| **Departamentos con jerarquia** | Gestion de estructura departamental con relaciones jerarquicas para asignacion de responsabilidades |
| **Legal Acceptance tracking** | Registro de la version de Terminos y Condiciones aceptada, con timestamp e IP del usuario |

### Fundamento normativo

El Art. 15 bis regula la relacion entre responsable y encargado del tratamiento, exigiendo un contrato que establezca las condiciones del encargo. El DPA integrado en el onboarding cumple esta obligacion desde el momento del registro. El Art. 14 obliga al responsable a mantener un registro de actividades de tratamiento, lo que presupone una estructura organizacional definida con roles y responsabilidades claras. El Art. 50 establece el Modelo de Prevencion de Infracciones como atenuante de responsabilidad, e incluye como componente la designacion de un DPO. La gobernanza implementada en Kulvio garantiza que estas obligaciones se cumplan de forma sistematica desde el inicio de la relacion con la plataforma.

---

## 4. Wizard de Implementacion (5 Pasos)

**Base legal:** Art. 14 (deber de registro y documentacion), Art. 3 lit. e (principio de responsabilidad)
**Clasificacion:** BUENA PRACTICA

### Para el DPO y equipo tecnico

El Wizard de 5 pasos guia la implementacion de cumplimiento de forma estructurada pero no bloqueante: Diagnostico, RAT, Riesgo, Seguridad y Terceros. El Paso 1 (Diagnostico) utiliza un cuestionario dinamico con ramificacion condicional segun tipo de organizacion (publica o privada), tratamiento de datos sensibles, menores de edad, uso de IA y ubicacion de servidores, incluyendo umbrales especificos por industria como el limite de 100 registros para Fintech segun NCG N.502 CMF. Las respuestas del diagnostico alimentan automaticamente la pre-creacion de actividades RAT mediante 8 plantillas predefinidas (5 CONTROLLER + 3 PROCESSOR) y habilitan la validacion cruzada entre diagnostico y registro. El progreso se persiste en WizardProgress, permitiendo re-ejecucion cuando cambien las condiciones de tratamiento.

### Para la gerencia

Implementar cumplimiento normativo no requiere experiencia previa en proteccion de datos. El Wizard de Kulvio transforma un proceso que tipicamente toma semanas de consultoria en un flujo guiado de 5 pasos que cualquier miembro del equipo puede completar. El diagnostico inicial adapta automaticamente las obligaciones al contexto especifico de su organizacion (sector, tipo de datos, volumen), y genera automaticamente borradores de actividades de tratamiento basados en sus respuestas. No es necesario completar todo de una vez: el progreso se guarda y puede retomarse en cualquier momento. Cuando las condiciones de su organizacion cambien, el wizard puede re-ejecutarse para actualizar el diagnostico.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Wizard de 5 pasos no bloqueante** | Flujo guiado Diagnostico, RAT, Riesgo, Seguridad y Terceros con navegacion libre entre pasos |
| **Persistencia de progreso** | Modelo WizardProgress que almacena el avance y permite retomar donde se dejo |
| **Re-ejecucion condicional** | El wizard puede re-ejecutarse cuando cambien las condiciones de tratamiento de la organizacion |
| **Diagnostico dinamico con ramificacion** | Cuestionario del Paso 1 con secciones que se activan segun tipo de organizacion (publica/privada), datos sensibles, menores, IA y servidores extranjeros |
| **Umbrales industria-especificos** | Regla Fintech con threshold de 100 registros segun NCG N.502 de la CMF |
| **Plantillas de pre-creacion** | 8 plantillas predefinidas (5 CONTROLLER + 3 PROCESSOR) que generan actividades RAT automaticamente desde el diagnostico |
| **Validacion cruzada diagnostico-RAT** | Verificacion automatica de coherencia entre las respuestas del diagnostico y las actividades registradas |

### Fundamento normativo

Si bien la ley no exige un wizard de implementacion como tal, el Art. 14 obliga al responsable a documentar su tratamiento de datos personales y el Art. 3 literal e establece el principio de responsabilidad, que exige poder demostrar el cumplimiento de las obligaciones legales. El wizard operacionaliza estos deberes al guiar sistematicamente a la organizacion en el diagnostico de sus actividades de tratamiento, la evaluacion de riesgos y la implementacion de medidas de seguridad. La ramificacion condicional asegura que las obligaciones se adapten al contexto real de la organizacion, evitando tanto lagunas como requisitos innecesarios.

---

## 5. Registro de Actividades de Tratamiento (RAT)

**Base legal:** Art. 14 (registro de actividades de tratamiento), Art. 3 lit. b (principio de licitud)
**Clasificacion:** EXIGIDO

### Para el DPO y equipo tecnico

El RAT de Kulvio implementa el registro de actividades exigido por el Art. 14 con trazabilidad completa y workflow de aprobacion formal. Cada actividad soporta rol dual CONTROLLER/PROCESSOR y ofrece 8 bases de licitud con validacion inteligente (bloqueo de combinaciones invalidas como Marketing+Contrato o Sensibles+Interes Legitimo, ocultacion de Interes Legitimo para organismos publicos). Cuando se selecciona Interes Legitimo, el sistema exige completar un LIA (Legitimate Interest Assessment). El versionamiento granular mediante ActivityVersion y ActivityFieldChange registra cada cambio a nivel de campo (quien, cuando, valor anterior y nuevo). El workflow de aprobacion sigue la cadena Operador→DPO→Admin, con devolucion justificada y auto-reversion a Draft cuando se editan campos criticos en estado Active. Los campos marcados como "Por Definir" generan notificaciones pendientes, y la validacion cruzada con el diagnostico garantiza coherencia.

### Para la gerencia

El Registro de Actividades de Tratamiento es la obligacion central de la Ley 21.719 y la primera evidencia que solicitara la Agencia en una fiscalizacion. Kulvio mantiene este registro actualizado de forma continua, con un historial completo de cambios que demuestra la diligencia de su organizacion. El workflow de aprobacion asegura que ninguna actividad se publique sin la revision del DPO y la aprobacion del administrador, reduciendo el riesgo de errores. Las 8 plantillas predefinidas permiten crear actividades comunes en segundos, y la validacion automatica de bases de licitud previene errores legales costosos. Si un auditor o la Agencia solicita evidencia, cada actividad cuenta con su historial completo de versiones.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **CRUD ilimitado de actividades** | Creacion, edicion, eliminacion y consulta de actividades de tratamiento sin limite de cantidad |
| **Rol dual CONTROLLER/PROCESSOR** | Cada actividad puede registrarse como responsable directo o como encargado de tratamiento |
| **8 bases de licitud** | Consentimiento (Art. 12), Contrato (Art. 13c), Obligacion Legal (Art. 13b), Interes Legitimo (Art. 13d), Defensa en Juicio (Art. 13e), Funciones Publicas (Art. 20), Info Comercial (Art. 17), Interes Vital (Art. 16/16 bis) |
| **Validacion de bases de licitud** | Bloqueo de combinaciones invalidas (Marketing+Contrato, Sensibles+IL), ocultacion de IL para organismos publicos |
| **LIA obligatorio para Interes Legitimo** | Evaluacion de interes legitimo requerida automaticamente cuando se selecciona esta base de licitud |
| **Versionamiento granular** | ActivityVersion y ActivityFieldChange registran cada cambio a nivel de campo con autor, timestamp y valores anterior/nuevo |
| **Workflow de aprobacion** | Cadena Draft, DPO Review, Admin Approve y Active, con devolucion justificada en cualquier etapa |
| **Auto-reversion por campos criticos** | Editar un campo critico en estado Active revierte automaticamente la actividad a Draft |
| **Campos "Por Definir"** | Marcador para campos incompletos con generacion automatica de notificaciones pendientes |
| **8 plantillas predefinidas** | Templates de actividades comunes (5 CONTROLLER + 3 PROCESSOR) para creacion rapida |
| **Validacion cruzada con diagnostico** | Verificacion automatica de coherencia entre respuestas del diagnostico y actividades registradas |
| **Catalogos de datos y sujetos** | Catalogos predefinidos de categorias de datos personales y tipos de titulares |
| **Catalogo de servicios reutilizable** | Definiciones de servicios con categorias de datos y sujetos asociados, reutilizables entre actividades |
| **Engagement pre-fill para PROCESSOR** | Pre-llenado automatico de campos cuando la actividad se registra como encargado de tratamiento |

### Fundamento normativo

El Art. 14 de la Ley 21.719 obliga al responsable de datos a mantener un registro actualizado de sus actividades de tratamiento, detallando la finalidad, los tipos de datos, las categorias de titulares, los destinatarios, las transferencias internacionales y los plazos de conservacion. El Art. 3 literal b establece el principio de licitud, que exige que todo tratamiento tenga una base legal valida entre las que la ley enumera taxativamente. Las 8 bases de licitud implementadas corresponden exactamente a las contempladas en los articulos 12, 13, 16, 16 bis, 17 y 20 de la ley. El versionamiento y el workflow de aprobacion van mas alla del minimo legal, constituyendo evidencia probatoria robusta de que la organizacion mantiene su registro con la diligencia que la ley exige.

---

## 6. Motor de Evaluacion de Riesgo

**Base legal:** Art. 15 ter (evaluacion de impacto previa), Art. 14 quinquies (medidas de seguridad proporcionales al riesgo)
**Clasificacion:** EXIGIDO

### Para el DPO y equipo tecnico

El motor de riesgo implementa un sistema de evaluacion automatica basado en los criterios del WP248rev.01 del Grupo de Trabajo del Articulo 29, adaptado a la normativa chilena. Dispone de 4 Hard Rules de disparo automatico obligatorio (uso de IA con efecto juridico, tratamiento masivo superior a 10.000 registros, monitoreo sistematico de espacios publicos, y datos sensibles sin consentimiento explicito) y 9 Soft Rules basadas en los criterios WP29 (scoring, decisiones automatizadas, observacion, datos sensibles, gran escala, cruce de bases de datos, personas vulnerables, nuevas tecnologias, bloqueo de ejercicio de derechos). Incluye una Soft Rule Reforzada para IA que exige override con justificacion en tres partes. El scoring suma resultados (mayor o igual a 2 es Alto, 1 es Medio, 0 es Bajo) y se recalcula dinamicamente ante cambios en las actividades RAT. El DPO puede realizar override de EIPD justificado para Soft Rules, y el sistema genera PDF sellado del analisis de riesgo. El umbral de gran escala (INT_LARGE_SCALE_THRESHOLD) es parametrizable, con excepcion Fintech de 100 registros segun NCG N.502 CMF.

### Para la gerencia

La evaluacion de riesgos es el mecanismo que determina si su organizacion debe realizar una Evaluacion de Impacto en la Proteccion de Datos (EIPD) antes de implementar un tratamiento. Kulvio automatiza completamente esta evaluacion, eliminando la subjetividad y el riesgo de omitir escenarios criticos. El motor analiza cada actividad de tratamiento contra 13 reglas basadas en la normativa chilena y estandares internacionales, y genera un veredicto inmediato: riesgo Alto (EIPD obligatoria), Medio (EIPD recomendada) o Bajo (no requerida). Si las condiciones de una actividad cambian, el riesgo se recalcula automaticamente. Cada evaluacion genera un PDF sellado que constituye evidencia probatoria ante la Agencia, demostrando que su organizacion evalua proactivamente los riesgos de sus tratamientos.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **4 Hard Rules automaticas** | Disparo obligatorio de EIPD por IA con efecto juridico, masivo >10.000 registros, monitoreo publico y sensibles sin consentimiento |
| **9 Soft Rules WP29** | Criterios del Grupo de Trabajo Art. 29: scoring, decisiones auto, observacion, sensibles, gran escala, cruce BBDD, vulnerables, nuevas tech, bloqueo derechos |
| **Soft Rule Reforzada IA** | Regla especifica para tratamientos con inteligencia artificial que exige override con justificacion en tres partes |
| **Scoring automatico** | Suma de resultados con clasificacion: mayor o igual a 2 = Alto, 1 = Medio, 0 = Bajo |
| **Recalculo dinamico** | El nivel de riesgo se recalcula automaticamente ante cualquier cambio en la actividad RAT asociada |
| **Override de EIPD justificado** | El DPO puede dispensar la EIPD para Soft Rules con justificacion documentada e inmutable |
| **PDF de Analisis de Riesgo sellado** | Documento PDF generado automaticamente con el resultado del analisis, sellado para evidencia |
| **Umbral parametrizable** | INT_LARGE_SCALE_THRESHOLD configurable, con excepcion Fintech 100 registros (NCG N.502 CMF) |
| **Risk history snapshots** | Historial de snapshots de riesgo para trazabilidad temporal de la evolucion del perfil de riesgo |

### Fundamento normativo

El Art. 15 ter exige la realizacion de una evaluacion de impacto previa cuando un tratamiento pueda generar un alto riesgo para los derechos y libertades de los titulares. La ley identifica casos especificos como el tratamiento masivo, el uso de nuevas tecnologias y la elaboracion de perfiles. El Art. 14 quinquies complementa al exigir medidas de seguridad proporcionales al riesgo identificado. El motor implementa los criterios del WP248rev.01, documento de referencia del Grupo de Trabajo del Articulo 29 que la propia Agencia chilena podria adoptar como guia interpretativa. Las Hard Rules garantizan que ningun escenario de alto riesgo legalmente definido pase inadvertido, mientras que las Soft Rules cubren los criterios complementarios que la doctrina internacional considera relevantes para una evaluacion completa.

---

## 7. Evaluacion de Impacto (EIPD)

**Base legal:** Art. 15 ter (evaluacion de impacto en la proteccion de datos personales)
**Clasificacion:** EXIGIDO

### Para el DPO y equipo tecnico

La EIPD de Kulvio implementa un sub-wizard de 4 secciones que cubre los requisitos del Art. 15 ter: Descripcion Sistematica del tratamiento, Analisis de Necesidad y Proporcionalidad, Matriz de Riesgos con evaluacion de Probabilidad por Impacto (PxI), y Medidas de Mitigacion propuestas. Los campos se pre-llenan automaticamente desde los datos de la actividad RAT asociada, reduciendo duplicacion. La escala utiliza 4 niveles (Bajo 1 a Muy Alto 4) y el riesgo se calcula como PxI con umbral de aceptabilidad menor o igual a 4. El workflow formal incluye estados DRAFT, DPO_REVIEW, APPROVED y REQUIRES_CONSULTATION, exigiendo dictamen obligatorio del DPO antes de la aprobacion. La firma digital del RDP se realiza con hash SHA-256, y cuando el riesgo residual supera el umbral de aceptabilidad, el sistema activa el flujo de consulta previa a la Agencia. El PDF exportable incluye dictamen del DPO, matriz de riesgo residual y firma digital. Los cambios en campos criticos de la actividad RAT invalidan automaticamente la EIPD aprobada.

### Para la gerencia

La Evaluacion de Impacto es la herramienta que la ley exige para demostrar que su organizacion ha analizado los riesgos de un tratamiento antes de implementarlo. Kulvio automatiza este proceso con un formulario estructurado que guia al equipo tecnico a traves de las 4 etapas requeridas por la ley. El documento resultante, firmado digitalmente por el DPO y el Representante de Datos Personales, constituye evidencia formal de cumplimiento. Si el riesgo residual es inaceptable, el sistema activa automaticamente el procedimiento de consulta previa a la Agencia, evitando que su organizacion incurra en la infraccion de omitir esta obligacion. El PDF generado esta listo para ser presentado ante la Agencia o cualquier auditor externo.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Sub-wizard de 4 secciones** | Descripcion Sistematica, Necesidad y Proporcionalidad, Matriz de Riesgos PxI, y Medidas de Mitigacion |
| **Pre-llenado desde RAT** | Los datos de la actividad de tratamiento asociada se cargan automaticamente en la EIPD |
| **Escala de 4 niveles** | Bajo (1), Medio (2), Alto (3) y Muy Alto (4) para Probabilidad e Impacto |
| **Calculo de riesgo PxI** | Riesgo calculado como Probabilidad multiplicada por Impacto, con umbral de aceptabilidad menor o igual a 4 |
| **Workflow formal** | Estados DRAFT, DPO_REVIEW, APPROVED y REQUIRES_CONSULTATION con transiciones controladas |
| **Dictamen DPO obligatorio** | El DPO debe emitir dictamen formal antes de que la EIPD pueda ser aprobada |
| **Firma digital RDP (SHA-256)** | El Representante de Datos Personales firma digitalmente la EIPD con hash SHA-256 |
| **Consulta previa a la Agencia** | Flujo automatico cuando el riesgo residual supera el umbral de aceptabilidad |
| **PDF firmado exportable** | Documento PDF con dictamen del DPO, matriz de riesgo residual y firma digital del RDP |
| **Invalidacion por campos criticos** | Cambios en campos criticos de la actividad RAT invalidan automaticamente la EIPD aprobada |

### Fundamento normativo

El Art. 15 ter obliga al responsable a efectuar una evaluacion de impacto antes de iniciar un tratamiento que pueda implicar un alto riesgo para los derechos y libertades de los titulares. La evaluacion debe contener una descripcion sistematica del tratamiento, la evaluacion de la necesidad y proporcionalidad, la identificacion de riesgos y las medidas previstas para mitigarlos. Cuando la evaluacion concluya que el tratamiento podria generar un alto riesgo residual que el responsable no pueda mitigar, debe consultarse previamente a la Agencia de Proteccion de Datos Personales. Las 4 secciones del sub-wizard implementan exactamente estos componentes legales, y el workflow de aprobacion con dictamen DPO obligatorio asegura la supervision tecnica que la ley presupone.

---

## 8. Medidas de Seguridad (Evidence-Based)

**Base legal:** Art. 14 quinquies (medidas de seguridad tecnicas y organizativas), Art. 3 lit. f (principio de seguridad)
**Clasificacion:** EXIGIDO

### Para el DPO y equipo tecnico

Kulvio implementa un sistema de checklists de seguridad diferenciado en dos niveles. El Nivel 1 (estandar) cubre controles de acceso, seguridad de red, respaldo de datos y medidas organizativas. El Nivel 2 (extendido) agrega controles avanzados: cifrado AES-256, TLS para transmision, seudonimizacion, plan de recuperacion ante desastres (DRP), pentesting periodico, MFA obligatorio, DPO designado y EIPD completada. Cada control requiere upload obligatorio de evidencia documental (certificados, capturas de configuracion, politicas firmadas), y el sistema no permite cerrar un ciclo de seguridad sin evidencia completa. Los certificados y evidencias tienen fecha de vigencia con expiracion automatica, y el motor de notificaciones genera alertas cuando una evidencia esta proxima a vencer o ya ha expirado, asegurando que las medidas de seguridad se mantengan actualizadas de forma continua.

### Para la gerencia

La ley exige medidas de seguridad proporcionales al riesgo del tratamiento, pero no basta con declararlas: su organizacion debe poder demostrar que estan implementadas. Kulvio convierte esta obligacion en un proceso gestionable mediante checklists claros con evidencia adjunta obligatoria. El sistema diferencia entre medidas estandar (exigidas para cualquier tratamiento) y medidas avanzadas (requeridas para tratamientos de alto riesgo), y alerta automaticamente cuando un certificado o evidencia esta por vencer. En caso de fiscalizacion, cada medida de seguridad cuenta con su evidencia documental adjunta, timestamps de implementacion y registro de vigencia, constituyendo un expediente de seguridad completo y auditable.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Checklist Nivel 1 (estandar)** | Controles basicos: acceso logico, seguridad de red, respaldo de datos, medidas organizativas |
| **Checklist Nivel 2 (extendido)** | Controles avanzados: cifrado AES-256, TLS, seudonimizacion, DRP, pentesting, MFA, DPO, EIPD |
| **Upload de evidencia obligatorio** | Cada control requiere adjuntar evidencia documental (certificados, configuraciones, politicas) |
| **Vigencia de certificados** | Fecha de expiracion por evidencia con deteccion automatica de vencimiento |
| **Bloqueo de cierre sin evidencia** | Imposibilidad de cerrar un ciclo de seguridad si existen controles sin evidencia adjunta |
| **Notificacion de evidencia vencida** | Alertas automaticas cuando una evidencia esta proxima a expirar o ya ha vencido |

### Fundamento normativo

El Art. 14 quinquies exige que el responsable y el encargado adopten las medidas tecnicas y organizativas necesarias para garantizar la seguridad de los datos personales, considerando el estado de la tecnica, los costes de aplicacion, la naturaleza del tratamiento y los riesgos. La norma menciona explicitamente el cifrado, la seudonimizacion, la capacidad de restauracion y los procesos de verificacion periodica. Los dos niveles de checklists implementados mapean directamente a estas exigencias: el Nivel 1 cubre las medidas basicas aplicables a todo tratamiento, mientras que el Nivel 2 implementa las medidas avanzadas que la ley exige cuando el riesgo es alto. La obligatoriedad de evidencia documental responde al principio de responsabilidad proactiva (Art. 3 lit. e), que exige poder demostrar las medidas adoptadas.

---

## 9. Derechos ARCOP del Titular

**Base legal:** Art. 5-9 (derechos de acceso, rectificacion, cancelacion, oposicion, portabilidad), Art. 11 (plazos y procedimiento), Art. 8 ter (bloqueo)
**Clasificacion:** EXIGIDO

### Para el DPO y equipo tecnico

El modulo ARCOP implementa la gestion completa de derechos del titular con portal publico, SLA engine, workflow de aprobacion y propagacion a terceros. El portal publico incluye selector de empresa e Identity Gate con OTP para verificar la identidad del titular. Se soportan 7 tipos de derechos: Acceso, Rectificacion, Cancelacion, Oposicion, Portabilidad, Bloqueo y Revision de Decisiones Automatizadas. El SLA Engine controla el plazo legal de 30 dias corridos (Art. 11) con prorroga unica de 30 dias adicionales previa notificacion, y el plazo especial de 2 dias habiles para Bloqueo (Art. 8 ter). El escalamiento automatico notifica progresivamente: D20 al Operador, D25 al DPO, D29 al Legal, y post-vencimiento marca la solicitud como Vencida. Si el plazo se agota sin respuesta, se genera PRESUMED_DENIAL automatico. Las respuestas siguen workflow de aprobacion (Draft→DPO Review→Admin Approve→Sent) con 4 tipos de respuesta (Aprobada, Rechazada con derecho a reclamar, Parcial, Solicitud de Informacion Adicional). La portabilidad genera archivos JSON/CSV dentro de los 30 dias, limitada a datos automatizados con base en consentimiento. La supresion soporta tres modalidades: Hard Delete, Bloqueo y Anonimizacion, con Certificado de Destruccion PDF inmutable. La propagacion automatica notifica a terceros con PDF adjunto, y el titular puede presentar inconformidad y apelacion a traves del sistema.

### Para la gerencia

Los derechos ARCOP son las solicitudes que cualquier persona puede ejercer sobre sus datos personales, y la ley exige respuesta dentro de plazos estrictos con consecuencias legales por incumplimiento. Kulvio automatiza todo el ciclo: recepcion mediante portal publico con verificacion de identidad, asignacion al equipo, seguimiento de plazos con escalamiento automatico, aprobacion formal de la respuesta, y notificacion al titular. El sistema no permite que una solicitud se pierda o venza inadvertidamente: los escalamientos progresivos alertan a niveles superiores de la organizacion a medida que se acerca el plazo limite. Si la solicitud implica cancelacion, el sistema genera un certificado de destruccion PDF con valor probatorio. La propagacion automatica a terceros garantiza que la eliminacion se extienda a todos los destinatarios de los datos, como exige la ley.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Portal publico ARCOP** | Portal de acceso publico con selector de empresa e Identity Gate OTP para verificacion de identidad del titular |
| **7 tipos de derechos** | Acceso, Rectificacion, Cancelacion, Oposicion, Portabilidad, Bloqueo y Revision de Decisiones Automatizadas |
| **SLA Engine 30 dias** | Control automatico del plazo legal de 30 dias corridos (Art. 11) con countdown en tiempo real |
| **Plazo Bloqueo 2 dias habiles** | Plazo especial de 2 dias habiles para solicitudes de Bloqueo segun Art. 8 ter |
| **Prorroga +30 dias** | Extension unica de 30 dias adicionales con notificacion obligatoria al titular |
| **Escalamiento automatico** | Notificaciones progresivas: D20 Operador, D25 DPO, D29 Legal, post-vencimiento marca como Vencida |
| **Workflow aprobacion respuestas** | Cadena Draft, DPO Review, Admin Approve y Sent con control de transiciones |
| **4 tipos de respuesta** | Aprobada, Rechazada con derecho a reclamar ante la Agencia, Parcial, Solicitud de Informacion Adicional |
| **Portabilidad JSON/CSV** | Generacion de archivo de datos en formato estructurado dentro de 30 dias, limitada a datos automatizados con base consentimiento |
| **Supresion diferenciada** | Tres modalidades: Hard Delete, Bloqueo temporal y Anonimizacion irreversible |
| **Certificado de Destruccion PDF** | Documento PDF inmutable que acredita la eliminacion efectiva de los datos |
| **Propagacion a terceros** | Notificacion automatica a todos los destinatarios de los datos con PDF adjunto de la solicitud |
| **Inconformidad y Apelacion** | Mecanismo para que el titular presente inconformidad con la respuesta (AppealRecord) |
| **PRESUMED_DENIAL automatico** | Denegacion presunta generada automaticamente cuando vence el plazo sin respuesta |
| **Numero de seguimiento** | Token unico para que el titular pueda consultar el estado de su solicitud |
| **Response PDF** | Generacion automatica de PDF con la respuesta formal al titular |
| **Escalation log** | Registro detallado de cada escalamiento con timestamps y destinatarios |

### Fundamento normativo

Los articulos 5 a 9 de la Ley 21.719 establecen los derechos de acceso, rectificacion, cancelacion, oposicion y portabilidad de los titulares de datos personales. El Art. 11 fija el plazo de respuesta en 30 dias corridos, prorrogable por otros 30 con notificacion fundamentada. El Art. 8 ter establece el derecho de bloqueo con plazo especial de 2 dias habiles. La ley exige que la cancelacion se comunique a los terceros a quienes se hubieren cedido o comunicado los datos (propagacion). El incumplimiento de estos plazos y obligaciones puede derivar en sanciones administrativas por parte de la Agencia, incluyendo multas de hasta 5.000 UTM por infracciones graves. La denegacion presunta (PRESUMED_DENIAL) es un mecanismo procesal que habilita al titular a reclamar ante la Agencia cuando no recibe respuesta dentro del plazo legal.

---

## 10. Gestion de Consentimientos

**Base legal:** Art. 12 (consentimiento del titular), Art. 3 lit. a (principio de licitud y consentimiento), Art. 16 quater (datos de menores)
**Clasificacion:** EXIGIDO

### Para el DPO y equipo tecnico

El modulo de consentimientos provee un Widget JavaScript embebible configurable por tenant (API key, colores corporativos, nombre y URL) con CORS permisivo para integracion en sitios externos. Los consentimientos se gestionan con granularidad por finalidad (Marketing, Fidelizacion, Analisis), y cada registro genera un hash SHA-256 encadenado que forma una cadena de custodia inmutable. La revocacion es multicanal: via portal ARCOP por finalidad especifica o mediante link de opt-out en emails. El sistema mantiene una Suppression List con cruce automatico para prevenir comunicaciones a titulares que han revocado su consentimiento. Para cookies, el CMP Banner (consent-cmp.js) soporta integracion con Google Consent Mode, tres layouts configurables (Banner, Box, Side) y gestion de categorias de cookies (Necessary, Functional, Analytics, Marketing). Se generan avisos de privacidad automaticos y el tratamiento de datos de menores respeta la autonomia progresiva con franjas 0-13, 14-15, 16-17 y 18+ segun Art. 16 quater.

### Para la gerencia

El consentimiento es la base de licitud mas comun y la mas fiscalizada. Kulvio permite obtener, registrar y gestionar consentimientos de forma automatica a traves de un widget que se integra en su sitio web en minutos. Cada consentimiento queda registrado con evidencia inmutable que demuestra cuando, como y para que finalidad el titular dio su autorizacion. Cuando un titular revoca su consentimiento, el sistema actualiza automaticamente la lista de supresion y cruza con futuras comunicaciones, evitando infracciones por envio de comunicaciones no autorizadas. El banner de cookies cumple con los estandares internacionales y es compatible con Google Consent Mode, facilitando la adecuacion de su sitio web. El tratamiento especial de datos de menores de edad protege a su organizacion de las sanciones agravadas que la ley contempla para este tipo de datos.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Widget JavaScript embebible** | Widget configurable por tenant (API key, colores, nombre, URL) para captura de consentimiento en sitios externos |
| **CORS permisivo** | Configuracion de CORS abierta para permitir embedding del widget en cualquier dominio |
| **Granularidad por finalidad** | Consentimientos segmentados por finalidad: Marketing, Fidelizacion, Analisis y otras configurables |
| **Registro inmutable SHA-256** | Cada consentimiento genera un hash encadenado que forma una cadena de custodia inmutable |
| **Revocacion multicanal** | Revocacion via portal ARCOP por finalidad especifica o mediante link de opt-out en emails transaccionales |
| **Suppression List automatica** | Lista de supresion con cruce automatico para prevenir comunicaciones a titulares que han revocado consentimiento |
| **CMP Banner para cookies** | Banner de consentimiento de cookies (consent-cmp.js) con Google Consent Mode integration |
| **Layouts configurables** | Tres opciones de presentacion del banner: Banner horizontal, Box centrado y Side lateral |
| **Categorias de cookies** | Gestion diferenciada: Necessary (no desactivable), Functional, Analytics y Marketing |
| **Aviso de Privacidad generado** | Generacion automatica de aviso de privacidad para el sitio web del responsable |
| **Autonomia progresiva menores** | Franjas etarias 0-13, 14-15, 16-17 y 18+ con reglas diferenciadas segun Art. 16 quater |

### Fundamento normativo

El Art. 12 establece que el consentimiento debe ser libre, informado, especifico e inequivoco, y que el responsable debe poder acreditarlo. El Art. 3 literal a refuerza el principio de licitud y consentimiento como base del tratamiento. La granularidad por finalidad responde a la exigencia de especificidad del consentimiento: un consentimiento generico no cumple la ley. El registro inmutable con SHA-256 garantiza que el responsable pueda demostrar la existencia y alcance del consentimiento en caso de fiscalizacion o reclamo. El Art. 16 quater regula el tratamiento de datos de menores, estableciendo franjas de autonomia progresiva donde se requiere el consentimiento del representante legal o del menor segun su edad, lo que Kulvio implementa con reglas diferenciadas por franja etaria.

---

## 11. Gestion de Brechas de Seguridad

**Base legal:** Art. 14 sexies (deber de notificacion de vulneraciones de seguridad)
**Clasificacion:** EXIGIDO

### Para el DPO y equipo tecnico

El modulo de brechas implementa el ciclo completo de gestion de incidentes exigido por el Art. 14 sexies. Cualquier usuario puede reportar una brecha, incluyendo encargados de tratamiento a traves del Boton de Panico en el portal de vendors. El timestamp de deteccion se registra de forma inmutable para acreditar cumplimiento de plazos. El formulario de triaje estructurado captura cronologia, tipologia (confidencialidad, integridad, disponibilidad), volumen de registros afectados, origen del incidente y acciones de contencion. La calculadora de severidad aplica Hard Rules (datos sensibles, menores de edad o financieros implican notificacion mandatoria) y Soft Rules (evaluacion contextual para otros escenarios). El countdown configurable de 72 horas es referencial y el sistema genera borradores diferenciados: informe tecnico detallado para la Agencia en formato PDF y notificacion simplificada en lenguaje claro para los titulares afectados. La notificacion requiere aprobacion en cadena DPO→RDP, con override justificado inmutable para decisiones de no notificar. Cada brecha se vincula con las actividades RAT afectadas mediante Reverse Lookup por activos comprometidos.

### Para la gerencia

Una brecha de seguridad no gestionada correctamente puede resultar en las sanciones mas graves de la ley, incluyendo multas de hasta 5.000 UTM y dano reputacional significativo. Kulvio asegura que su organizacion detecte, documente y notifique cualquier incidente dentro de los plazos legales. El sistema automatiza la evaluacion de severidad para determinar si la notificacion a la Agencia y a los titulares es obligatoria, genera los informes diferenciados que la ley exige (tecnico para la Agencia, claro para los titulares), y mantiene un registro inmutable de cada decision tomada durante la gestion del incidente. La vinculacion con actividades de tratamiento afectadas permite identificar rapidamente el alcance del impacto. Todo el proceso queda documentado como evidencia de diligencia debida ante la Agencia.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Reporte por cualquier usuario** | Cualquier miembro de la organizacion puede reportar una brecha, incluyendo encargados via Boton de Panico |
| **Timestamp inmutable de deteccion** | Registro automatico e inalterable del momento de deteccion para acreditar plazos legales |
| **Formulario de triaje estructurado** | Captura sistematica de cronologia, tipologia, volumen, origen y acciones de contencion |
| **Calculadora de severidad** | Hard Rules (sensibles/menores/financieros = mandatorio) y Soft Rules (evaluacion contextual) |
| **Countdown configurable** | Temporizador referencial de 72 horas desde la deteccion con alertas progresivas |
| **Borrador tecnico para Agencia** | Informe detallado en formato PDF con toda la informacion requerida por el Art. 14 sexies |
| **Borrador simple para titulares** | Notificacion en lenguaje claro y accesible para los titulares afectados |
| **Aprobacion DPO y RDP** | Cadena de aprobacion obligatoria antes de enviar notificaciones |
| **Override justificado inmutable** | Posibilidad de decidir no notificar con justificacion documentada e inalterable |
| **Vinculacion con RAT** | Reverse Lookup que identifica las actividades de tratamiento afectadas por activos comprometidos |
| **Notificacion mandatoria** | Deteccion automatica de escenarios donde la notificacion a titulares es obligatoria por ley (sensibles, menores <14, financieros) |

### Fundamento normativo

El Art. 14 sexies obliga al responsable a comunicar las vulneraciones de seguridad a la Agencia de Proteccion de Datos Personales y, cuando la vulneracion pueda afectar gravemente los derechos del titular, tambien a los propios titulares. La notificacion debe incluir la naturaleza de la vulneracion, las categorias de datos afectados, las posibles consecuencias, las medidas adoptadas y los datos de contacto del DPO. La ley distingue entre la notificacion a la Agencia (informe tecnico completo) y la comunicacion a los titulares (lenguaje claro y comprensible), lo que Kulvio implementa mediante borradores diferenciados. El timestamp inmutable y la cadena de aprobacion documentan el cumplimiento diligente de los plazos, que constituye un factor atenuante en caso de procedimiento sancionatorio.

---

## 12. Gestion de Terceros / Encargados

**Base legal:** Art. 15 bis (relacion responsable-encargado de tratamiento), Art. 14 (registro de destinatarios)
**Clasificacion:** EXIGIDO

### Para el DPO y equipo tecnico

El modulo de terceros implementa la gestion completa de la relacion con encargados de tratamiento segun el Art. 15 bis. Incluye CRUD completo de vendors con DPA digital Send-to-Sign que utiliza firma electronica simple conforme a la Ley 19.799. Los DPA son bidireccionales (OUTBOUND cuando la organizacion es responsable, INBOUND cuando es encargada) y siguen un ciclo de estados: Draft, Enviado, Negociacion, Firmado, Expirado y Terminado. El sistema bloquea la operacion con un encargado que no tenga DPA vigente. El Portal del Encargado, accesible via Magic Link sin necesidad de cuenta en la plataforma, permite al tercero firmar el DPA, reportar brechas de seguridad, subir certificaciones y gestionar tareas asignadas. La evaluacion de riesgo se realiza mediante VendorAssessment, y las certificaciones del vendor (ISO 27001, SOC 2, entre otras) se registran con vigencia. Al terminar un contrato, el sistema genera automaticamente una tarea de destruccion de datos. La integracion con el Wizard Step 5 vincula los terceros con las actividades de tratamiento correspondientes.

### Para la gerencia

La Ley 21.719 hace responsable a su organizacion por las acciones de sus proveedores que tratan datos personales. Kulvio centraliza la gestion de todos los terceros con contratos digitales que se firman electronicamente, eliminando el riesgo de operar sin contrato vigente. El portal de autoservicio permite que sus proveedores firmen el DPA, reporten incidentes y suban certificaciones sin necesidad de intervenir manualmente. El sistema alerta automaticamente cuando un contrato esta por vencer y genera tareas de destruccion de datos al terminar la relacion, asegurando que no queden obligaciones pendientes. La evaluacion de riesgo de vendors permite priorizar la supervision en aquellos proveedores que representan mayor riesgo para sus datos personales.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **CRUD completo de vendors** | Registro, edicion, eliminacion y consulta de todos los terceros que tratan datos en nombre de la organizacion |
| **DPA digital Send-to-Sign** | Contrato de encargo de tratamiento con firma electronica simple conforme a Ley 19.799 |
| **DPA bidireccional** | Soporte para DPA OUTBOUND (organizacion como responsable) e INBOUND (organizacion como encargada) |
| **Estados del contrato** | Ciclo de vida completo: Draft, Enviado, Negociacion, Firmado, Expirado y Terminado |
| **Bloqueo sin DPA vigente** | Imposibilidad de operar con un encargado que no tenga contrato de tratamiento firmado y vigente |
| **Portal del Encargado** | Acceso via Magic Link para firma de DPA, reporte de brechas, upload de certificaciones y gestion de tareas |
| **Evaluacion de riesgo (VendorAssessment)** | Cuestionario de evaluacion de riesgo para clasificar el nivel de supervision requerido por vendor |
| **Certificaciones del vendor** | Registro de certificaciones (ISO 27001, SOC 2, etc.) con fecha de vigencia y alertas de vencimiento |
| **Tarea destruccion al terminar** | Generacion automatica de tarea de destruccion de datos cuando se termina la relacion contractual |
| **Wizard Step 5 integracion** | Vinculacion de terceros con actividades de tratamiento desde el paso 5 del wizard de implementacion |
| **Notificacion DPA vencido** | Alertas automaticas cuando un DPA esta proximo a expirar o ya ha vencido |

### Fundamento normativo

El Art. 15 bis de la Ley 21.719 exige que el tratamiento de datos por un encargado se rija por un contrato que establezca el objeto, la duracion, la naturaleza y la finalidad del tratamiento, el tipo de datos, las categorias de titulares y las obligaciones del encargado. El contrato debe garantizar que el encargado trate los datos unicamente conforme a las instrucciones del responsable, implemente medidas de seguridad adecuadas, y devuelva o destruya los datos al termino de la relacion. El Art. 14 exige incluir en el registro de actividades a los destinatarios de los datos, lo que incluye a los encargados. El bloqueo por ausencia de DPA y la tarea de destruccion al terminar implementan directamente las obligaciones legales de formalizacion contractual y disposicion final de los datos.

---

## 13. Transferencias Internacionales

**Base legal:** Art. 27 (regimen de transferencia internacional de datos), Art. 28 (garantias adecuadas)
**Clasificacion:** EXIGIDO

### Para el DPO y equipo tecnico

El modulo de transferencias internacionales automatiza la evaluacion de adecuacion y la exigencia de garantias para transferencias cross-border. El sistema mantiene una tabla maestra de paises con nivel de adecuacion referencial (EEE, Argentina, Uruguay, UK, entre otros) y verifica automaticamente si el pais de destino cuenta con proteccion adecuada. Cuando el pais no es adecuado, se exige la implementacion de garantias apropiadas (Clausulas Contractuales Tipo/SCC, Normas Corporativas Vinculantes/BCR, Certificacion, o Consentimiento explicito del titular) con upload obligatorio de la documentacion de respaldo. El Cloud Region Mapping mapea regiones de AWS, Azure y GCP al pais correspondiente y su nivel de adecuacion, y genera alertas por replicacion multi-region cuando los datos se alojan en regiones con diferentes niveles de proteccion. El sistema bloquea el cierre de una actividad RAT si existen transferencias sin base de licitud resuelta. La vista consolidada en /transfers ofrece una vision cross-actividad de todas las transferencias de la organizacion, y el modelo CountryAdequacyHistory registra cambios regulatorios en el nivel de adecuacion de cada pais para trazabilidad temporal.

### Para la gerencia

Las transferencias internacionales de datos personales son una de las areas de mayor riesgo regulatorio bajo la Ley 21.719. Si su organizacion utiliza servicios cloud, proveedores internacionales o tiene operaciones en multiples paises, necesita demostrar que cada transferencia cuenta con una base legal valida. Kulvio automatiza esta evaluacion: identifica automaticamente los paises donde se alojan sus datos (incluyendo servicios cloud como AWS, Azure y GCP), verifica si cuentan con nivel de proteccion adecuado, y exige las garantias documentales cuando no lo tienen. El bloqueo por ausencia de base legal previene que su organizacion realice transferencias sin respaldo, y la vista consolidada le permite supervisar todas las transferencias en un solo panel. Los cambios regulatorios en niveles de adecuacion quedan registrados historicamente para demostrar diligencia ante la Agencia.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Check de adecuacion automatico** | Verificacion automatica del nivel de adecuacion del pais de destino contra tabla maestra actualizable |
| **Lista de paises adecuados** | Tabla referencial de paises con proteccion adecuada: EEE, Argentina, Uruguay, UK y otros reconocidos |
| **Exigencia de garantias** | Requerimiento automatico de SCC, BCR, Certificacion o Consentimiento cuando el destino no es adecuado |
| **Upload de garantia documental** | Upload obligatorio de la documentacion que respalda la garantia seleccionada |
| **Cloud Region Mapping** | Mapeo de regiones de AWS, Azure y GCP al pais correspondiente y su nivel de adecuacion |
| **Alerta multi-region** | Deteccion y alerta cuando los datos se replican en regiones con diferentes niveles de proteccion |
| **Bloqueo cierre RAT** | Imposibilidad de cerrar una actividad de tratamiento si existen transferencias sin base de licitud resuelta |
| **Vista consolidada /transfers** | Panel unificado cross-actividad con todas las transferencias internacionales de la organizacion |
| **CountryAdequacyHistory** | Registro historico de cambios regulatorios en el nivel de adecuacion de cada pais |

### Fundamento normativo

El Art. 27 de la Ley 21.719 establece que la transferencia internacional de datos personales solo puede realizarse cuando el pais u organizacion internacional destinataria ofrezca niveles adecuados de proteccion, conforme a lo que determine la Agencia. El Art. 28 enumera las garantias adecuadas que permiten la transferencia cuando no existe declaracion de adecuacion: clausulas contractuales tipo aprobadas por la Agencia, normas corporativas vinculantes, certificaciones de proteccion de datos reconocidas, o consentimiento expreso e informado del titular. La tabla maestra de paises implementa el concepto de evaluacion de adecuacion, mientras que el Cloud Region Mapping extiende esta evaluacion al contexto cloud donde la ubicacion fisica de los datos depende de la configuracion de la infraestructura del proveedor y no siempre es transparente para el responsable.

---

## 14. Canal de Denuncias

**Base legal:** Art. 14 quinquies + Art. 49 (modelo de prevencion de infracciones)
**Clasificacion:** BUENA PRACTICA

### Para el DPO y equipo tecnico

Kulvio implementa un canal de denuncias con arquitectura de privacidad reforzada que separa fisicamente los datos del denunciante del contenido del reporte. El portal publico soporta denuncias anonimas y nominadas con generacion automatica de token de seguimiento. El sistema aplica IP masking automatico y metadata stripping en adjuntos para garantizar el anonimato tecnico. La investigacion sigue un workflow inmutable con estados diferenciados (UNDER_INVESTIGATION, CONCLUDED, CLOSED, ESCALATED) y timeline interno no editable. La asignacion a investigadores genera notificaciones automaticas, y los datos del denunciante se almacenan en registros separados accesibles unicamente por roles autorizados.

### Para la gerencia

Un canal de denuncias profesional reduce drasticamente el riesgo de sanciones al demostrar la existencia de un modelo de prevencion de infracciones ante la Agencia de Proteccion de Datos. La plataforma ofrece un portal publico accesible sin autenticacion donde cualquier persona puede reportar irregularidades en el tratamiento de datos personales. El seguimiento anonimo mediante token permite al denunciante consultar el estado de su reporte sin revelar su identidad. Este mecanismo fortalece la cultura de cumplimiento interno, genera evidencia de debida diligencia y constituye un atenuante reconocido por la ley ante eventuales procedimientos sancionatorios.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Portal publico anonimo/nominado** | Formulario accesible sin autenticacion con opcion de denuncia anonima o con identificacion del denunciante |
| **Token de seguimiento** | Generacion automatica de token unico para que denunciantes anonimos consulten el estado de su reporte |
| **IP masking automatico** | Eliminacion automatica de la direccion IP del denunciante para garantizar anonimato tecnico |
| **Metadata stripping** | Remocion de metadatos EXIF y propiedades de archivos adjuntos que podrian identificar al denunciante |
| **Formulario estructurado** | Campos tipificados: tipo de denuncia, categoria, descripcion detallada y carga de evidencia |
| **Workflow de investigacion** | Estados UNDER_INVESTIGATION, CONCLUDED, CLOSED y ESCALATED con transiciones controladas |
| **Asignacion a investigador** | Designacion de responsable de investigacion con notificacion automatica por email |
| **Timeline interno inmutable** | Registro cronologico no editable de todas las acciones realizadas durante la investigacion |
| **Proteccion al denunciante** | Datos personales del denunciante almacenados en registros separados del contenido del reporte |
| **Portal de seguimiento con token** | Pagina publica donde el denunciante consulta el estado de su reporte ingresando su token |

### Fundamento normativo

El Art. 14 quinquies de la Ley 21.719 establece la obligacion del responsable de adoptar medidas de prevencion y cumplimiento, incluyendo mecanismos de reporte interno. El Art. 49 reconoce como atenuante de responsabilidad la existencia de un modelo de prevencion de infracciones que contemple canales de denuncia accesibles. Si bien la ley no exige explicitamente un canal de denuncias dedicado a proteccion de datos, su implementacion constituye evidencia concreta de diligencia en la prevencion de infracciones. La separacion de datos del denunciante respecto del contenido del reporte implementa el principio de minimizacion del Art. 3 lit. d, mientras que el IP masking y metadata stripping refuerzan la proteccion tecnica del anonimato.

---

## 15. Proteccion de Datos por Diseno (PbD)

**Base legal:** Art. 14 quater (proteccion de datos desde el diseno y por defecto)
**Clasificacion:** EXIGIDO

### Para el DPO y equipo tecnico

El modulo PbD de Kulvio estructura la evaluacion de privacidad desde el diseno mediante un sub-wizard de 4 secciones: identificacion del proyecto, justificacion de datos con minimizacion documentada, privacidad por defecto con defaults restrictivos, y medidas tecnicas y organizacionales. La tabla normalizada PbdDataJustification constituye evidencia legal de minimizacion por cada dato recopilado. El workflow DRAFT, IN_REVIEW, APPROVED incluye firma digital SHA-256, analisis DPO IA via OpenRouter con scoring en 4 dimensiones (completitud, minimizacion, defaults, medidas), y opinion DPO humana obligatoria antes de aprobacion. El PDF dictamen descargable y las 3 notificaciones automaticas completan el ciclo de accountability.

### Para la gerencia

La proteccion de datos desde el diseno es una obligacion legal directa del Art. 14 quater: todo nuevo proyecto, sistema o proceso que involucre datos personales debe evaluarse antes de su implementacion. Kulvio transforma esta obligacion en un flujo guiado que cualquier area de negocio puede completar, con asistencia de inteligencia artificial para identificar debilidades y fortalezas. El score PbD de 0 a 100 proporciona una metrica objetiva para la toma de decisiones gerenciales, mientras que el dictamen PDF descargable sirve como evidencia ante auditorias y requerimientos de la Agencia. Adoptar PbD sistematicamente reduce el costo de remediacion y evita sanciones por negligencia en el diseno de sistemas.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Sub-wizard 4 secciones** | Flujo guiado: identificacion del proyecto, justificacion de datos, privacidad por defecto y medidas tecnicas/organizacionales |
| **Justificacion de datos normalizada** | Tabla PbdDataJustification como evidencia legal de minimizacion por cada dato personal recopilado |
| **Privacidad por defecto** | Configuracion de defaults restrictivos documentados para cada tratamiento evaluado |
| **Medidas tecnicas y organizacionales** | Registro estructurado de controles de seguridad aplicados al proyecto |
| **Workflow DRAFT, IN_REVIEW, APPROVED** | Ciclo de vida con transiciones controladas y firma digital SHA-256 en aprobacion |
| **Analisis DPO IA** | Evaluacion automatizada via OpenRouter con fortalezas, debilidades, recomendaciones y score |
| **Opinion DPO humana obligatoria** | Requisito de validacion humana por el DPO antes de la aprobacion final |
| **Score PbD 0-100** | Metrica calculada en 4 dimensiones: completitud, minimizacion, defaults y medidas |
| **PDF dictamen descargable** | Generacion de dictamen en formato PDF mediante xhtml2pdf para archivo y evidencia |
| **Notificaciones automaticas** | 3 templates (NTF-PBD-001, NTF-PBD-002, NTF-PBD-003) para eventos del workflow |

### Fundamento normativo

El Art. 14 quater de la Ley 21.719 establece que el responsable de datos debe aplicar medidas tecnicas y organizativas apropiadas con miras a cumplir los principios de la ley y proteger los derechos de los titulares desde el diseno y por defecto. Esto implica que antes de implementar cualquier nuevo tratamiento de datos personales, la organizacion debe evaluar su impacto en la privacidad y adoptar configuraciones restrictivas por defecto. La tabla PbdDataJustification documenta la base de minimizacion exigida por el Art. 3 lit. d, mientras que el workflow con firma digital y opinion DPO genera la trazabilidad que el principio de responsabilidad del Art. 3 lit. g demanda.

---

## 16. Impugnacion de Decisiones Automatizadas

**Base legal:** Art. 8 bis (derecho a la impugnacion de decisiones automatizadas)
**Clasificacion:** EXIGIDO

### Para el DPO y equipo tecnico

Kulvio implementa el derecho a impugnar decisiones automatizadas como un tipo especializado de solicitud ARCOP (AUTOMATED_DECISION_REVIEW) con 4 campos especificos: descripcion de la decision impugnada, actividad RAT vinculada, revisor humano asignado y resultado (Mantenida, Revertida o Modificada). El portal publico muestra el campo condicional solo cuando el titular selecciona este tipo de solicitud. La revision humana es obligatoria antes de la aprobacion, cumpliendo el requisito legal de intervencion humana significativa. La vinculacion con actividades RAT que declaren decisiones automatizadas permite trazabilidad completa. Dos notificaciones automaticas (NTF-ARCOP-007, NTF-ARCOP-008) cubren la recepcion y resolucion.

### Para la gerencia

Las decisiones basadas exclusivamente en algoritmos o inteligencia artificial generan un riesgo legal especifico bajo la nueva ley chilena: el titular puede exigir revision humana de cualquier decision automatizada que le afecte significativamente. Kulvio integra este derecho directamente en el portal publico de solicitudes, eliminando la necesidad de procesos manuales paralelos. El flujo garantiza que toda impugnacion sea revisada por una persona antes de su resolucion, generando evidencia de cumplimiento del Art. 8 bis. Para organizaciones que utilizan scoring crediticio, perfilamiento o sistemas de recomendacion, este modulo es esencial para evitar sanciones por denegacion del derecho de impugnacion.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Tipo ARCOP especializado** | Solicitud AUTOMATED_DECISION_REVIEW integrada en el flujo general de derechos del titular |
| **Campos especificos** | Descripcion de la decision impugnada, actividad RAT vinculada, revisor humano y resultado |
| **Portal publico condicional** | Campo de decision impugnada visible solo cuando el titular selecciona impugnacion de decision automatizada |
| **Revision humana obligatoria** | Requisito de intervencion humana significativa antes de la aprobacion de la respuesta |
| **Vinculacion con actividades RAT** | Conexion directa con actividades de tratamiento que declaren uso de decisiones automatizadas |
| **Resultado tipificado** | Resolucion con opciones Mantenida, Revertida o Modificada para trazabilidad estadistica |
| **Notificaciones automaticas** | Templates NTF-ARCOP-007 (recepcion) y NTF-ARCOP-008 (resolucion) con datos contextuales |

### Fundamento normativo

El Art. 8 bis de la Ley 21.719 consagra el derecho del titular a oponerse y solicitar revision de decisiones adoptadas exclusivamente con base en el tratamiento automatizado de sus datos personales, incluida la elaboracion de perfiles, cuando dichas decisiones produzcan efectos juridicos o le afecten significativamente. La norma exige que el responsable proporcione una revision humana significativa de la decision, no una mera ratificacion automatica. La implementacion como tipo ARCOP especializado garantiza que estas solicitudes se gestionen con los mismos estandares de SLA, trazabilidad y notificacion que el resto de derechos ARCOP, mientras que la vinculacion con el RAT permite verificar que la actividad de tratamiento efectivamente involucra decisiones automatizadas.

---

## 17. Audit Log Inmutable

**Base legal:** Art. 14 + Art. 3 lit. g (principio de responsabilidad)
**Clasificacion:** EXIGIDO

### Para el DPO y equipo tecnico

El audit log de Kulvio implementa una cadena de hashes SHA-256 encadenados (blockchain-lite) donde cada entrada referencia el hash de la anterior, haciendo detectable cualquier alteracion retroactiva. El modelo es WORM (Write Once Read Many): los registros de la tabla audit_log_entries no admiten UPDATE ni DELETE a nivel de aplicacion. Cada accion critica del sistema genera automaticamente una entrada con actor, entidad, accion, timestamp y metadata contextual. La exportacion soporta tres formatos (PDF firmado, JSON y CSV) con checksum de integridad verificable. El mecanismo de Legal Hold permite activar retenciones legales que bloquean la purga automatica, con retencion adicional post-remocion configurable.

### Para la gerencia

El principio de responsabilidad de la ley chilena exige que la organizacion pueda demostrar el cumplimiento de sus obligaciones en cualquier momento. El audit log inmutable de Kulvio genera automaticamente un registro inalterable de todas las acciones criticas realizadas en la plataforma, desde la creacion de actividades de tratamiento hasta la respuesta a solicitudes de titulares. Esta bitacora constituye evidencia probatoria ante la Agencia de Proteccion de Datos, auditorias externas y procedimientos judiciales. La capacidad de exportar registros firmados con checksum verificable y de activar retenciones legales sobre periodos especificos garantiza que la organizacion siempre cuente con respaldo documental de sus acciones de compliance.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Hash SHA-256 encadenado** | Cada entrada incluye el hash de la entrada anterior, creando una cadena verificable tipo blockchain-lite |
| **Inmutabilidad WORM** | Politica Write Once Read Many: los registros no admiten modificacion ni eliminacion a nivel de aplicacion |
| **Registro automatico** | Captura automatica de todas las acciones criticas del sistema sin intervencion del usuario |
| **Exportacion PDF firmado** | Generacion de reporte PDF con firma digital y checksum de integridad verificable |
| **Exportacion JSON y CSV** | Formatos adicionales de exportacion con checksum para integracion con sistemas externos |
| **Legal Hold** | Activacion de retenciones legales que bloquean la purga automatica de registros afectados |
| **Retencion post-remocion** | Periodo configurable de retencion adicional tras la desactivacion de un Legal Hold |
| **Busqueda avanzada** | Filtros por actor, entidad, tipo de accion, rango de fechas y metadata contextual |
| **Retencion configurable** | Periodo de retencion ajustable segun politicas internas de la organizacion |

### Fundamento normativo

El Art. 14 de la Ley 21.719 establece el deber del responsable de datos de adoptar las medidas necesarias para cumplir adecuadamente los principios, derechos y obligaciones de la ley. El Art. 3 lit. g consagra el principio de responsabilidad, que exige al responsable acreditar la legitimidad del tratamiento y el cumplimiento de sus obligaciones. La cadena de hashes SHA-256 inmutable implementa este principio al generar un registro probatorio no repudiable de todas las acciones de compliance. El mecanismo de Legal Hold responde a la necesidad de preservar evidencia ante procedimientos administrativos o judiciales, mientras que la exportacion firmada permite la presentacion de pruebas con garantia de integridad ante la Agencia o tribunales.

---

## 18. Motor de Notificaciones

**Base legal:** Art. 14 + Art. 14 sexies + Art. 11 (deber de informar, notificacion de brechas, comunicacion al titular)
**Clasificacion:** EXIGIDO

### Para el DPO y equipo tecnico

Kulvio integra un motor de notificaciones con mas de 52 templates en base de datos, agrupados en 8 categorias (AUTH, RAT, RISK, EIPD, ARCOP, BREACH, VENDOR, SYSTEM, PBD). Soporta multi-canal: email via SendGrid, Slack con Block Kit y Microsoft Teams con Adaptive Cards, con encryption AES-GCM para URLs de webhook. El sistema de retry automatico implementa backoff exponencial (5m, 30m, 2h) con maximo 3 reintentos por notificacion. Nueve scheduled checks cubren escenarios criticos: countdown de brechas, wizard incompleto, DPA sin firmar, DPO ausente, evidencia expirada, digest de compliance, vencimiento DPA, campos pendientes y escalamiento. Las preferencias por usuario permiten opt-out granular sin afectar notificaciones criticas de seguridad.

### Para la gerencia

La ley chilena establece plazos estrictos para notificar brechas de seguridad y responder solicitudes de titulares, con sanciones significativas por incumplimiento. El motor de notificaciones de Kulvio automatiza completamente el seguimiento de estos plazos, alertando proactivamente al equipo antes de que se venzan los terminos legales. La integracion con Slack y Microsoft Teams asegura que las alertas lleguen a los canales donde el equipo realmente trabaja, no solo al correo electronico. Los 9 checks programados funcionan como un sistema de alerta temprana que identifica riesgos de incumplimiento antes de que se materialicen, reduciendo la exposicion a multas y protegiendo la reputacion de la organizacion.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **52+ templates en DB** | Plantillas agrupadas en 8 categorias con variables dinamicas contextuales por tipo de evento |
| **Multi-canal** | Envio por email (SendGrid), Slack (Block Kit) y Microsoft Teams (Adaptive Cards) |
| **Webhook encryption AES-GCM** | Cifrado de URLs de webhook para proteger credenciales de integracion almacenadas |
| **Preferencias por usuario** | Configuracion individual de opt-out/opt-in por categoria de notificacion |
| **Retry con backoff exponencial** | Reintentos automaticos a los 5 minutos, 30 minutos y 2 horas, con maximo 3 intentos |
| **Webhook SendGrid** | Recepcion de eventos de delivery (delivered, bounced, dropped) para tracking de entrega |
| **9 scheduled checks** | Checks programados: breach_countdown, wizard_incomplete, dpa_unsigned, dpo_missing, evidence_expired, compliance_digest, dpa_expiration, pending_fields, pending_fields_escalation |
| **Settings por tenant** | Habilitacion o deshabilitacion de categorias completas de notificacion por organizacion |
| **Cron HTTP endpoints** | Endpoints /api/cron/notifications con autenticacion X-Cron-Key para ejecucion externa |

### Fundamento normativo

El Art. 14 sexies de la Ley 21.719 obliga al responsable a comunicar las vulneraciones a las medidas de seguridad tanto a la Agencia como a los titulares afectados dentro de plazos perentorios. El Art. 11 establece el deber de informar al titular sobre el tratamiento de sus datos. El Art. 14 impone el deber general de adoptar medidas para cumplir la ley. El motor de notificaciones automatiza el cumplimiento de estos deberes mediante alertas proactivas que anticipan vencimientos legales, notificaciones multicanal que aseguran la recepcion efectiva, y un sistema de retry que garantiza la entrega incluso ante fallos temporales de infraestructura. Los 9 scheduled checks implementan vigilancia continua sobre los escenarios de mayor riesgo sancionatorio.

---

## 19. Repositorio Documental (Wiki)

**Base legal:** Art. 14 + Art. 49 (modelo de prevencion de infracciones)
**Clasificacion:** BUENA PRACTICA

### Para el DPO y equipo tecnico

El repositorio documental de Kulvio combina un sistema wiki con workflow editorial completo (DRAFT, IN_REVIEW, APPROVED, PUBLISHED, ARCHIVED) y editor WYSIWYG TinyMCE 7 con almacenamiento en Markdown. Soporta wiki links bidireccionales con tres sintaxis ([[CODE]], [[CODE|texto]], [[MODULE:identifier]]) y backlinks automaticos. Las 58 plantillas ISO predefinidas con variable substitution aceleran la creacion de politicas y procedimientos. La lectura obligatoria genera registros inmutables (DocumentReadConfirmation), las revisiones periodicas se crean automaticamente via scheduler con deteccion de overdue, y los Document Quizzes AI (OpenRouter Gemini 2.0 Flash) validan la comprension efectiva. Document Signatures OTP con hash SHA-256 y TTL de 15 minutos proporcionan firma electronica inmutable.

### Para la gerencia

Un modelo de prevencion de infracciones requiere politicas y procedimientos documentados, actualizados y conocidos por todo el personal. Kulvio transforma esta obligacion en un sistema documental inteligente con 58 plantillas ISO listas para personalizar, eliminando la necesidad de redactar politicas desde cero. El seguimiento automatico de lecturas obligatorias genera evidencia de que cada colaborador conoce las politicas vigentes, mientras que los quizzes AI verifican la comprension real, no solo la lectura formal. Las revisiones periodicas automatizadas aseguran que ningun documento quede obsoleto. Este conjunto de funcionalidades constituye evidencia directa del modelo de prevencion de infracciones reconocido por el Art. 49 como atenuante ante la Agencia.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Workflow editorial** | Ciclo DRAFT, IN_REVIEW, APPROVED, PUBLISHED, ARCHIVED con transiciones controladas por rol |
| **Editor WYSIWYG TinyMCE 7** | Editor de texto enriquecido con almacenamiento interno en formato Markdown |
| **Wiki links bidireccionales** | Sintaxis [[CODE]], [[CODE texto]] y [[MODULE:identifier]] con backlinks automaticos |
| **58 plantillas ISO** | Templates predefinidos con variable substitution ([ORGANIZATION_NAME], etc.) listos para personalizar |
| **Lectura obligatoria inmutable** | Registro DocumentReadConfirmation no editable ni eliminable como evidencia de conocimiento |
| **Revisiones periodicas** | Scheduler auto-create de tareas de revision con deteccion de overdue y recordatorios |
| **Document Links a modulos** | Vinculacion bidireccional de documentos con brechas, vendors y actividades RAT |
| **Confidencialidad 4 niveles** | Clasificacion PUBLIC, INTERNAL, CONFIDENTIAL, RESTRICTED con filtro automatico por rol |
| **PDF export** | Generacion de documentos en formato PDF via xhtml2pdf para archivo y distribucion |
| **Document Quizzes AI** | Evaluaciones multiple choice generadas por IA (OpenRouter Gemini 2.0 Flash) con passing score y max attempts |
| **Document Signatures OTP** | Firma electronica con hash SHA-256, OTP de 15 minutos de vigencia y registro inmutable |
| **Document Statistics** | Metricas de porcentaje de lectura, firma y aprobacion de quizzes por documento |
| **Document Sections** | Organizacion jerarquica de contenido dentro de cada documento |
| **Document Suggestions AI** | Generacion asistida de contenido mediante inteligencia artificial integrada en el editor |

### Fundamento normativo

El Art. 14 de la Ley 21.719 exige al responsable adoptar medidas necesarias para cumplir la ley, lo que incluye la documentacion de politicas y procedimientos de proteccion de datos. El Art. 49 reconoce como atenuante la existencia de un modelo de prevencion de infracciones que contemple, entre otros elementos, la adopcion de politicas y procedimientos de cumplimiento y su comunicacion efectiva al personal. Las lecturas obligatorias inmutables y los quizzes AI generan evidencia concreta de que las politicas no solo existen sino que son conocidas y comprendidas por los colaboradores. Las revisiones periodicas automatizadas aseguran la vigencia continua del marco documental, cumpliendo con el requisito de actualizacion permanente del modelo de prevencion.

---

## 20. Motor de Reglas Legales

**Base legal:** Art. 14 + Art. 3 (principios del tratamiento)
**Clasificacion:** BUENA PRACTICA

### Para el DPO y equipo tecnico

El motor de reglas legales de Kulvio parametriza la logica normativa en una tabla dedicada (legal_rules) con versionamiento semantico, eliminando la necesidad de modificar codigo para ajustar umbrales regulatorios. Cada regla se identifica por un codigo unico referenciable desde la logica de negocio y se agrupa en categorias (RISK, EIPD, CONSENT, TRANSFER, BREACH, DATA_LIFECYCLE, SECURITY). El back-office en /legal/admin/ permite activar, desactivar y modificar reglas sin necesidad de deploy. Los umbrales configurables (como INT_LARGE_SCALE_THRESHOLD para tratamiento a gran escala) permiten adaptar la plataforma a interpretaciones regulatorias que evolucionen con los pronunciamientos de la Agencia. La semilla de datos incluye las reglas derivadas de la Ley 21.719 y su reglamento.

### Para la gerencia

La regulacion de proteccion de datos es dinamica: la Agencia emitira pronunciamientos, guias y resoluciones que modificaran la interpretacion de la ley. Un motor de reglas legales parametrizable permite a la organizacion adaptar la plataforma a estos cambios sin depender de desarrolladores ni actualizaciones de software. Cuando la Agencia defina, por ejemplo, que constituye "tratamiento a gran escala", el DPO simplemente ajusta el umbral en el back-office y toda la plataforma se adapta automaticamente. Esta flexibilidad protege la inversion tecnologica de la organizacion y garantiza cumplimiento continuo ante un marco regulatorio en evolucion, sin costos adicionales de desarrollo.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Reglas parametrizadas** | Logica normativa almacenada en tabla legal_rules con valores configurables sin modificar codigo |
| **Versionamiento semantico** | Control de versiones de reglas para trazabilidad de cambios regulatorios |
| **Back-office /legal/admin/** | Interfaz de administracion para gestionar reglas sin acceso tecnico |
| **Categorias de reglas** | Agrupacion en RISK, EIPD, CONSENT, TRANSFER, BREACH, DATA_LIFECYCLE y SECURITY |
| **Umbrales configurables** | Valores ajustables como INT_LARGE_SCALE_THRESHOLD adaptables a interpretaciones regulatorias |
| **Activacion sin deploy** | Habilitacion o deshabilitacion de reglas en caliente sin reinicio de la aplicacion |
| **Referencia por codigo unico** | Identificador unico por regla para referencia directa desde la logica de negocio |
| **Semilla Ley 21.719** | Datos iniciales con las reglas derivadas de la ley chilena y su reglamento |

### Fundamento normativo

El Art. 14 de la Ley 21.719 impone al responsable el deber de adoptar medidas necesarias para cumplir los principios, derechos y obligaciones de la ley. El Art. 3 establece los principios que rigen el tratamiento de datos personales, muchos de los cuales requieren evaluaciones cuantitativas (proporcionalidad, minimizacion, tratamiento a gran escala). La parametrizacion de estos umbrales en un motor de reglas permite adaptar la plataforma a las interpretaciones oficiales que emita la Agencia de Proteccion de Datos mediante resoluciones, instructivos generales y guias tecnicas. El versionamiento semantico de reglas genera trazabilidad de como ha evolucionado la configuracion normativa de la organizacion, evidenciando diligencia ante cambios regulatorios.

---

## 21. Dashboard y KPIs

**Base legal:** Art. 14 + Art. 3 lit. g (principio de responsabilidad y deber de acreditar cumplimiento)
**Clasificacion:** BUENA PRACTICA

### Para el DPO y equipo tecnico

El dashboard ejecutivo de Kulvio presenta semaforos de compliance por modulo con KPI Snapshots diarios por tenant que registran compliance score, totales y tendencias. La Trend API soporta analisis en ventanas de 30 dias, 90 dias y year-to-date con graficos de evolucion temporal. Las alertas por modulo identifican actividades RAT sin aprobar, EIPD pendientes, brechas abiertas y DPA por vencer. Las metricas de ARCOP incluyen cumplimiento de SLA, tiempos promedio de respuesta y distribucion por tipo de derecho. El refresh parcial via HTMX en tres endpoints (/dashboard/kpis, /dashboard/modules, /dashboard/timeline) permite actualizacion en tiempo real sin recarga completa de la pagina.

### Para la gerencia

La direccion de la organizacion necesita visibilidad ejecutiva del estado de cumplimiento sin depender de reportes manuales del equipo de compliance. El dashboard de Kulvio proporciona una vista consolidada con semaforos intuitivos que permiten identificar en segundos las areas que requieren atencion inmediata. Los KPI Snapshots diarios generan un historial de evolucion que demuestra ante la Agencia el compromiso sostenido con la mejora continua del programa de proteccion de datos. Las tendencias a 30, 90 dias y anual permiten medir el retorno de la inversion en compliance y justificar presupuesto ante el directorio con datos objetivos en lugar de percepciones subjetivas.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Semaforos de compliance** | Indicadores visuales por modulo con estados verde, amarillo y rojo segun nivel de cumplimiento |
| **KPI Snapshots diarios** | Registro automatico diario por tenant de compliance score, totales y tendencias |
| **Trend API 30d/90d/YTD** | Analisis de tendencias en ventanas temporales configurables con datos historicos |
| **Graficos de evolucion** | Visualizacion temporal del progreso de compliance con graficos interactivos |
| **Alertas por modulo** | Identificacion de RAT sin aprobar, EIPD pendientes, brechas abiertas y DPA por vencer |
| **Metricas ARCOP** | Cumplimiento de SLA, tiempos promedio de respuesta y distribucion por tipo de derecho |
| **Refresh parcial HTMX** | Actualizacion en tiempo real de secciones /dashboard/kpis, /dashboard/modules y /dashboard/timeline |

### Fundamento normativo

El Art. 14 de la Ley 21.719 exige al responsable adoptar medidas para cumplir la ley, y el Art. 3 lit. g consagra el principio de responsabilidad que obliga a acreditar la legitimidad del tratamiento y el cumplimiento de obligaciones. Un dashboard con KPIs historicos constituye evidencia objetiva y cuantificable del estado de cumplimiento de la organizacion en cualquier momento. Los snapshots diarios generan un registro temporal que permite demostrar ante la Agencia no solo el cumplimiento puntual, sino la trayectoria de mejora continua. Las alertas proactivas por modulo implementan el deber de diligencia al detectar automaticamente situaciones de riesgo antes de que se conviertan en infracciones.

---

## 22. Controladores Externos (Mandantes)

**Base legal:** Art. 15 bis (relacion entre responsable y encargado del tratamiento)
**Clasificacion:** EXIGIDO

### Para el DPO y equipo tecnico

Kulvio modela la relacion encargado-mandante mediante 4 entidades especializadas: ExternalController (datos del controlador externo), ActivityControllerEngagement (vinculacion con actividades RAT), ControllerServiceEngagement (engagements a nivel de servicio) y EngagementVendor (sub-encargados vinculados al engagement). Cuando la organizacion actua como encargado de tratamiento, este modulo permite contextualizar las actividades RAT con rol PROCESSOR, pre-llenando campos desde los engagements activos. La vista consolidada muestra todas las relaciones mandante-encargado con sus servicios, actividades y sub-encargados asociados, proporcionando trazabilidad completa de la cadena de tratamiento de datos.

### Para la gerencia

Cuando la organizacion procesa datos por cuenta de terceros (como proveedor de servicios), la ley exige documentar formalmente esta relacion y las instrucciones recibidas del mandante. El modulo de controladores externos de Kulvio centraliza la gestion de estas relaciones, vinculando cada mandante con los servicios prestados, las actividades de tratamiento involucradas y los sub-encargados que participan. Esta visibilidad completa de la cadena de tratamiento protege a la organizacion ante auditorias del mandante o requerimientos de la Agencia, demostrando que el procesamiento se realiza dentro del marco contractual acordado. Para empresas de servicios tecnologicos, outsourcing y BPO, este modulo es fundamental para operar legalmente.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **CRUD controladores externos** | Gestion completa de mandantes con datos de contacto, jurisdiccion y relacion contractual |
| **Engagement de servicios** | ControllerServiceEngagement para documentar servicios prestados a cada mandante |
| **Engagement de actividades** | ActivityControllerEngagement para vincular actividades RAT con mandantes especificos |
| **Vinculacion engagement-vendor** | EngagementVendor para documentar sub-encargados involucrados en cada engagement |
| **Contextualizacion PROCESSOR en RAT** | Pre-llenado automatico de campos RAT desde engagements cuando la organizacion actua como encargado |
| **Vista consolidada** | Panel unificado de relaciones mandante-encargado con servicios, actividades y sub-encargados |

### Fundamento normativo

El Art. 15 bis de la Ley 21.719 regula la relacion entre el responsable del tratamiento y el encargado, estableciendo que el tratamiento por parte del encargado debe regirse por un contrato que vincule al encargado respecto del responsable y que establezca el objeto y la duracion del tratamiento, la naturaleza y finalidad, el tipo de datos personales y las categorias de titulares. El encargado debe tratar los datos personales solo segun las instrucciones documentadas del responsable. El modulo de controladores externos permite a la organizacion que actua como encargado documentar sistematicamente estas relaciones, garantizando que cada tratamiento realizado por cuenta de terceros este respaldado por un engagement formal con instrucciones claras y sub-encargados autorizados.

---

## 23. RBAC (Control de Acceso Basado en Roles)

**Base legal:** Art. 14 quinquies + Art. 14 bis (deber de seguridad y modelo de prevencion)
**Clasificacion:** EXIGIDO

### Para el DPO y equipo tecnico

El sistema RBAC de Kulvio implementa 4 roles con permisos granulares por modulo y accion: ADMIN (gestion total incluyendo eliminacion y configuracion), DPO (validacion tecnica completa sin capacidad de eliminar registros), OPERATOR (creacion y edicion de borradores propios unicamente) y AUDITOR (acceso de solo lectura a toda la plataforma). La autorizacion se resuelve mediante dependency injection con get_current_user y require_role() en cada endpoint, garantizando que la verificacion de permisos es automatica y no depende del desarrollador. El modelo de membership multi-organizacion permite que un mismo usuario tenga roles diferentes en distintos tenants, soportando consultores y auditores que trabajan con multiples clientes.

### Para la gerencia

El control de acceso adecuado es un requisito legal directo: la ley exige que solo el personal autorizado acceda a los datos personales y que cada persona tenga acceso unicamente a la informacion necesaria para cumplir sus funciones. Los 4 roles predefinidos de Kulvio cubren los perfiles tipicos de un programa de compliance: el administrador que gestiona la plataforma, el DPO que valida tecnicamente, los operadores de area que ingresan informacion de sus tratamientos, y los auditores que verifican el cumplimiento. Esta segregacion de funciones reduce el riesgo de errores y accesos indebidos, y constituye evidencia del principio de seguridad ante la Agencia.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **4 roles predefinidos** | ADMIN, DPO, OPERATOR y AUDITOR con permisos diferenciados por modulo y accion |
| **ADMIN: gestion total** | Acceso completo incluyendo eliminacion de registros, configuracion y gestion de usuarios |
| **DPO: validacion tecnica** | Revision y aprobacion de actividades, EIPD y documentos sin capacidad de eliminar registros |
| **OPERATOR: borradores propios** | Creacion y edicion de registros propios en estado borrador, sin acceso a configuracion |
| **AUDITOR: solo lectura** | Visualizacion completa de todos los modulos sin capacidad de modificacion |
| **Dependency injection** | Verificacion automatica de permisos via get_current_user y require_role() en cada endpoint |
| **Membership multi-org** | Un usuario puede tener roles diferentes en distintas organizaciones del sistema |

### Fundamento normativo

El Art. 14 quinquies de la Ley 21.719 establece que el responsable debe adoptar un programa de cumplimiento que incluya la designacion de responsabilidades y la restriccion del acceso a los datos personales. El Art. 14 bis impone el deber de seguridad, que comprende la implementacion de medidas tecnicas y organizativas apropiadas para garantizar un nivel de seguridad adecuado al riesgo, incluyendo la capacidad de garantizar la confidencialidad del tratamiento. El sistema RBAC implementa ambos mandatos mediante roles con permisos granulares que aseguran que cada usuario accede unicamente a las funcionalidades y datos necesarios para su funcion, generando trazabilidad de quien realiza cada accion en el sistema.

---

## 24. Ciclo de Vida de los Datos

**Base legal:** Art. 7 + Art. 14 (derecho de cancelacion y deber del responsable)
**Clasificacion:** EXIGIDO

### Para el DPO y equipo tecnico

Kulvio implementa el ciclo de vida completo de los datos mediante soft delete con campos is_deleted, deleted_at y deleted_by en todas las tablas de negocio. La papelera centralizada en /settings/trash muestra todos los registros eliminados con retencion de 30 dias antes del hard delete automatico via scheduler. El flujo de offboarding gestiona la suspension de tenants con notificaciones escalonadas (dia 0, dia 83, dia 91) y permite reactivacion con condiciones. El mecanismo de Legal Hold bloquea la purga automatica mientras existan retenciones legales activas, priorizando la preservacion de evidencia sobre la eliminacion programada. Las tablas inmutables (audit_log, consent_records, read_confirmations) estan excluidas del ciclo de eliminacion por su naturaleza probatoria.

### Para la gerencia

La ley chilena otorga a los titulares el derecho de cancelacion de sus datos personales y obliga al responsable a eliminarlos cuando ya no sean necesarios para la finalidad del tratamiento. Sin embargo, la eliminacion no puede ser inmediata ni indiscriminada: existen obligaciones legales de retencion y situaciones donde los datos deben preservarse como evidencia. Kulvio resuelve esta tension mediante un ciclo de vida automatizado con papelera de 30 dias, eliminacion definitiva programada y mecanismo de retencion legal. El flujo de offboarding protege a la organizacion durante la baja de clientes, asegurando que los datos se eliminen dentro de los plazos legales y que se genere evidencia de la eliminacion efectiva.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Soft delete** | Eliminacion logica con campos is_deleted, deleted_at y deleted_by en todas las tablas de negocio |
| **Papelera centralizada** | Vista unificada en /settings/trash con todos los registros eliminados y opcion de restauracion |
| **Retencion 30 dias** | Periodo de gracia antes del hard delete automatico, configurable por organizacion |
| **Hard delete via scheduler** | Eliminacion fisica definitiva automatizada tras vencimiento del periodo de retencion |
| **Offboarding escalonado** | Notificaciones en dia 0 (suspension), dia 83 (pre-aviso) y dia 91 (purga inminente) |
| **Reactivacion con condiciones** | Posibilidad de reactivar tenants suspendidos cumpliendo requisitos establecidos |
| **Legal Hold** | Bloqueo de purga automatica mientras existan retenciones legales activas sobre registros |
| **Tablas inmutables excluidas** | audit_log_entries, consent_records y document_read_confirmations fuera del ciclo de eliminacion |
| **Exportacion pre-purga** | Capacidad de exportar datos antes de la eliminacion definitiva para respaldo |

### Fundamento normativo

El Art. 7 de la Ley 21.719 consagra el derecho de cancelacion del titular, que permite exigir la eliminacion de sus datos personales cuando el tratamiento carece de fundamento legal, ha sido revocado el consentimiento o los datos son innecesarios para la finalidad declarada. El Art. 14 impone al responsable el deber de suprimir los datos personales cuando ya no sean necesarios. Sin embargo, el Art. 7 inciso final permite mantener los datos cuando existan obligaciones legales de retencion o cuando sean necesarios para el ejercicio o defensa de derechos ante tribunales. El ciclo de vida de Kulvio equilibra estos mandatos: facilita la eliminacion oportuna mediante papelera automatizada, pero preserva los datos cuando existe Legal Hold o tablas inmutables con valor probatorio.

---

## 25. API REST v1 y Webhooks

**Base legal:** Art. 14 + Art. 15 bis (interoperabilidad y deber del responsable)
**Clasificacion:** BUENA PRACTICA

### Para el DPO y equipo tecnico

Kulvio expone una API REST v1 en /api/v1/ con endpoints JSON para actividades de tratamiento, vendors, incidentes y solicitudes DSR. La autenticacion utiliza API Keys con header X-API-Key, soportando scopes granulares y fecha de expiracion configurable. El ciclo de vida de API Keys incluye creacion, revocacion y renovacion desde la interfaz de administracion. Los webhooks outbound implementan firma HMAC-SHA256 para que el receptor verifique la autenticidad de cada evento. El modelo WebhookEndpoint almacena la configuracion de destinos y WebhookDelivery registra cada intento de entrega con retry automatico y backoff exponencial. Los cron endpoints en /api/cron/* (notifications, trash-purge, arcop-sla) se protegen con autenticacion X-Cron-Key independiente. Rate limiting por API key previene abuso.

### Para la gerencia

Las organizaciones modernas operan ecosistemas tecnologicos integrados donde la plataforma de compliance debe comunicarse con ERPs, CRMs, sistemas de RRHH y herramientas de seguridad. La API REST de Kulvio permite esta integracion sin desarrollo a medida, habilitando la automatizacion de procesos como la creacion de actividades de tratamiento desde el sistema de gestion de proyectos o la sincronizacion de vendors desde el ERP. Los webhooks outbound notifican en tiempo real a sistemas externos cuando ocurren eventos relevantes (nueva brecha, solicitud ARCOP, cambio de estado), eliminando la necesidad de consultas periodicas. La firma HMAC-SHA256 garantiza que solo Kulvio puede generar estas notificaciones, protegiendo contra falsificacion.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Endpoints JSON /api/v1/** | API REST para actividades de tratamiento, vendors, incidentes y solicitudes DSR |
| **Auth via X-API-Key** | Autenticacion por header con scopes granulares y fecha de expiracion configurable |
| **Gestion de API Keys** | Creacion, revocacion y renovacion de claves desde la interfaz de administracion |
| **Webhooks outbound HMAC-SHA256** | Notificacion de eventos a sistemas externos con firma criptografica verificable |
| **Retry con backoff exponencial** | Reintentos automaticos de entrega de webhooks con intervalos incrementales |
| **WebhookEndpoint + WebhookDelivery** | Modelos para configuracion de destinos y registro detallado de cada intento de entrega |
| **Cron endpoints /api/cron/** | Endpoints para notifications, trash-purge y arcop-sla con autenticacion X-Cron-Key |
| **Rate limiting por API key** | Control de frecuencia de solicitudes por clave para prevenir abuso y garantizar estabilidad |

### Fundamento normativo

El Art. 14 de la Ley 21.719 impone al responsable el deber de adoptar medidas necesarias para cumplir la ley, lo que en el contexto tecnologico actual incluye la capacidad de integrar el programa de compliance con el ecosistema de sistemas de la organizacion. El Art. 15 bis, al regular la relacion responsable-encargado, implica la necesidad de mecanismos de comunicacion automatizados entre sistemas para cumplir con las instrucciones documentadas del responsable. La API REST permite que sistemas externos interactuen programaticamente con la plataforma de compliance, mientras que los webhooks outbound con firma HMAC-SHA256 proporcionan notificacion proactiva de eventos con garantia de autenticidad e integridad.

---

## 26. Trust Center

**Base legal:** Art. 14 + Art. 3 lit. c (principio de transparencia)
**Clasificacion:** BUENA PRACTICA

### Para el DPO y equipo tecnico

El Trust Center de Kulvio genera una pagina publica de compliance por organizacion accesible sin autenticacion. Presenta informacion verificable sobre el estado de cumplimiento normativo, incluyendo sub-procesadores declarados con transparencia, certificaciones vigentes y estado de cumplimiento por modulo. El enlace publico es compartible y puede referenciarse desde politicas de privacidad, contratos con clientes y respuestas a due diligence de vendors. La informacion se actualiza automaticamente desde los datos de la plataforma, eliminando la necesidad de mantener manualmente una pagina de compliance separada. El router trust_center.py gestiona la renderizacion publica con acceso controlado a la informacion que cada organizacion decide publicar.

### Para la gerencia

Clientes, socios comerciales y reguladores exigen cada vez mas transparencia sobre las practicas de proteccion de datos. El Trust Center proporciona una pagina publica profesional que demuestra el compromiso de la organizacion con la privacidad, eliminando la friccion de responder manualmente a cuestionarios de due diligence y auditorias de terceros. Al compartir el enlace del Trust Center, la organizacion responde proactivamente a las preguntas mas frecuentes sobre sus practicas de compliance, sub-procesadores y certificaciones. Esta transparencia proactiva genera confianza comercial, diferencia a la organizacion de competidores que no pueden demostrar su cumplimiento, y reduce el ciclo de ventas en procesos donde la proteccion de datos es un factor de decision.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Pagina publica de compliance** | Portal accesible sin autenticacion con informacion de cumplimiento de la organizacion |
| **Sub-procesadores transparentes** | Listado publico de terceros que procesan datos personales por cuenta de la organizacion |
| **Certificaciones vigentes** | Exhibicion de certificaciones de seguridad y privacidad activas |
| **Estado por modulo** | Indicadores de cumplimiento por area (RAT, EIPD, vendors, brechas, etc.) |
| **Link publico compartible** | URL unica por organizacion para referencia en contratos, politicas y due diligence |
| **Actualizacion automatica** | Datos sincronizados en tiempo real desde la plataforma sin mantenimiento manual |

### Fundamento normativo

El Art. 3 lit. c de la Ley 21.719 consagra el principio de transparencia e informacion, que exige que las politicas y practicas sobre el tratamiento de datos personales se encuentren permanentemente accesibles y a disposicion del publico de manera precisa, clara, inequivoca y gratuita. El Art. 14 refuerza el deber del responsable de adoptar medidas para cumplir la ley de manera demostrable. El Trust Center implementa ambos mandatos al proporcionar una pagina publica permanentemente accesible donde cualquier persona puede verificar las practicas de proteccion de datos de la organizacion, sus sub-procesadores y su estado de cumplimiento, satisfaciendo el principio de transparencia sin requerir solicitudes formales de informacion.

---

## 27. Sistema de Ayuda y Experiencia de Usuario

**Base legal:** Art. 3 lit. c (principio de transparencia e informacion) + Art. 14 (deber del responsable de adoptar medidas)
**Clasificacion:** BUENA PRACTICA

### Para el DPO y equipo tecnico

La plataforma incorpora un sistema integral de asistencia al usuario que facilita la comprension de los conceptos legales y tecnicos asociados a la proteccion de datos. El glosario legal A-Z incluye mas de 150 terminos, leyes e instituciones chilenas relevantes, mientras que mas de 100 campos criticos cuentan con tooltips contextuales que referencian el articulo legal correspondiente. El sistema de ayuda contextual adapta su contenido a cada pantalla, y la guia de onboarding proporciona un recorrido paso a paso por la plataforma. Todo esto reduce la curva de aprendizaje y minimiza errores de cumplimiento por desconocimiento normativo.

### Para la gerencia

Invertir en experiencia de usuario no es un gasto estetico: es una estrategia que reduce drasticamente los tiempos de adopcion y los costos de capacitacion. Con un glosario legal integrado, tooltips en cada campo critico y una guia de onboarding estructurada, los equipos alcanzan autonomia operativa en dias en lugar de semanas. Las paginas de error personalizadas y el sistema de notificaciones toast mantienen una comunicacion clara con el usuario, reduciendo tickets de soporte. El design system garantiza consistencia visual en toda la plataforma, proyectando profesionalismo y confianza hacia auditores y reguladores.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Glosario legal A-Z** | Mas de 150 terminos, leyes e instituciones chilenas de proteccion de datos con definiciones precisas |
| **Tooltips contextuales** | Mas de 100 campos con referencia directa al articulo legal correspondiente de la Ley 21.719 |
| **Ayuda contextual por pantalla** | Sistema de ayuda que adapta su contenido segun la seccion de la plataforma donde se encuentra el usuario |
| **Guia de onboarding** | Recorrido paso a paso con tracking de progreso (GuideProgress) para nuevos usuarios |
| **Toast notifications** | Notificaciones visuales no intrusivas via HTMX (showToast) para feedback inmediato de acciones |
| **Paginas de error personalizadas** | Paginas dedicadas para errores 403, 404, 429 y 500 con mensajes claros y opciones de navegacion |
| **Design system** | Paleta de colores, CSS variables, componentes reutilizables y tipografia consistente en toda la plataforma |
| **Version display** | Hash del commit git visible en el footer para trazabilidad de la version desplegada |

### Fundamento normativo

El Art. 3 lit. c de la Ley 21.719 establece el principio de transparencia e informacion, exigiendo que las politicas y practicas sobre tratamiento de datos sean accesibles de manera clara e inequivoca. El Art. 14 refuerza el deber del responsable de adoptar todas las medidas necesarias para cumplir la ley. Si bien la ley no exige un sistema de ayuda integrado, proporcionar herramientas que faciliten la comprension de los conceptos legales y tecnicos constituye una buena practica que refuerza el cumplimiento efectivo. Un glosario legal con terminologia chilena, tooltips que referencian articulos especificos y una guia de onboarding estructurada demuestran diligencia del responsable en asegurar que su equipo comprenda las obligaciones normativas, reduciendo el riesgo de incumplimiento por desconocimiento.

---

## 28. Portales Externos

**Base legal:** Art. 5-9 (derechos ARCOP del titular) + Art. 15 bis (obligaciones del encargado) + Art. 12 (consentimiento)
**Clasificacion:** EXIGIDO

### Para el DPO y equipo tecnico

La plataforma expone cuatro portales externos que permiten la interaccion directa con titulares de datos y encargados de tratamiento sin comprometer la seguridad del sistema interno. El Portal ARCOP publico implementa un selector de empresa con Identity Gate via OTP para verificar la identidad del solicitante antes de permitir el ejercicio de derechos. El Portal del Encargado utiliza Magic Links para acceso sin contrasena, permitiendo firma de DPA, reporte de brechas, carga de certificaciones y gestion de tareas. El Portal de Denuncias soporta reportes anonimos con token de seguimiento, incluyendo IP masking y metadata stripping para proteger al denunciante. El Widget de Consentimiento y el CMP Banner de cookies son embebibles en sitios externos con CORS permisivo y soporte para Google Consent Mode.

### Para la gerencia

Los portales externos son la cara visible de su programa de cumplimiento ante titulares de datos, proveedores y denunciantes. Proporcionan canales digitales profesionales que reemplazan procesos manuales por email o formularios genericos, reduciendo tiempos de respuesta y mejorando la experiencia del usuario externo. El portal ARCOP permite a los titulares ejercer sus derechos de forma autonoma con verificacion de identidad, cumpliendo directamente con la ley. El portal de proveedores centraliza la gestion documental con sus encargados. El canal de denuncias garantiza anonimato real, protegiendo a la organizacion de riesgos reputacionales. El widget de consentimiento y el banner de cookies se integran en cualquier sitio web sin desarrollo adicional.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Portal ARCOP publico** | Selector de empresa, Identity Gate con OTP, formulario de solicitud y tracking por numero de seguimiento |
| **Portal del Encargado** | Acceso via Magic Link para firma de DPA, reporte de brechas, carga de certificaciones y gestion de tareas |
| **Portal de Denuncias** | Reportes anonimos con token de seguimiento, reportes nominados, IP masking y metadata stripping |
| **Widget de Consentimiento** | JavaScript embebible con CORS permisivo, API key por tenant, personalizable en estilo y contenido |
| **CMP Banner de cookies** | Categorias de cookies, Google Consent Mode v2, layouts BANNER, BOX y SIDE configurables |

### Fundamento normativo

Los Art. 5 a 9 de la Ley 21.719 consagran los derechos ARCOP (acceso, rectificacion, cancelacion, oposicion, portabilidad) del titular, exigiendo mecanismos accesibles para su ejercicio. El Portal ARCOP publico satisface directamente este mandato al proporcionar un canal digital verificable con Identity Gate. El Art. 15 bis establece las obligaciones del encargado de tratamiento, incluyendo comunicacion de brechas y cumplimiento de instrucciones del responsable; el Portal del Encargado facilita estas interacciones. El Art. 12 regula el consentimiento, que debe ser libre, informado, especifico e inequivoco; el Widget de Consentimiento y el CMP Banner implementan la obtencion y gestion de consentimiento conforme a estos requisitos. Estos portales constituyen la implementacion directa de obligaciones legales expresas.

---

## 29. Avisos de Privacidad

**Base legal:** Art. 3 lit. c (principio de transparencia e informacion) + Art. 14 (deber del responsable)
**Clasificacion:** EXIGIDO

### Para el DPO y equipo tecnico

El modulo de avisos de privacidad genera automaticamente un documento consolidado a partir de todas las actividades de tratamiento aprobadas en el RAT. El aviso cruza informacion de multiples actividades para compilar las bases de licitud utilizadas, las finalidades declaradas, las categorias de datos tratados, los destinatarios o categorias de destinatarios, y los plazos de retencion aplicables. El resultado es un aviso de privacidad siempre actualizado que refleja fielmente el estado real del tratamiento de datos de la organizacion. La exportacion a PDF permite su distribucion y publicacion en sitios web o documentos contractuales.

### Para la gerencia

Mantener un aviso de privacidad actualizado es una obligacion legal que muchas organizaciones incumplen por la dificultad de consolidar informacion dispersa. Kulvio automatiza completamente este proceso: cada vez que se modifica una actividad de tratamiento, el aviso de privacidad se actualiza dinamicamente. Esto elimina el riesgo de publicar avisos desactualizados o incompletos, que constituyen una infraccion sancionable. La exportacion a PDF permite su uso inmediato en sitios web, contratos y comunicaciones con titulares, ahorrando horas de trabajo legal y reduciendo la dependencia de asesores externos para esta tarea recurrente.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Generacion consolidada automatica** | Compilacion del aviso desde todas las actividades RAT aprobadas, cruzando datos de multiples fuentes |
| **Contenido normativo completo** | Bases de licitud, finalidades, categorias de datos, destinatarios y plazos de retencion |
| **Exportacion PDF** | Descarga del aviso de privacidad en formato PDF listo para publicacion |
| **Actualizacion dinamica** | Regeneracion automatica del contenido al modificar actividades de tratamiento |

### Fundamento normativo

El Art. 3 lit. c de la Ley 21.719 establece el principio de transparencia e informacion, que exige que el responsable mantenga permanentemente accesibles sus politicas y practicas sobre tratamiento de datos personales de manera precisa, clara, inequivoca y gratuita. El Art. 14 complementa con el deber general del responsable de informar al titular sobre las finalidades del tratamiento, las categorias de datos, los destinatarios, los plazos de conservacion y los derechos que le asisten. El aviso de privacidad es el instrumento legal principal para cumplir estos deberes de informacion, y su generacion automatica desde el RAT garantiza que siempre refleje la realidad operativa de la organizacion.

---

## 30. Compliance Records y Certificaciones

**Base legal:** Art. 14 (deber del responsable) + Art. 49 (modelo de prevencion de infracciones)
**Clasificacion:** BUENA PRACTICA

### Para el DPO y equipo tecnico

El modulo de compliance records permite registrar y gestionar certificaciones de seguridad y proteccion de datos obtenidas por la organizacion o sus proveedores. Soporta tipos de registro como CERTIFICATION (ISO 27001, ISO 27701, SOC 2 Type II) y CODE_OF_CONDUCT, con tracking de fecha de emision, expiracion, cuerpo emisor y numero de certificado. El sistema genera alertas automaticas previas al vencimiento de certificaciones, permitiendo planificar renovaciones oportunamente. Cada registro puede acompanarse de evidencia documental cargada al sistema, creando un repositorio centralizado de acreditaciones que facilita auditorias y due diligence de terceros.

### Para la gerencia

Las certificaciones de seguridad y privacidad son activos estrategicos que demuestran madurez organizacional ante clientes, socios y reguladores. Este modulo centraliza todas las acreditaciones en un solo lugar, eliminando el riesgo de que certificaciones venzan sin renovacion por falta de seguimiento. Las alertas automaticas de expiracion protegen inversiones significativas en procesos de certificacion. La vinculacion con vendors permite verificar rapidamente que proveedores criticos mantienen sus acreditaciones vigentes, un requisito cada vez mas comun en procesos de licitacion y due diligence. Ademas, bajo el modelo de prevencion de infracciones del Art. 49, contar con certificaciones vigentes puede constituir un atenuante relevante.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Tipos de registro** | Soporte para CERTIFICATION (ISO 27001, ISO 27701, SOC 2) y CODE_OF_CONDUCT |
| **Tracking de expiracion** | Alertas automaticas previas al vencimiento de certificaciones |
| **Datos del certificado** | Cuerpo emisor, numero de certificado, fechas de emision y expiracion |
| **Evidencia documental** | Upload de documentos probatorios vinculados a cada certificacion |
| **Vinculacion con vendors** | Asociacion de certificaciones con proveedores y organizacion |

### Fundamento normativo

El Art. 14 de la Ley 21.719 establece el deber del responsable de adoptar las medidas necesarias para cumplir la ley y poder demostrarlo (principio de responsabilidad proactiva). El Art. 49 introduce el modelo de prevencion de infracciones, que contempla la adopcion de certificaciones, sellos o marcas de conformidad como elementos que acreditan el cumplimiento. Si bien la ley no exige certificaciones especificas, contar con acreditaciones como ISO 27001 o ISO 27701 y poder demostrar su vigencia constituye una buena practica que refuerza la posicion de cumplimiento de la organizacion, pudiendo operar como atenuante en procedimientos sancionatorios.

---

## 31. Evaluacion de Riesgo de Vendors

**Base legal:** Art. 15 bis (obligaciones del encargado) + Art. 14 quinquies (medidas de seguridad)
**Clasificacion:** EXIGIDO

### Para el DPO y equipo tecnico

El modulo de evaluacion de riesgo de vendors implementa un proceso estructurado de due diligence para encargados de tratamiento mediante cuestionarios de evaluacion customizables (VendorAssessment). El sistema calcula automaticamente un score de riesgo basado en las respuestas proporcionadas por el vendor, determinando su nivel de riesgo (bajo, medio, alto, critico). El flujo de trabajo del assessment contempla estados Draft, In Progress, Submitted, Approved y Rejected, con bloqueo automatico de vendors clasificados como riesgo alto sin mitigacion adecuada. La evaluacion se vincula con el DPA y las certificaciones del vendor, proporcionando una vision integral del nivel de cumplimiento del encargado.

### Para la gerencia

La ley chilena responsabiliza al controlador por los actos de sus encargados de tratamiento. Una evaluacion de riesgo inadecuada de proveedores puede resultar en sanciones directas para la organizacion, incluso si la brecha o incumplimiento fue causado por el tercero. Este modulo automatiza la evaluacion de riesgo de cada proveedor, proporcionando un scoring objetivo que facilita la toma de decisiones sobre contratacion y continuidad. El bloqueo automatico de vendors de alto riesgo sin mitigacion previene la exposicion a proveedores que no cumplen estandares minimos de seguridad, protegiendo a la organizacion de responsabilidades derivadas.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Cuestionario customizable** | Evaluacion de riesgo del vendor mediante preguntas configurables (VendorAssessment) |
| **Scoring automatico** | Calculo de puntuacion de riesgo basado en respuestas del vendor |
| **Nivel de riesgo** | Determinacion automatica del nivel de riesgo (bajo, medio, alto, critico) |
| **Workflow de assessment** | Estados Draft, In Progress, Submitted, Approved y Rejected con transiciones controladas |
| **Vinculacion DPA y certificaciones** | Integracion del assessment con el contrato de encargado y acreditaciones del vendor |
| **Bloqueo por riesgo alto** | Impedimento automatico de operar con vendors de riesgo alto sin mitigacion documentada |

### Fundamento normativo

El Art. 15 bis de la Ley 21.719 establece que el responsable debe verificar que el encargado de tratamiento ofrece garantias suficientes para implementar medidas tecnicas y organizativas apropiadas. El Art. 14 quinquies refuerza la obligacion de adoptar medidas de seguridad adecuadas al riesgo. La evaluacion de riesgo de vendors es el mecanismo practico para verificar estas garantias antes y durante la relacion contractual. Un proceso de due diligence documentado demuestra que el responsable ejercio la diligencia debida en la seleccion de sus encargados, constituyendo una defensa relevante ante eventuales incumplimientos del tercero.

---

## 32. Import Masivo

**Base legal:** Art. 14 (deber del responsable de adoptar medidas)
**Clasificacion:** BUENA PRACTICA

### Para el DPO y equipo tecnico

El modulo de importacion masiva permite cargar grandes volumenes de datos al sistema mediante archivos CSV y XLSX, soportando la importacion bulk de actividades de tratamiento (RAT) y vendors. El proceso incluye descarga de templates con las columnas esperadas, validacion previa con preview de registros antes de confirmar la importacion, y tracking detallado del estado del job (ImportJob) con progreso y errores por fila. Esto facilita la migracion inicial desde hojas de calculo o sistemas legacy, reduciendo significativamente el tiempo de implementacion del programa de cumplimiento sin sacrificar la calidad de los datos.

### Para la gerencia

La implementacion de un programa de cumplimiento desde cero puede tomar semanas si cada actividad y proveedor debe registrarse manualmente. La importacion masiva reduce este tiempo de dias a minutos al permitir cargar inventarios completos desde archivos Excel o CSV que la organizacion ya posee. Los templates descargables aseguran que los datos se preparen correctamente, y la validacion previa previene errores antes de que impacten el sistema. El tracking detallado de errores por fila permite corregir problemas puntuales sin repetir toda la carga, optimizando el proceso de onboarding y acelerando el retorno de inversion de la plataforma.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Formatos soportados** | Importacion desde archivos CSV y XLSX |
| **Templates descargables** | Plantillas con columnas esperadas para preparar datos correctamente |
| **Validacion con preview** | Vista previa de registros a importar con validacion antes de confirmar |
| **ImportJob tracking** | Seguimiento del estado del job, progreso porcentual y errores detallados |
| **Errores per-row** | Detalle de errores por fila para correccion precisa de problemas |
| **Tipos de import** | Actividades de tratamiento (RAT) y vendors como tipos soportados |

### Fundamento normativo

El Art. 14 de la Ley 21.719 establece el deber del responsable de adoptar todas las medidas necesarias para cumplir adecuadamente las obligaciones establecidas en la ley. La importacion masiva no es una exigencia legal directa, pero constituye una herramienta practica que facilita el cumplimiento al permitir la rapida conformacion del inventario de actividades de tratamiento y el registro de encargados, acelerando la implementacion del programa de cumplimiento y reduciendo la probabilidad de omisiones en el registro de tratamientos.

---

## 33. Report Builder

**Base legal:** Art. 14 (deber del responsable) + Art. 3 lit. g (principio de responsabilidad proactiva)
**Clasificacion:** BUENA PRACTICA

### Para el DPO y equipo tecnico

El Report Builder proporciona capacidades avanzadas de generacion de reportes con 5 tipos pre-construidos y filtros configurables por fecha, estado, tipo y modulo. Los reportes pueden guardarse como SavedReport para reutilizacion futura, y exportarse en formatos CSV y PDF segun la necesidad. Incluye reportes pre-construidos especializados como Controllers Map (mapa de controladores externos) y Vendors Map (mapa de proveedores), que proporcionan vistas consolidadas criticas para la gestion del programa de cumplimiento. La programacion de reportes automaticos permite configurar generacion periodica sin intervencion manual, facilitando reportes recurrentes a directorio o regulador.

### Para la gerencia

La capacidad de generar reportes a demanda y de manera programada es fundamental para la gobernanza del programa de cumplimiento. El Report Builder permite obtener visibilidad inmediata sobre cualquier aspecto del tratamiento de datos: estado de actividades, situacion de proveedores, incidentes abiertos o derechos ejercidos. Los reportes guardados eliminan el trabajo repetitivo de configurar filtros cada vez, y la exportacion a PDF genera documentos presentables a directorio, auditores o el regulador. Los mapas de controladores y vendors proporcionan la vision global que la gerencia necesita para tomar decisiones estrategicas sobre el programa de privacidad.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Tipos de reporte** | 5 tipos de reporte pre-construidos para diferentes necesidades de analisis |
| **Filtros configurables** | Filtrado por fecha, estado, tipo y modulo para precision en consultas |
| **Reportes guardados** | SavedReport reutilizables que mantienen configuracion de filtros y parametros |
| **Exportacion CSV y PDF** | Descarga de reportes en formato tabular (CSV) o documento formal (PDF) |
| **Reportes especializados** | Controllers Map y Vendors Map con vistas consolidadas pre-construidas |
| **Programacion automatica** | Configuracion de generacion periodica de reportes sin intervencion manual |

### Fundamento normativo

El Art. 14 de la Ley 21.719 exige al responsable adoptar medidas que permitan demostrar el cumplimiento de la ley. El Art. 3 lit. g consagra el principio de responsabilidad proactiva, que requiere que el responsable sea capaz de demostrar la licitud del tratamiento. La generacion de reportes estructurados es una herramienta esencial para cumplir ambos mandatos, ya que permite documentar y evidenciar el estado del programa de cumplimiento ante auditores, directorio y la Agencia de Proteccion de Datos Personales. Si bien la ley no prescribe reportes especificos, la capacidad de generar evidencia sistematizada es inherente al principio de accountability.

---

## 34. Asistente IA

**Base legal:** Art. 14 (deber del responsable) + Art. 14 quater (deber de proteccion desde el diseno)
**Clasificacion:** BUENA PRACTICA

### Para el DPO y equipo tecnico

El asistente de inteligencia artificial integra OpenRouter (modelo Gemini 2.0 Flash) para proporcionar capacidades de generacion asistida de contenido en la plataforma. En el repositorio documental, el asistente sugiere contenido para documentos de politicas y procedimientos basandose en el contexto de la organizacion y los estandares ISO aplicables. En el modulo de Privacy by Design, el asistente analiza las evaluaciones de privacidad identificando fortalezas, debilidades y recomendaciones, generando un score de cumplimiento. El contenido generado por IA siempre requiere revision y aprobacion humana antes de su adopcion, manteniendo el control del DPO sobre los documentos del programa de cumplimiento.

### Para la gerencia

La redaccion de politicas de privacidad, procedimientos y evaluaciones es una tarea que consume tiempo significativo de profesionales especializados. El asistente IA reduce este esfuerzo al generar borradores iniciales de alta calidad que el equipo puede revisar y ajustar, en lugar de partir desde cero. Esto acelera la implementacion del programa de cumplimiento y reduce costos de consultoria externa. El analisis automatizado de evaluaciones Privacy by Design proporciona una segunda opinion objetiva sobre la madurez del diseno de privacidad, ayudando a identificar areas de mejora que podrian pasar desapercibidas. La IA es una herramienta de apoyo que complementa, pero nunca reemplaza, el juicio profesional del equipo.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Integracion OpenRouter** | Conexion con API de OpenRouter para acceso a modelos de lenguaje avanzados |
| **Sugerencias para documentos** | Generacion asistida de contenido para politicas y procedimientos del repositorio documental |
| **Analisis PbD con IA** | Evaluacion automatizada de Privacy by Design con fortalezas, debilidades, recomendaciones y score |
| **Generacion de contenido** | Creacion de borradores de documentos basados en contexto organizacional y estandares ISO |
| **Modelo Gemini 2.0 Flash** | Utilizacion de modelo rapido y eficiente via OpenRouter para respuestas en tiempo real |

### Fundamento normativo

El Art. 14 de la Ley 21.719 establece el deber del responsable de adoptar medidas necesarias y apropiadas para cumplir la ley. El Art. 14 quater introduce el deber de proteccion desde el diseno y por defecto, que requiere considerar la privacidad en todas las etapas del tratamiento. El uso de inteligencia artificial como herramienta de apoyo al cumplimiento no esta regulado directamente por la ley, pero constituye una buena practica que potencia la capacidad del equipo de privacidad para generar documentacion de calidad, analizar evaluaciones y mantener el programa de cumplimiento actualizado con mayor eficiencia.

---

## 35. Plataforma Super-Admin

**Base legal:** Art. 15 bis (obligaciones del encargado) + Art. 14 (deber del responsable)
**Clasificacion:** BUENA PRACTICA

### Para el DPO y equipo tecnico

El modulo de plataforma super-admin proporciona herramientas de administracion a nivel de plataforma para la gestion operativa del servicio SaaS. Incluye la gestion del ciclo de vida de tenants (crear, suspender, reactivar organizaciones), registros de facturacion (BillingRecord), y la gestion de sub-procesadores de plataforma (PlatformSubProcessor) con transparencia sobre los terceros que participan en la prestacion del servicio. El portal de autenticacion de plataforma proporciona acceso seguro a estas funciones administrativas, mientras que los jobs de exportacion de datos por tenant permiten cumplir solicitudes de portabilidad o terminacion de servicio de manera estructurada.

### Para la gerencia

Como plataforma SaaS que procesa datos personales de multiples organizaciones, Kulvio actua como encargado de tratamiento respecto de sus clientes. El modulo super-admin asegura que las operaciones de plataforma cumplan con las obligaciones del encargado: transparencia sobre sub-procesadores utilizados, capacidad de suspender y reactivar servicios segun el ciclo de vida contractual, y facilidades de exportacion de datos para portabilidad. La gestion centralizada de tenants permite operaciones eficientes a escala, mientras que la transparencia sobre sub-procesadores protege tanto a Kulvio como a sus clientes ante consultas regulatorias.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Gestion de tenants** | Crear, suspender y reactivar organizaciones con control del ciclo de vida completo |
| **Registros de facturacion** | BillingRecord para tracking de facturacion y uso del servicio por tenant |
| **Sub-procesadores de plataforma** | PlatformSubProcessor con transparencia sobre terceros que participan en el servicio |
| **Portal de autenticacion** | Acceso seguro a funciones administrativas de plataforma |
| **Jobs de exportacion** | Exportacion de datos completa por tenant para portabilidad o terminacion de servicio |

### Fundamento normativo

El Art. 15 bis de la Ley 21.719 regula las obligaciones del encargado de tratamiento, incluyendo la transparencia sobre sub-encargados y el deber de actuar segun las instrucciones del responsable. Como proveedor SaaS, Kulvio actua como encargado respecto de las organizaciones que utilizan la plataforma, por lo que debe cumplir estas obligaciones. El Art. 14 refuerza el deber general de adoptar medidas para cumplir la ley. La gestion transparente de sub-procesadores, la capacidad de exportar datos por tenant y el control del ciclo de vida de las organizaciones son funcionalidades que permiten a Kulvio cumplir sus obligaciones como encargado de tratamiento.

---

## 36. Exportacion y Portabilidad del Tenant

**Base legal:** Art. 9 (derecho de portabilidad) + Art. 14 (deber del responsable)
**Clasificacion:** EXIGIDO

### Para el DPO y equipo tecnico

El modulo de exportacion de tenant implementa la portabilidad de datos a nivel organizacional mediante TenantExportJob. Genera un archivo JSON completo con todos los datos del tenant, acompanado de un checksum SHA-256 que garantiza la integridad del archivo exportado. Cada exportacion incluye un manifest.json con metadata detallada del export (fecha, version, contenido). Los jobs de exportacion pueden programarse y su estado se trackea a lo largo de todo el proceso. Los archivos generados tienen disponibilidad temporal para descarga, evitando la acumulacion indefinida de datos exportados. Este mecanismo permite la migracion completa de datos entre sistemas o la entrega al responsable al terminar la relacion contractual.

### Para la gerencia

El derecho de portabilidad no solo aplica a personas naturales sino que tiene implicaciones organizacionales cuando una empresa decide cambiar de proveedor de cumplimiento. Este modulo garantiza que todos los datos del programa de privacidad pueden exportarse en formato estructurado y verificable, eliminando el riesgo de vendor lock-in. El checksum SHA-256 proporciona garantia de integridad para verificar que los datos exportados no fueron alterados. La disponibilidad temporal de los archivos equilibra accesibilidad con seguridad. Para la organizacion, esto significa libertad de eleccion de proveedor sin perder anos de trabajo en documentacion, evaluaciones y registros de cumplimiento.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Exportacion full JSON** | Generacion de archivo JSON completo con todos los datos del tenant via TenantExportJob |
| **Checksum SHA-256** | Verificacion de integridad del archivo exportado mediante hash criptografico |
| **Manifest.json** | Archivo de metadata con informacion detallada del export (fecha, version, contenido) |
| **Programacion de exports** | Capacidad de programar exportaciones para ejecucion en horarios convenientes |
| **Tracking de estado** | Seguimiento del progreso del job de exportacion en todas sus etapas |
| **Disponibilidad temporal** | Archivos de export disponibles por tiempo limitado para descarga segura |

### Fundamento normativo

El Art. 9 de la Ley 21.719 consagra el derecho de portabilidad, que si bien esta formulado para titulares individuales, establece el principio de que los datos deben poder transferirse en formato estructurado, de uso comun y lectura mecanica. El Art. 14 refuerza el deber del responsable de facilitar el ejercicio de derechos y adoptar medidas de cumplimiento. La exportacion completa de datos del tenant implementa estos principios a nivel organizacional, permitiendo que la organizacion ejerza su derecho a recuperar toda la informacion de su programa de cumplimiento en formato reutilizable, con garantias de integridad criptografica.

---

## 37. Infraestructura de Seguridad

**Base legal:** Art. 14 quinquies (medidas de seguridad) + Art. 3 lit. f (principio de seguridad)
**Clasificacion:** EXIGIDO

### Para el DPO y equipo tecnico

La infraestructura de seguridad de la plataforma implementa multiples capas de proteccion a nivel de aplicacion y almacenamiento. Azure Blob Storage opera con arquitectura dual-container: un container publico para logos con acceso anonimo a nivel de blob, y un container privado donde todo acceso requiere SAS tokens de solo lectura con expiracion de 10 minutos. El SecurityHeadersMiddleware implementa cabeceras OWASP incluyendo HSTS, X-Frame-Options, CSP y X-Content-Type-Options. El TenantMiddleware pipeline asegura el aislamiento multi-tenant mediante JWT, extraccion de tenant_id y propagacion via request.state. A nivel de almacenamiento, el blob soft delete de 30 dias y container soft delete de 7 dias proporcionan recuperacion ante eliminaciones accidentales, mientras que las politicas de lifecycle management automatizan la limpieza de datos temporales.

### Para la gerencia

La seguridad no es un modulo opcional sino una capa transversal que protege todos los datos de la plataforma. La arquitectura implementada incluye protecciones contra las vulnerabilidades web mas comunes (cabeceras OWASP), aislamiento estricto entre organizaciones (cada tenant solo accede a sus datos), y almacenamiento seguro de archivos con tokens de acceso temporales que expiran en 10 minutos. Los mecanismos de recuperacion ante eliminaciones accidentales (soft delete de 30 dias) protegen contra perdida de datos. Las politicas de lifecycle automatico aseguran que datos temporales como importaciones y exportaciones se eliminen en los plazos apropiados, reduciendo la superficie de riesgo sin intervencion manual.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Azure Blob Storage dual-container** | Container publico para logos y container privado con SAS tokens de solo lectura (10 min expiry) |
| **Security headers OWASP** | HSTS, X-Frame-Options, CSP, X-Content-Type-Options via SecurityHeadersMiddleware |
| **Real IP extraction** | Extraccion de IP real del cliente para audit trail confiable detras de proxies |
| **Request logging** | Registro de peticiones con correlacion para trazabilidad de operaciones |
| **TenantMiddleware pipeline** | Aislamiento multi-tenant via JWT, tenant_id y request.state |
| **Blob soft delete** | Recuperacion de blobs eliminados durante 30 dias y containers durante 7 dias |
| **Lifecycle management** | Auto-delete de imports (7d), exports (30d), movimiento a Cool tier de certs (90d) |

### Fundamento normativo

El Art. 14 quinquies de la Ley 21.719 establece la obligacion del responsable de adoptar medidas de seguridad tecnicas y organizativas apropiadas al riesgo, considerando la naturaleza, alcance, contexto y fines del tratamiento. El Art. 3 lit. f consagra el principio de seguridad, que exige garantizar la confidencialidad, integridad y disponibilidad de los datos personales. La infraestructura de seguridad implementada responde directamente a estas exigencias: el aislamiento multi-tenant garantiza confidencialidad, los checksums y soft delete aseguran integridad y disponibilidad, las cabeceras OWASP protegen contra ataques web, y los SAS tokens temporales minimizan la exposicion de datos en transito. Estas medidas son obligaciones legales expresas, no opcionales.

---

## 38. Scheduler y Automatizacion

**Base legal:** Art. 14 (deber del responsable) + Art. 14 sexies (plazos legales)
**Clasificacion:** BUENA PRACTICA

### Para el DPO y equipo tecnico

El scheduler de la plataforma es un sistema de automatizacion in-process basado en asyncio puro, sin dependencias externas como Redis o Celery. Gestiona 6 jobs configurables de manera independiente: notificaciones programadas (cada 60 minutos), verificacion de SLA ARCOP (cada 30 minutos), purga de papelera (cada 24 horas), reintento de notificaciones fallidas (cada 15 minutos), revision de documentos (cada 24 horas) y snapshots de KPI (cada 24 horas). Cada job opera con aislamiento per-tenant, lo que significa que un error en un tenant no afecta el procesamiento de otros. El graceful shutdown via task.cancel() asegura terminacion limpia. Los delays iniciales escalonados de 10 a 60 segundos previenen sobrecarga de la base de datos al arrancar el sistema. Un toggle master permite deshabilitar todos los jobs.

### Para la gerencia

La automatizacion de tareas recurrentes elimina la dependencia del factor humano para operaciones criticas de cumplimiento. El scheduler ejecuta automaticamente verificaciones de plazos legales ARCOP (evitando vencimientos que generan denegaciones presuntas), alertas de documentos por revisar, purga de datos conforme a politicas de retencion, y reintentos de notificaciones fallidas. Todo esto ocurre sin intervencion manual y con aislamiento de errores: si un proceso falla para una organizacion, las demas continuan operando normalmente. La configuracion flexible permite ajustar intervalos segun las necesidades operativas. Esta automatizacion no solo ahorra tiempo sino que garantiza consistencia en el cumplimiento de plazos legales que, de gestionarse manualmente, serian propensos a errores.

### Funcionalidades

| Funcionalidad | Descripcion |
|---|---|
| **Scheduler in-process** | Motor de automatizacion basado en asyncio puro, sin dependencias externas (Redis/Celery) |
| **6 jobs configurables** | Notifications (60min), ARCOP SLA (30min), trash purge (24h), retry (15min), document review (24h), KPI snapshot (24h) |
| **Graceful shutdown** | Terminacion limpia via task.cancel() al detener la aplicacion |
| **Delays escalonados** | Inicio diferido de 10 a 60 segundos por job para no sobrecargar la DB al arrancar |
| **Aislamiento per-tenant** | Cada job procesa tenants de forma independiente, errores no se propagan entre organizaciones |
| **Error isolation per-job** | Un fallo en un job no afecta la ejecucion de los demas jobs del scheduler |
| **Toggle master** | Variable scheduler_enabled para habilitar o deshabilitar todos los jobs globalmente |
| **Offboarding checks** | Verificacion de deadlines de purga para tenants suspendidos integrada con trash purge |

### Fundamento normativo

El Art. 14 de la Ley 21.719 exige al responsable adoptar medidas necesarias para cumplir la ley. El Art. 14 sexies establece plazos legales especificos para diversas obligaciones, incluyendo respuesta a solicitudes ARCOP y notificacion de brechas. La automatizacion via scheduler es el mecanismo que garantiza el cumplimiento sistematico de estos plazos sin depender de la diligencia individual. La verificacion automatica de SLA ARCOP cada 30 minutos previene vencimientos que generarian denegaciones presuntas perjudiciales para la organizacion. La purga automatizada de datos conforme a politicas de retencion cumple el principio de limitacion de la conservacion. Si bien un scheduler no es una exigencia legal expresa, es la herramienta practica que hace viable el cumplimiento consistente de obligaciones con plazos definidos.

---

## Tabla Resumen: Cobertura Normativa

| Articulo | Tema | Funcionalidades que lo cubren |
|----------|------|-------------------------------|
| Art. 3 lit. a | Licitud del tratamiento | Sec. 3 (RAT - bases de licitud), Sec. 29 (avisos de privacidad) |
| Art. 3 lit. b | Finalidad | Sec. 3 (RAT - declaracion de finalidades), Sec. 29 (avisos de privacidad) |
| Art. 3 lit. c | Transparencia e informacion | Sec. 26 (Trust Center), Sec. 27 (ayuda y UX), Sec. 29 (avisos de privacidad) |
| Art. 3 lit. d | Proporcionalidad | Sec. 3 (RAT - categorias de datos), Sec. 4 (evaluacion de riesgo) |
| Art. 3 lit. e | Calidad de datos | Sec. 3 (RAT - versionamiento), Sec. 9 (consentimientos - actualizacion) |
| Art. 3 lit. f | Seguridad | Sec. 6 (medidas de seguridad), Sec. 37 (infraestructura de seguridad) |
| Art. 3 lit. g | Responsabilidad proactiva | Sec. 1 (diagnostico), Sec. 13 (audit log), Sec. 14 (dashboard), Sec. 33 (reports) |
| Art. 5 | Derecho de acceso | Sec. 8 (ARCOP), Sec. 28 (portal ARCOP publico) |
| Art. 6 | Derecho de rectificacion | Sec. 8 (ARCOP), Sec. 28 (portal ARCOP publico) |
| Art. 7 | Derecho de cancelacion | Sec. 8 (ARCOP), Sec. 28 (portal ARCOP publico) |
| Art. 8 | Derecho de oposicion | Sec. 8 (ARCOP), Sec. 28 (portal ARCOP publico) |
| Art. 8 bis | Derecho sobre decisiones automatizadas | Sec. 8 (ARCOP - tipo AUTOMATED_DECISION_REVIEW) |
| Art. 9 | Derecho de portabilidad | Sec. 8 (ARCOP - tipo PORTABILITY), Sec. 36 (exportacion tenant) |
| Art. 11 | Procedimiento derechos ARCOP | Sec. 8 (ARCOP - SLA, plazos, workflow), Sec. 38 (scheduler SLA checks) |
| Art. 12 | Consentimiento | Sec. 9 (gestion de consentimientos), Sec. 28 (widget embebible, CMP banner) |
| Art. 13 | Tratamiento datos sensibles | Sec. 3 (RAT - categorias sensibles), Sec. 4 (riesgo - reglas hard) |
| Art. 14 | Deber del responsable | Sec. 1-38 (transversal a toda la plataforma) |
| Art. 14 bis | Registro de actividades | Sec. 3 (RAT completo con versionamiento y aprobacion) |
| Art. 14 quater | Proteccion desde el diseno | Sec. 5 (EIPD), Sec. 25 (Privacy by Design), Sec. 34 (asistente IA PbD) |
| Art. 14 quinquies | Medidas de seguridad | Sec. 6 (medidas y checklists), Sec. 31 (evaluacion vendors), Sec. 37 (infraestructura) |
| Art. 14 sexies | Plazos legales | Sec. 8 (ARCOP SLA), Sec. 10 (brechas - plazos), Sec. 38 (scheduler) |
| Art. 15 bis | Encargado de tratamiento | Sec. 7 (vendors/DPA), Sec. 28 (portal encargado), Sec. 31 (evaluacion riesgo), Sec. 35 (super-admin) |
| Art. 15 ter | Sub-encargados | Sec. 7 (vendors - cadena de sub-encargados), Sec. 35 (sub-procesadores plataforma) |
| Art. 16 | Deber de secreto | Sec. 2 (RBAC - control de acceso), Sec. 19 (documentos - confidencialidad) |
| Art. 16 quater | Deber de informacion brechas | Sec. 10 (brechas - notificacion con plazos legales) |
| Art. 20 | Transferencias internacionales | Sec. 20 (transferencias - adecuacion paises, cloud regions) |
| Art. 27 | Transferencia con garantias | Sec. 20 (transferencias - clausulas contractuales tipo) |
| Art. 28 | Excepciones transferencia | Sec. 20 (transferencias - excepciones reguladas) |
| Art. 34-35 | Autoridad de control | Sec. 8 (ARCOP - reporte a autoridad), Sec. 10 (brechas - notificacion autoridad) |
| Art. 49 | Modelo de prevencion | Sec. 1 (diagnostico), Sec. 30 (certificaciones), Sec. 13 (audit log inmutable) |
| Art. 50 | Atenuantes sancionatorias | Sec. 30 (certificaciones vigentes), Sec. 13 (audit log como evidencia) |

## Estadisticas de Cobertura

| Metrica | Valor |
|---------|-------|
| Dominios funcionales | 38 |
| Clasificacion EXIGIDO | 22 |
| Clasificacion BUENA PRACTICA | 16 |
| Articulos de ley cubiertos | 30 |
| Funcionalidades totales | 115+ |

## Gaps Pendientes

Para el detalle de gaps aun no implementados, consultar `docs/gapskulvio.md`. Al 2 de marzo de 2026, quedan 3 gaps pendientes con base en la normativa chilena.
