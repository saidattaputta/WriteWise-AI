# REST API Design

# WriteWise AI

Version: 1.0

Status: Draft

---

# Overview

The backend exposes REST APIs that allow the frontend to communicate with the application.

All responses are returned in JSON format unless downloading exported files.

Base URL

/api/v1

---

# Health

## GET /health

Description

Check backend availability.

Response

200 OK

```json
{
  "status": "healthy"
}
```

---

# Authentication

## POST /auth/register

Create a new user account.

Request

```json
{
  "full_name": "",
  "email": "",
  "password": ""
}
```

Response

```json
{
  "message": "User registered successfully"
}
```

---

## POST /auth/login

Authenticate user.

Request

```json
{
  "email": "",
  "password": ""
}
```

Response

```json
{
  "access_token": "",
  "token_type": "bearer"
}
```

---

## POST /auth/google

Google OAuth login.

---

## GET /auth/profile

Return authenticated user profile.

---

# Users

## PUT /users/profile

Update user profile.

---

## DELETE /users/profile

Delete user account.

---

# AI Generation

## POST /generate

Generate a new document.

Request

```json
{
  "document_type": "",
  "tone": "",
  "prompt": ""
}
```

Response

```json
{
  "title": "",
  "content": ""
}
```

---

## POST /rewrite

Rewrite existing text.

Request

```json
{
  "text": "",
  "tone": ""
}
```

---

## POST /expand

Expand text.

---

## POST /shorten

Shorten text.

---

## POST /grammar

Correct grammar.

---

# Templates

## GET /templates

Return all templates.

---

## GET /templates/{id}

Return a template.

---

# Documents

## GET /documents

List user documents.

---

## GET /documents/{id}

Return document.

---

## POST /documents

Create document.

---

## PUT /documents/{id}

Update document.

---

## DELETE /documents/{id}

Delete document.

---

# Drafts

## POST /drafts

Save draft.

---

## PUT /drafts/{id}

Update draft.

---

## DELETE /drafts/{id}

Delete draft.

---

# Export

## POST /export/pdf

Export PDF.

---

## POST /export/docx

Export DOCX.

---

## POST /export/html

Export HTML.

---

## POST /export/txt

Export TXT.

---

# Error Response

```json
{
  "success": false,
  "message": "",
  "errors": []
}
```

---

# Authentication

Protected endpoints require:

Authorization: Bearer <JWT_TOKEN>

---

# API Versioning

Current Version

v1

Future versions

v2

v3

---

# End of Document