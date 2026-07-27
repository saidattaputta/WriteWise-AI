# Software Requirements Specification (SRS)

# WriteWise AI

Version: 1.0

Status: Draft

---

# 1. Introduction

## Purpose

WriteWise AI is an intelligent writing platform that enables users to generate, rewrite, edit, manage, and export professional documents using Large Language Models (LLMs).

The system aims to simplify professional writing through AI-powered assistance.

---

# 2. Scope

The application provides:

- AI document generation
- AI rewriting
- Rich text editing
- User authentication
- Document management
- Export functionality
- Cloud storage

---

# 3. User Roles

## Guest

Can:

- View landing page
- Register
- Login

---

## Authenticated User

Can:

- Generate documents
- Rewrite text
- Edit documents
- Save drafts
- Delete documents
- Export documents
- Manage profile

---

# 4. Functional Requirements

## Authentication

The system shall:

- Allow user registration
- Allow secure login
- Support Google authentication
- Issue JWT tokens
- Protect private routes

---

## AI Writing

The system shall:

- Generate documents
- Rewrite documents
- Expand content
- Shorten content
- Correct grammar
- Change writing tone

---

## Document Management

The system shall:

- Save drafts
- Update documents
- Delete documents
- Search documents
- Mark favourites
- Display recent documents

---

## Export

The system shall export documents as:

- PDF
- DOCX
- HTML
- TXT

---

## User Profile

The system shall allow users to:

- Update profile
- Change password
- Manage settings

---

# 5. Non-Functional Requirements

## Performance

- Fast API response
- Responsive UI
- Efficient database queries

---

## Security

- JWT Authentication
- Password hashing
- HTTPS support
- Input validation

---

## Scalability

- Modular backend
- Stateless APIs
- Cloud deployment

---

## Reliability

- Error handling
- Logging
- Health checks

---

# 6. System Constraints

- Internet connection required
- LLM API dependency
- Cloud storage dependency

---

# 7. Assumptions

- Users have modern web browsers.
- AI service is available.
- Cloud services are operational.

---

# 8. Acceptance Criteria

The application is accepted when:

- Users can register.
- Users can log in.
- Users can generate documents.
- Users can edit documents.
- Users can save documents.
- Users can export documents.
- The application is deployed successfully.

---

# End of Document