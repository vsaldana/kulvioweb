# Contact Form — Design

## Goal

Make the contact form on `/contact` functional: submissions send an email to `contacto@solutoria.info` via SendGrid, protected by Cloudflare Turnstile CAPTCHA.

## Architecture

Single Docker container running nginx + Python (Flask) via supervisord.

```
Browser ──POST /api/contact──▶ nginx ──proxy_pass──▶ Flask :5000
                                                      │         │
                                                      ▼         ▼
                                               Cloudflare   SendGrid
                                               Turnstile    Email API
```

## Components

### 1. Python API (`api/app.py`)

Flask app, single route `POST /api/contact`:

- Receives JSON: name, email, company, interest, message, cf-turnstile-response
- Validates Turnstile token against `https://challenges.cloudflare.com/turnstile/v0/siteverify`
- If valid, sends email via SendGrid to `contacto@solutoria.info`
- Returns `{success: true}` or `{error: "..."}` with appropriate HTTP status

### 2. nginx (`nginx.conf`)

Add `location /api/` block with `proxy_pass http://127.0.0.1:5000;`

### 3. Frontend (`contact.html` + `main.js`)

- Add Turnstile script and widget to the form
- JS `fetch('/api/contact')` on submit instead of client-only success
- Handle loading, success, and error states

### 4. Dockerfile

- Base: `python:3.12-alpine` + nginx installed via apk
- Install pip dependencies: flask, sendgrid, gunicorn
- Use supervisord to run nginx + gunicorn together

### 5. Environment variables (never hardcoded)

- `SENDGRID_API_KEY`
- `TURNSTILE_SECRET_KEY`
- `CONTACT_EMAIL` (default: contacto@solutoria.info)

## Email format

```
From: Kulvio Web <noreply@kulvio.cl>
To: contacto@solutoria.info
Subject: [Kulvio] Nueva solicitud: Solicitar una demostración

Nombre: Juan Pérez
Email: juan@empresa.cl
Empresa: Empresa SpA
Interés: Solicitar una demostración
Mensaje: ...
```

## Turnstile keys

- Site key: `0x4AAAAAAChmpJCUtE2oBfBr` (public, goes in HTML)
- Secret key: passed as `TURNSTILE_SECRET_KEY` env var

## SendGrid

- API key passed as `SENDGRID_API_KEY` env var
- Sender must be verified in SendGrid (domain or single sender)
