# Real Rails: Rare Earth Dependency Map (POC-94)

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Frontend](https://img.shields.io/badge/Frontend-Next.js%2014-black?logo=next.js)
![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi)
![Map Engine](https://img.shields.io/badge/Map-Leaflet-199900?logo=leaflet)

A production-style intelligence dashboard built for the **Real Rails Intelligence Library**. This Proof of Concept (PoC) visualizes the global supply chain of 17 critical rare earth elements (REEs), mapping extraction nodes and processing facilities to highlight geopolitical dependencies and single-point-of-failure risks.

## 🎯 Project Overview

Rare earth elements are the invisible backbone of modern defense, energy, and tech infrastructure—from EV batteries and wind turbines to fighter jet sensors. A supply disruption ripples across every industrial sector simultaneously. 

This dashboard transforms raw geospatial and macroeconomic data into actionable intelligence:
- **Geospatial Mapping:** Animated radar-ping markers visualizing global extraction and processing sites.
- **Live Macroeconomic Data:** Streams real-time export metrics directly from the **World Bank API**.
- **Interactive Analytics:** Side-by-side country comparison of production, processing, and risk scores using Recharts.
- **Intelligence Layer:** Translates raw data into insights, explicitly calling out severe import exposures (e.g., USA's 74% reliance on external processing).

## ✨ Features

- **Premium Fintech UI:** Strict adherence to the Real Rails visual identity (Obsidian Black `#030712`, Electric Cyan `#38BDF8`, and glassmorphism).
- **Interactive Map:** Built with `react-leaflet`, featuring dual-tile layers (dark basemap + label overlay), dynamic tooltips, and a live HUD.
- **Data Filtering:** Real-time toggles between Extraction Nodes and Processing Facilities.
- **Resilient Architecture (The 2-Hour Rule):** If the live World Bank API fails or is rate-limited, the FastAPI backend automatically executes a "Mock Fallback Guardrail" to keep the dashboard 100% functional for demos.
- **Export Data:** 1-click download of the raw GeoJSON data directly from the intelligence sidebar.

## 🛠️ Technology Stack

**Frontend (`/frontend`)**
* Next.js (App Router)
* TypeScript
* Tailwind CSS
* React-Leaflet (Geospatial Rendering)
* Recharts (Interactive Analytics)

**Backend (`/backend`)**
* Python 3.11+
* FastAPI
* Uvicorn (ASGI Server)
* World Bank API Integration

## 🚀 Getting Started

To run this project locally, you will need to start both the backend API and the frontend web server in two separate terminal windows.

### 1. Start the Backend Engine

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```
*The API will start at `http://127.0.0.1:8000`*

### 2. Start the Frontend Dashboard

```bash
cd frontend
npm install
npm run dev
```
*The dashboard will be available at `http://localhost:3000`*

## 🔒 Security

This project was built with a strict "No Hardcoded Credentials" guardrail. By utilizing the open-source Leaflet engine and the public World Bank API, the dashboard requires **zero API keys** to function. Furthermore, `.gitignore` files are explicitly configured in both directories to prevent accidental credential leaks.

## 📝 Data Sources
* [USGS Mineral Resources Data System (MRDS)](https://mrdata.usgs.gov/)
* [World Bank Open Data API](https://data.worldbank.org/)

---
*Built following the Real Rails Data Exhaust Protocol.*
