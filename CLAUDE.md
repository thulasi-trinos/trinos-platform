# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Trinos is a status report management platform. Employees submit structured daily reports (what I did, what's next, blockers). Team leads and MDs review them. Admins manage users, teams, and config. The platform handles report routing, notifications, blocker escalation, and team/direct messaging.

## Commands

```bash
# First-time setup
nvm use                    # Node 20.11.0 (see .nvmrc)
npm install
docker compose up -d       # Postgres :5432 + Redis :6379

# Daily dev
npm run dev                # All workspaces concurrently
npm run typecheck          # All workspaces
npm run lint               # All workspaces

# Build (must run in this order — api/web depend on shared)
npm -w @trinos/shared run build
npm run build              # builds shared → api → web

# Database (runs against apps/api)
npm run db:migrate         # prisma migrate dev
npm run db:seed

# Workspace-scoped dev
npm -w @trinos/api run dev
npm -w @trinos/web run dev
```

No test framework is configured yet.

## Architecture

### Monorepo layout

npm workspaces — three packages: `@trinos/api` (Express), `@trinos/web` (Next.js), `@trinos/shared` (domain layer). No Turborepo.

### `@trinos/shared` is the domain source of truth

All TypeScript interfaces, Zod validation schemas, RBAC rules, status constants, and event names live in `packages/shared/src/` and are exported from a single barrel. **Never define domain types or validation in apps** — import from `@trinos/shared` instead.

- `types/` — entity interfaces (`User`, `Team`, `Report`, `Message`, `Notification`, `AuditLog`, etc.)
- `constants/` — RBAC matrix, status labels with Tailwind hex colors, report field rules, event name strings
- `schemas/` — Zod schemas for every mutation (auth, report, message, admin ops)

### RBAC

Roles: `EMPLOYEE`, `TEAM_LEAD`, `MD`, `ADMIN`. Capabilities are checked with `hasCapability(role, capability)` from `@trinos/shared`. The full matrix is in `packages/shared/src/constants/roles.ts`. Enforce this server-side in the API — never trust role from the client.

### Event-driven conventions

Events follow the `entity.action` pattern (e.g. `report.submitted`, `blocker.escalated`). All event name constants are in `@trinos/shared/constants/events`. The escalation path for blockers is: employee → team lead → MD → super admin.

### TypeScript config

`tsconfig.base.json` is the root — all workspaces extend it. Strict mode is on. `apps/api` compiles to CommonJS in `dist/`. `apps/web` uses bundler resolution with no emit (Next.js handles compilation). The `@trinos/shared` path alias is pre-configured in the base config.

## Local Services

| Service | Port | Credentials |
|---|---|---|
| PostgreSQL 17 | 5432 | user `trinos` / pass `trinos_dev` / db `trinos_dev` |
| Redis 7 | 6379 | no auth |

## Code Style

- Prettier: single quotes, 100-char line width, 2-space indent
- ESLint: import order enforced — builtin → external → internal → sibling → index
- Unused vars must be prefixed with `_`
