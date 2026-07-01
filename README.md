# CarDekho - Car Recommendation Platform

A car recommendation platform where users answer a few questions instead of searching manually. Built as an assignment MVP.

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js, Express, TypeScript
- **Data:** JSON file (`car.json`) — no database

## Pages

1. **Home** — Multi-step questionnaire with progress bar
2. **Recommendations** — Ranked car matches with scores
3. **Compare** — Side-by-side comparison of 2–3 cars

## Getting Started

### Install dependencies

```bash
npm run install:all
```

### Run both frontend and backend

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### Run separately

```bash
npm run dev:server   # Backend on port 5000
npm run dev:client   # Frontend on port 5173
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/questions` | Questionnaire structure |
| GET | `/api/cars` | List all cars |
| GET | `/api/cars/:id` | Single car details |
| POST | `/api/recommend` | Get recommendations from answers |
| POST | `/api/compare` | Compare 2–3 cars by ID |

## Project Structure

```
cardekho/
├── client/          # React frontend
├── server/          # Express backend
│   └── src/data/car.json
└── package.json     # Root scripts
```

## Environment

Optional frontend env variable:

```
VITE_API_URL=http://localhost:5000/api
```

Defaults to `http://localhost:5000/api` if not set.
