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
