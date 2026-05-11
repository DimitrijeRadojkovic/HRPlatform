# HRPlatform - Candidate Management System

This project is a .NET 8 Web API for managing job candidates and their skills. It supports basic CRUD operations, searching candidates by name or skills, and uses a relational database with EF Core.

---

## How to run the project

### 1. Clone the repository

```bash
git clone <repo-url>
cd HRPlatform
```

---

### 2. Start database (Docker)
Make sure Docker is running, then start the database:

```bash
docker compose up -d
```

---

### 3. Apply database migrations
Run EF Core migrations to create and seed the database:

```bash
dotnet ef database update
```

---

### 4. Run backend API
Navigate to backend project and start the API:

```bash
cd backend/HRPlatform
dotnet run --launch-profile https
```

API will be available at:
https://localhost:7049

---

### 5. Run frontend
Navigate to frontend project and start:

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at:
http://localhost:5173

---

## Environment variables

Create a .env file in the frontend root:

```bash
VITE_API_URL="https://localhost:7049/api"
```

---

## Project Features

- Add, update, delete job candidates
- Add and remove skills from candidates
- Search candidates by name and/or skills
- Many-to-many relationship between candidates and skills
- EF Core migrations with seed data
- PostgreSQL database running in Docker

---

## Most interesting part of the task

The most interesting part of the task was implementing the many-to-many relationship between candidates and skills.

Instead of storing skills as a simple list, a junction entity (CandidateSkill) was used to properly model the relationship in a relational database. This required careful configuration in EF Core using composite keys and fluent API relationships.

This approach was chosen to ensure scalability and data normalization, making it easier to extend the system in the future.

---

## Technologies used

- .NET 8 Web API
- Entity Framework Core
- PostgreSQL (Docker)
- Vite
---

## Notes

- Make sure Docker is running before starting the application
- Run migrations before starting the API
- Seed data is applied automatically via EF Core migrations
