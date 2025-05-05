# 🏨 Booking Rooms API – NestJS + Postgres + Docker

This is a **room booking backend API** built with:

- ✅ [NestJS](https://nestjs.com/) – scalable TypeScript framework  
- ✅ [TypeORM](https://typeorm.io/) – ORM for PostgreSQL  
- ✅ 🐳 Docker & Docker Compose  
- ✅ 🛡️ JWT authentication & role-based authorization  
- ✅ 🧪 E2E test coverage via Jest + Supertest  
- ✅ 🕐 Cron job to auto-release expired bookings

## 📦 Project Structure

src/
├── auth/ # Login & JWT strategy
├── users/ # User registration & role management
├── rooms/ # Room CRUD
├── booking/ # Bookings (with time slots)
├── commons/ # Shared decorators, enums, guards
test/
├── *.e2e-spec.ts # Full E2E test coverage by domain

## 🚀 Getting Started

### 🔧 Requirements

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- Node.js v18+ (for local dev)


## 🐳 Running the App with Docker

### Step 1: Clone and build

```bash
git clone https://github.com/your-username/booking-api.git
cd booking-api
docker-compose up --build

The app will start at:
📍 http://localhost:3000

Docker Compose automatically uses your .env file for configuration.
Make sure it exists at the project root.


---

### 🗃️ Section 5: DB Info

```md
### DB credentials:

| Key       | Value     |
|-----------|-----------|
| Host      | `db`      |
| User      | `postgres`|
| Password  | `postgres`|
| Database  | `booking` |

You can use `pgAdmin` at [http://localhost:5052](http://localhost:5052)

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
## 🧪 Running Tests (E2E)

> All tests are end-to-end and run inside Docker with the real DB.

### 📦 To run tests:

```bash
docker-compose run --rm api yarn test:e2e

This command:

Starts a new API container

Connects to the same database container

Runs all E2E test suites from test/


---

### ✅ Section 8: Test Suites

```md
### ✅ Test Suites Included:

- `users.e2e-spec.ts` – User registration  
- `auth.e2e-spec.ts` – Login and JWT  
- `rooms.e2e-spec.ts` – Listing + admin-only room creation  
- `booking.e2e-spec.ts` – Booking a room, viewing your bookings

## 🕐 Background Jobs

A cron job runs every minute to:
- Delete expired bookings
- Reset the associated room’s `isBooked` flag

This is powered by [`@nestjs/schedule`](https://docs.nestjs.com/techniques/task-scheduling)


## 📦 Environment Variables

You can configure via a `.env` file in the root. It's loaded automatically using `@nestjs/config`.


---

That’s everything — modular and copy/paste friendly ✅  
Want the `.env.example` sectioned like this too?
