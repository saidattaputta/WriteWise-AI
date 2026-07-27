# System Architecture

# WriteWise AI

Version: 1.0

Status: Draft

---

# Overview

WriteWise AI follows a cloud-native client-server architecture.

The frontend communicates with the backend using REST APIs.

The backend communicates with external services such as the LLM API, PostgreSQL database, and AWS S3 storage.

---

# High-Level Architecture

```
                 React Frontend
                       │
                 HTTPS / REST API
                       │
                FastAPI Backend
                       │
      ┌────────────────┼────────────────┐
      │                │                │
   LLM API        PostgreSQL        AWS S3
      │                │                │
Prompt Engine     User Data      File Storage
```

---

# Components

## Frontend

Responsibilities:

- User interface
- Authentication screens
- Dashboard
- AI Generator
- Rich Text Editor
- API requests
- Display responses

---

## Backend

Responsibilities:

- Business logic
- Authentication
- Validation
- AI orchestration
- Database operations
- File management

---

## AI Engine

Responsibilities:

- Prompt construction
- LLM communication
- Response parsing
- Error handling

---

## PostgreSQL

Stores:

- Users
- Documents
- Drafts
- Templates
- Settings
- Prompt history

---

## AWS S3

Stores:

- Exported PDFs
- DOCX files
- Uploaded images
- User assets

---

# Communication Flow

User

↓

Frontend

↓

REST API

↓

FastAPI

↓

Business Logic

↓

LLM / Database / AWS

↓

FastAPI

↓

Frontend

↓

User

---

# API Flow

Frontend sends HTTP requests.

↓

Backend validates input.

↓

Business logic executes.

↓

Database or AI service processes request.

↓

Backend returns JSON response.

---

# Security

- HTTPS
- JWT Authentication
- Password hashing
- Input validation

---

# Scalability

The architecture supports:

- Horizontal backend scaling
- Independent frontend deployment
- Database scaling
- Cloud storage
- Future microservices

---

# Deployment

Frontend

↓

Vercel

Backend

↓

Render

Database

↓

Neon PostgreSQL

Storage

↓

AWS S3

---

# End of Document