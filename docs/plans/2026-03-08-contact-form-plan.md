# Contact Form Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the contact form functional — submissions send email via SendGrid, protected by Cloudflare Turnstile CAPTCHA, all in a single Docker container.

**Architecture:** nginx proxies `/api/` to a Flask app on port 5000. Flask validates Turnstile token, sends email via SendGrid, returns JSON. Supervisord runs both nginx and gunicorn in one container. Secrets passed as env vars.

**Tech Stack:** Python 3.12, Flask, gunicorn, sendgrid SDK, Cloudflare Turnstile, supervisord, nginx

---

### Task 1: Create Python API — Flask app

**Files:**
- Create: `api/app.py`
- Create: `api/requirements.txt`

**Step 1: Create `api/requirements.txt`**

```
flask==3.1.*
gunicorn==23.*
sendgrid==6.*
```

**Step 2: Create `api/app.py`**

```python
import os
import requests
from flask import Flask, request, jsonify
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To, Content

app = Flask(__name__)

SENDGRID_API_KEY = os.environ["SENDGRID_API_KEY"]
TURNSTILE_SECRET = os.environ["TURNSTILE_SECRET_KEY"]
CONTACT_EMAIL = os.environ.get("CONTACT_EMAIL", "contacto@solutoria.info")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "contacto@solutoria.info")

INTEREST_LABELS = {
    "demo": "Solicitar una demostración",
    "pricing": "Información de precios",
    "technical": "Consulta técnica",
    "security": "Consulta de seguridad",
    "other": "Otro",
}


@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json(silent=True)
    if not data:
        return jsonify(error="Datos inválidos."), 400

    # Required fields
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    token = (data.get("cf-turnstile-response") or "").strip()

    if not name or not email:
        return jsonify(error="Nombre y correo son obligatorios."), 400
    if not token:
        return jsonify(error="Completa la verificación de seguridad."), 400

    # Validate Turnstile
    try:
        r = requests.post(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            data={"secret": TURNSTILE_SECRET, "response": token},
            timeout=5,
        )
        result = r.json()
        if not result.get("success"):
            return jsonify(error="Verificación de seguridad fallida. Intenta de nuevo."), 403
    except Exception:
        return jsonify(error="Error al verificar. Intenta de nuevo."), 500

    # Build email
    company = (data.get("company") or "").strip() or "No especificada"
    interest_key = (data.get("interest") or "").strip()
    interest = INTEREST_LABELS.get(interest_key, interest_key or "No especificado")
    message = (data.get("message") or "").strip() or "Sin mensaje"

    body = f"""Nueva solicitud desde kulvio.cl

Nombre: {name}
Email: {email}
Empresa: {company}
Interés: {interest}
Mensaje:
{message}
"""

    mail = Mail(
        from_email=Email(SENDER_EMAIL, "Kulvio Web"),
        to_emails=To(CONTACT_EMAIL),
        subject=f"[Kulvio] Nueva solicitud: {interest}",
        plain_text_content=Content("text/plain", body),
    )
    # Reply-To so you can reply directly to the person
    mail.reply_to = Email(email, name)

    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(mail)
        if response.status_code >= 400:
            return jsonify(error="Error al enviar. Intenta más tarde."), 500
    except Exception:
        return jsonify(error="Error al enviar. Intenta más tarde."), 500

    return jsonify(success=True), 200


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify(status="ok"), 200
```

**Step 3: Commit**

```bash
git add api/app.py api/requirements.txt
git commit -m "feat: add Flask API for contact form (SendGrid + Turnstile)"
```

---

### Task 2: Docker infrastructure — supervisord + Dockerfile

**Files:**
- Create: `supervisord.conf`
- Modify: `Dockerfile`

**Step 1: Create `supervisord.conf`**

```ini
[supervisord]
nodaemon=true
logfile=/dev/stdout
logfile_maxbytes=0
pidfile=/tmp/supervisord.pid

[program:nginx]
command=nginx -g "daemon off;"
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
autorestart=true

[program:api]
command=gunicorn --bind 127.0.0.1:5000 --workers 2 --timeout 30 app:app
directory=/app/api
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
autorestart=true
```

**Step 2: Rewrite `Dockerfile`**

```dockerfile
FROM python:3.12-alpine

# Install nginx and supervisor
RUN apk add --no-cache nginx supervisor

# Python dependencies
COPY api/requirements.txt /app/api/requirements.txt
RUN pip install --no-cache-dir -r /app/api/requirements.txt

# Copy application code
COPY api/ /app/api/
COPY public/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY supervisord.conf /etc/supervisord.conf

# Remove default nginx config that conflicts
RUN rm -f /etc/nginx/http.d/default.conf

EXPOSE 8000

CMD ["supervisord", "-c", "/etc/supervisord.conf"]
```

**Step 3: Commit**

```bash
git add Dockerfile supervisord.conf
git commit -m "feat: Dockerfile with Python + nginx via supervisord"
```

---

### Task 3: nginx reverse proxy for /api/

**Files:**
- Modify: `nginx.conf`

**Step 1: Add proxy block to `nginx.conf`**

Add this block BEFORE the `location /` block (around line 42):

```nginx
    # API proxy to Flask
    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 30s;
    }
```

**Step 2: Commit**

```bash
git add nginx.conf
git commit -m "feat: nginx proxy /api/ to Flask backend"
```

---

### Task 4: Frontend — add Turnstile widget to contact.html

**Files:**
- Modify: `public/contact.html`

**Step 1: Add Turnstile script**

Add before `</head>` (before the analytics include on line 40):

```html
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
```

**Step 2: Add Turnstile widget in form**

Insert after the privacy-consent checkbox label (after line 160), before the submit button:

```html
            <div class="cf-turnstile" data-sitekey="0x4AAAAAAChmpJCUtE2oBfBr" data-theme="light"></div>
```

**Step 3: Add form error display element**

Insert after the submit button (after line 164), before the privacy-notice:

```html
            <p class="form-error" id="form-error" style="display:none;"></p>
```

**Step 4: Commit**

```bash
git add public/contact.html
git commit -m "feat: add Cloudflare Turnstile widget to contact form"
```

---

### Task 5: Frontend — update JS to POST to API

**Files:**
- Modify: `public/js/main.js`

**Step 1: Replace the contact form handler (lines 122-133)**

Replace the existing handler with:

```javascript
  // --- Contact form ---
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const errorEl = document.getElementById('form-error');
      const btnText = btn.innerHTML;

      // Reset error state
      if (errorEl) { errorEl.style.display = 'none'; errorEl.textContent = ''; }

      // Get Turnstile token
      const token = form.querySelector('[name="cf-turnstile-response"]')?.value;
      if (!token) {
        if (errorEl) { errorEl.textContent = 'Completa la verificación de seguridad.'; errorEl.style.display = 'block'; }
        return;
      }

      // Disable button, show loading
      btn.disabled = true;
      btn.innerHTML = 'Enviando...';

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.querySelector('#name').value,
            email: form.querySelector('#email').value,
            company: form.querySelector('#company').value,
            interest: form.querySelector('#interest').value,
            message: form.querySelector('#message').value,
            'cf-turnstile-response': token,
          }),
        });
        const data = await res.json();

        if (data.success) {
          form.style.display = 'none';
          const success = document.querySelector('.form-success');
          if (success) success.classList.add('show');
        } else {
          if (errorEl) { errorEl.textContent = data.error || 'Error al enviar. Intenta de nuevo.'; errorEl.style.display = 'block'; }
          // Reset Turnstile for retry
          if (window.turnstile) turnstile.reset();
        }
      } catch {
        if (errorEl) { errorEl.textContent = 'Error de conexión. Intenta de nuevo.'; errorEl.style.display = 'block'; }
        if (window.turnstile) turnstile.reset();
      } finally {
        btn.disabled = false;
        btn.innerHTML = btnText;
      }
    });
  }
```

**Step 2: Commit**

```bash
git add public/js/main.js
git commit -m "feat: contact form JS posts to /api/contact with Turnstile"
```

---

### Task 6: CSS — error state + Turnstile spacing

**Files:**
- Modify: `public/css/styles.css`

**Step 1: Add form error and Turnstile styles**

Add after `.privacy-notice a:hover` block (after line 1324):

```css
.form-error {
  color: var(--red);
  font-size: 0.88rem;
  margin-top: 12px;
  line-height: 1.5;
}

.cf-turnstile {
  margin-bottom: 16px;
}
```

**Step 2: Commit**

```bash
git add public/css/styles.css
git commit -m "feat: form error and Turnstile widget styles"
```

---

### Task 7: Bump asset versions + test locally

**Files:**
- Modify: `public/contact.html` (bump `styles.css?v=13`, `main.js?v=12`)

**Step 1: Update version params in contact.html**

- `css/styles.css?v=12` → `css/styles.css?v=13`
- `js/main.js?v=11` → `js/main.js?v=12`

**Step 2: Build and test locally**

```bash
cd /c/GIT/kulvioweb
docker build -t kulvioweb-test .
docker run --rm -p 8001:8000 \
  -e SENDGRID_API_KEY="SG.xxx" \
  -e TURNSTILE_SECRET_KEY="0x4AAAAAAChmpGhqQthv4xE-dEwZIY1RD1I" \
  kulvioweb-test
```

Test the API:
```bash
curl -X POST http://localhost:8001/api/health
# Expected: {"status":"ok"}

curl -X POST http://localhost:8001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.cl","cf-turnstile-response":"fake"}'
# Expected: 403 (Turnstile validation fails with fake token — that's correct)
```

Visit `http://localhost:8001/contact` in browser — verify Turnstile widget renders.

**Step 3: Commit**

```bash
git add public/contact.html
git commit -m "chore: bump asset versions for contact form changes"
```

---

### Task 8: Configure environment on server

**Not in this repo.** After merging, on the deployment server:

1. In the infra docker-compose, add env vars to the `kulvioweb` service:
   ```yaml
   environment:
     - SENDGRID_API_KEY=<your-sendgrid-api-key>
     - TURNSTILE_SECRET_KEY=<your-turnstile-secret-key>
     - CONTACT_EMAIL=contacto@solutoria.info
     - SENDER_EMAIL=contacto@solutoria.info
   ```

2. **SendGrid sender verification**: Ensure `contacto@solutoria.info` (or whatever `SENDER_EMAIL` you use) is verified as a sender in SendGrid. Go to SendGrid dashboard → Settings → Sender Authentication.

3. Deploy: `git push origin main` (Actions workflow handles the rest).

4. Test live: submit the form on `https://kulvio.cl/contact` and verify email arrives.
