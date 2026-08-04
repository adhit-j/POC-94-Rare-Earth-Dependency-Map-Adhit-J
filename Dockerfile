# --- Frontend Builder ---
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY .env ./
COPY frontend/ ./
RUN npm run build

# --- Frontend Runner ---
FROM node:18-alpine AS frontend
WORKDIR /app/frontend
ENV NODE_ENV=production
COPY frontend/package*.json ./
RUN npm ci --omit=dev
COPY --from=frontend-builder /app/frontend/.env ./.env
COPY --from=frontend-builder /app/frontend/.next ./.next
COPY --from=frontend-builder /app/frontend/next.config.mjs ./

EXPOSE 3000
CMD ["npm", "run", "start"]

# --- Backend Runner ---
FROM python:3.11-slim AS backend
WORKDIR /app/backend
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ ./

EXPOSE 8000
CMD ["python", "main.py"]
