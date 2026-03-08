"""Kulvio contact-form API.

Lightweight Flask backend that sits behind nginx and handles:
  POST /api/contact  — validate Turnstile, send email via SendGrid
  GET  /api/health   — liveness probe
"""

import os

import requests as http_requests
from flask import Flask, jsonify, request
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To, Content, ReplyTo

app = Flask(__name__)

# ---------------------------------------------------------------------------
# Configuration (all from environment)
# ---------------------------------------------------------------------------
SENDGRID_API_KEY = os.environ.get("SENDGRID_API_KEY", "")
TURNSTILE_SECRET_KEY = os.environ.get("TURNSTILE_SECRET_KEY", "")
CONTACT_EMAIL = os.environ.get("CONTACT_EMAIL", "contacto@solutoria.info")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "contacto@solutoria.info")

INTEREST_LABELS = {
    "demo": "Solicitar una demostración",
    "pricing": "Información de precios",
    "technical": "Consulta técnica",
    "security": "Consulta de seguridad",
    "other": "Otro",
}

TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify"

# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------


@app.route("/api/health", methods=["GET"])
def health():
    """Simple liveness check."""
    return jsonify({"status": "ok"})


@app.route("/api/contact", methods=["POST"])
def contact():
    """Handle contact-form submissions."""
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Solicitud inválida."}), 400

    # --- Required fields ---------------------------------------------------
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    turnstile_token = (data.get("cf-turnstile-response") or "").strip()

    if not name:
        return jsonify({"error": "El nombre es obligatorio."}), 422
    if not email:
        return jsonify({"error": "El email es obligatorio."}), 422
    if not turnstile_token:
        return jsonify({"error": "Verificación anti-bot requerida."}), 422

    # --- Optional fields ---------------------------------------------------
    company = (data.get("company") or "").strip()
    interest_key = (data.get("interest") or "other").strip()
    message = (data.get("message") or "").strip()

    interest_label = INTEREST_LABELS.get(interest_key, "Otro")

    # --- Turnstile verification --------------------------------------------
    try:
        ts_resp = http_requests.post(
            TURNSTILE_VERIFY_URL,
            data={
                "secret": TURNSTILE_SECRET_KEY,
                "response": turnstile_token,
            },
            timeout=10,
        )
        ts_result = ts_resp.json()
    except Exception:
        return jsonify({"error": "Error al verificar anti-bot."}), 502

    if not ts_result.get("success"):
        return jsonify({"error": "Verificación anti-bot fallida."}), 403

    # --- Build email -------------------------------------------------------
    body_text = (
        "Nueva solicitud desde kulvio.cl\n"
        "\n"
        f"Nombre: {name}\n"
        f"Email: {email}\n"
        f"Empresa: {company or 'No especificada'}\n"
        f"Interés: {interest_label}\n"
        "Mensaje:\n"
        f"{message or 'Sin mensaje'}\n"
    )

    mail = Mail(
        from_email=Email(SENDER_EMAIL, "Kulvio Web"),
        to_emails=To(CONTACT_EMAIL),
        subject=f"[Kulvio] Nueva solicitud: {interest_label}",
        plain_text_content=Content("text/plain", body_text),
    )
    mail.reply_to = ReplyTo(email)

    # --- Send via SendGrid -------------------------------------------------
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(mail)
        if response.status_code >= 400:
            return jsonify({"error": "Error al enviar el mensaje."}), 502
    except Exception:
        return jsonify({"error": "Error al enviar el mensaje."}), 502

    return jsonify({"success": True})
