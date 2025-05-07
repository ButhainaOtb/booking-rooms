
# 🏨 Booking Rooms API – NestJS + Postgres + Docker

This is a **Room Booking Backend API** built with:

- ✅ [NestJS](https://nestjs.com/) – Scalable TypeScript framework  
- ✅ [TypeORM](https://typeorm.io/) – ORM for PostgreSQL  
- ✅ 🐳 Docker & Docker Compose  
- ✅ 🛡️ JWT Authentication & Role-Based Authorization  
- ✅ 🧪 E2E Test Coverage via Jest + Supertest  
- ✅ 🕐 Cron Job to Auto-Release Expired Bookings

---

## 📦 Project Structure

```
src/
├── auth/        # Login & JWT strategy
├── users/       # User registration & role management
├── rooms/       # Room CRUD operations
├── booking/     # Booking functionality with time slots
├── commons/     # Shared decorators, enums, guards

test/
├── *.e2e-spec.ts # Full E2E test coverage by domain
```
---

## 🚀 Getting Started

### 🔧 Requirements

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- Node.js v18+ (for local development)

### 🐳 Running the App with Docker

1. Clone and Build the Project:

```bash
git clone https://github.com/your-username/booking-api.git
cd booking-api
docker compose up --build
```

2. The app will start at:  
📍 [http://localhost:3000](http://localhost:3000)

Docker Compose automatically uses your `.env` file for configuration. Make sure it exists at the project root.

---

## 🗃️ DB Info

### Database Credentials:

| Key       | Value     |
|-----------|-----------|
| Host      | `db`      |
| User      | `postgres`|
| Password  | `postgres`|
| Database  | `booking` |

You can manage the database via [pgAdmin](http://localhost:5052).

---

## 📮 API Endpoints

| Method | Endpoint           | Auth? | Description                     |
|--------|--------------------|-------|---------------------------------|
| POST   | `/users/register`  | ❌    | Register a new user             |
| POST   | `/auth`            | ❌    | Login and receive JWT           |
| GET    | `/rooms`           | ✅    | List all available rooms        |
| POST   | `/rooms`           | ✅🛡️   | Create a room (admin only)      |
| POST   | `/booking/:roomId` | ✅    | Book a room for a time slot     |
| GET    | `/booking/me`      | ✅    | View your own bookings          |

Authentication is done via **JWT** (Bearer token).

---

## 🧪 Running Tests (E2E)

All tests are **end-to-end** and run inside Docker with the real database.

### 📦 To run tests:

```bash
docker compose run --rm api yarn test:e2e
```

This command:
- Starts a new API container
- Connects to the same database container
- Runs all E2E test suites from the `test/` folder

---

### ✅ Test Suites Included:
- `users.e2e-spec.ts` – User registration  
- `auth.e2e-spec.ts` – Login and JWT  
- `rooms.e2e-spec.ts` – Listing + admin-only room creation  
- `booking.e2e-spec.ts` – Booking a room, viewing your bookings

---

## 🕐 Background Jobs

A cron job runs every minute to:
- Delete expired bookings
- Reset the associated room’s `isBooked` flag

This is powered by [`@nestjs/schedule`](https://docs.nestjs.com/techniques/task-scheduling).

---

## 📦 Environment Variables

You can configure the project via a `.env` file in the root. It’s loaded automatically using `@nestjs/config`.

### Example `.env`:

```env

DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=booking
JWT_SECRET=super-secret-key
JWT_EXPIRES_IN=1h


```

