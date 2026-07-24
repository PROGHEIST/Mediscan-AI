# MediScan AI

MediScan AI is a React/Vite healthcare demo with a lightweight Node.js REST API for educational AI healthcare workflows.

## Frontend

```bash
npm install
npm run dev
npm run build
```

## Backend REST API

Start the mock backend:

```bash
npm run api
```

The API runs on `http://localhost:4000` by default and supports CORS for local frontend development.

### Routes

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Service health check and disclaimer. |
| `GET` | `/api/doctors` | Mock doctor directory. |
| `GET` | `/api/dashboard` | Mock patient dashboard metrics and weekly chart data. |
| `POST` | `/api/symptom-checker` | Keyword-based symptom triage simulation. |
| `POST` | `/api/risk-prediction` | Simulated risk score from age, BMI, BP, sugar, smoking, and exercise inputs. |
| `POST` | `/api/report-analyzer` | Mock medical report analysis response. |
| `POST` | `/api/appointments` | Demo appointment request confirmation. |
| `POST` | `/api/chat` | Mock medical chatbot reply. |

Example symptom request:

```bash
curl -X POST http://localhost:4000/api/symptom-checker \
  -H "Content-Type: application/json" \
  -d '{"symptoms":"fever cough fatigue"}'
```

> This project is for educational and demonstration purposes only. It does not provide medical diagnosis or treatment.
