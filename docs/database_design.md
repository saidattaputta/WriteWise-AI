# Database Design

# WriteWise AI

Version: 1.0

Status: Draft

---

# Overview

WriteWise AI uses PostgreSQL as its primary relational database.

The database stores user information, generated documents, templates, settings, prompt history, and document metadata.

---

# Database Tables

## Users

Stores registered user information.

Fields:

- id (UUID, Primary Key)
- full_name
- email
- password_hash
- profile_picture
- provider
- created_at
- updated_at

---

## Documents

Stores AI-generated and user-created documents.

Fields:

- id (UUID, Primary Key)
- user_id (Foreign Key → Users)
- title
- content
- document_type
- status
- created_at
- updated_at

---

## Drafts

Stores unfinished documents.

Fields:

- id (UUID, Primary Key)
- user_id (Foreign Key → Users)
- document_id (Foreign Key → Documents)
- content
- last_saved_at

---

## Templates

Stores writing templates.

Fields:

- id (UUID, Primary Key)
- category
- title
- description
- prompt_template
- created_at

---

## Prompt History

Stores AI prompt requests.

Fields:

- id (UUID, Primary Key)
- user_id (Foreign Key → Users)
- prompt
- response
- created_at

---

## User Settings

Stores user preferences.

Fields:

- id (UUID, Primary Key)
- user_id (Foreign Key → Users)
- theme
- default_tone
- preferred_export_format
- updated_at

---

# Relationships

Users

↓

Documents

↓

Drafts

Users

↓

Prompt History

Users

↓

User Settings

Templates are shared across all users.

---

# Entity Relationship Summary

Users

- One user can own many documents.
- One user can have many prompt history records.
- One user has one settings record.

Documents

- One document belongs to one user.
- One document can have one draft.

Drafts

- One draft belongs to one document.

Templates

- Available to all users.

---

# Indexing Strategy

Indexes should be created on:

- Users.email
- Documents.user_id
- Documents.created_at
- PromptHistory.user_id
- Drafts.user_id

---

# Data Integrity

- Primary Keys use UUID.
- Foreign Keys enforce relationships.
- Email must be unique.
- Required fields cannot be NULL.
- Cascade delete user-owned records when appropriate.

---

# Future Expansion

Potential future tables:

- Teams
- Shared Documents
- Comments
- Notifications
- AI Usage Analytics
- Version History

---

# End of Document