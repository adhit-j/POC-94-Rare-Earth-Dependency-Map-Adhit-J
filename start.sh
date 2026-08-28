#!/bin/sh
set -e

# Start FastAPI backend in background on port 8000
echo "Starting FastAPI backend on port 8000..."
cd /app/backend
python -m uvicorn main:app --host 0.0.0.0 --port 8000 &

# Wait for backend to be ready
echo "Waiting for FastAPI to initialize..."
sleep 3

# Start Next.js frontend on port 3000
echo "Starting Next.js frontend on port 3000..."
cd /app/frontend
exec npm run start -- -p 3000
