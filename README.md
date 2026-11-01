# WriteWise AI

A full-stack AI-assisted writing application for generating professional letters and messages from structured inputs such as recipient, purpose, tone, and additional requirements. The application combines a React/TypeScript frontend, FastAPI backend, PostgreSQL persistence, JWT authentication, and Google's Gemini API.

## Live Application

- **Frontend:** https://writewise-ai-frontend.onrender.com
- **Backend API:** https://writewise-ai-1.onrender.com
- **Swagger documentation:** https://writewise-ai-1.onrender.com/docs

Confirm the frontend URL is still the active production address before sharing the demo.

## Features

### AI Writing

- Generate professional letters and messages from user-provided context.
- Customize recipient, purpose, tone, and requirements.
- Use a backend prompt-building and response-parsing workflow around Gemini.

### Accounts and History

- User registration and login
- Password hashing and JWT-based authentication
- Protected API endpoints
- User-associated letter history
- View, copy, and delete previously generated letters
- PostgreSQL persistence with SQLAlchemy and Alembic migrations

### Application API

The FastAPI backend organizes endpoints under `/api/v1` for authentication, letter generation, user information, and letter history. Interactive Swagger documentation is exposed by the deployed API.

## Architecture

```text
React + TypeScript frontend
          |
          | HTTPS / REST
          v
FastAPI backend
    |              |
    v              v
PostgreSQL      Gemini API
```

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Backend | Python, FastAPI, Pydantic, Uvicorn |
| Database | PostgreSQL, SQLAlchemy, Alembic |
| Authentication | JWT, bcrypt/password hashing |
| LLM | Google Gemini API |
| Deployment | Render |

## Repository Structure

```text
.
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── ai/
│   │   ├── auth/
│   │   ├── core/
│   │   ├── db/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── schemas/
│   │   └── services/
│   ├── alembic/
│   ├── tests/
│   ├── requirements.txt
│   ├── alembic.ini
│   └── .env.example
├── docs/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── pngs/
└── README.md
```

The repository also contains local development artifacts, including a local database and a checked-in virtual-environment directory. Those files have not been modified or removed during this documentation-only cleanup.

## Local Development

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
```

Create a `.env` file using `.env.example` as a reference. Configure the database URL, Gemini API key, JWT secret, and other settings required by the backend.

Run migrations:

```bash
alembic upgrade head
```

Start the API:

```bash
uvicorn app.main:app --reload
```

### Frontend

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

Use the frontend environment configuration to point the client to the backend URL for your local setup.

## Security Notes

- Never commit real API keys, database credentials, or JWT signing secrets.
- Use strong, unique secrets in production.
- Keep production credentials in the hosting provider's environment/secrets configuration.
- Review access controls and user-level authorization before deploying changes.

## Scope and Limitations

WriteWise demonstrates a complete core workflow from account creation to AI-assisted content generation and saved history. Generated text should be reviewed by the user before sending, especially where legal, financial, employment, or other consequential wording is involved. The quality of generated content depends on user input and model behavior.

## Screenshots

Application screenshots are available in the `pngs/` directory.

---

**Sai Datta Putta**

[LinkedIn](https://www.linkedin.com/in/sai-datta-putta/)