# TT Challenge - Task Manager

A simple task manager built with **Next.js 16**, **React 19**, and **TypeScript**.

## Overview

This project demonstrates a full-stack task management app using Next.js API Route Handlers as the backend and a React client component as the frontend. All data is stored in-memory.

## API Endpoints

| Method | Endpoint          | Description          | Status Codes |
|--------|-------------------|----------------------|--------------|
| GET    | `/api/tasks`      | List all tasks       | 200          |
| POST   | `/api/tasks`      | Create a new task    | 201, 400     |
| PATCH  | `/api/tasks/:id`  | Toggle task complete | 200, 404     |

All error responses follow the shape `{ error: { message: string } }`.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
