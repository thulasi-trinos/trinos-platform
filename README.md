# Trinos Status Report Platform

A full-stack TypeScript monorepo for managing and distributing status reports.

## Workspaces

| Workspace | Description |
|---|---|
| `apps/web` | Next.js frontend |
| `apps/api` | Express backend |
| `packages/shared` | Shared types, Zod schemas, constants |

## Prerequisites

- Node.js 20.11.0 (use `.nvmrc` via `nvm use`)
- npm ≥ 10
- Docker & Docker Compose (for local Postgres + Redis)

## Setup

```bash
# 1. Use the correct Node version
nvm use

# 2. Install all dependencies
npm install

# 3. Start local services (Postgres on :5432, Redis on :6379)
docker compose up -d

# 4. Copy environment files
cp apps/api/.env.example apps/api/.env

# 5. Run database migrations
npm run db:migrate

# 6. Seed the database
npm run db:seed
```

## Development

```bash
# Run all workspaces in watch mode
npm run dev

# Typecheck all workspaces
npm run typecheck

# Lint all workspaces
npm run lint
```

## Build

```bash
# Build in dependency order: shared → api, web
npm run build
```

## Database

```bash
# Run migrations
npm run db:migrate

# Seed database
npm run db:seed
```

## Local Services

| Service | Port | Credentials |
|---|---|---|
| Postgres | 5432 | user: `trinos` / pass: `trinos_dev` / db: `trinos_dev` |
| Redis | 6379 | no auth |

Stop services: `docker compose down`  
Wipe volumes: `docker compose down -v`
