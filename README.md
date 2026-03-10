# Task Manager - MERN Stack

A simple Task Management application built with MongoDB, Express, React, and Node.js (TypeScript).

## Tech Stack

**Backend:** Node.js, Express, MongoDB, Mongoose, Zod, TypeScript

**Frontend:** React, TypeScript, Tailwind CSS, shadcn/ui, Zod, Axios

## Installation

### Prerequisites

- Node.js (v18+)
- MongoDB running locally or a MongoDB Atlas URI

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```
VITE_BACKEND_URI=http://localhost:5000
```

## Running the Application

### Start Backend

```bash
cd backend
npm run dev
```

Server will run on `http://localhost:5000`

### Start Frontend

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

## API Endpoints

| Method   | Endpoint          | Description          |
| -------- | ----------------- | -------------------- |
| `POST`   | `/api/tasks`      | Create a new task    |
| `GET`    | `/api/tasks`      | Get all tasks        |
| `PATCH`  | `/api/tasks/:id`  | Update task status   |
| `DELETE` | `/api/tasks/:id`  | Delete a task        |

### Query Parameters (GET /api/tasks)

- `page` - Page number (default: 1)
- `limit` - Tasks per page (default: 10)
- `status` - Filter by status (todo, in-progress, done)
