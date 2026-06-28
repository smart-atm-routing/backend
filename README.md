# Inbox Sales Copilot — Backend

NestJS (Fastify) backend for the Inbox Sales Copilot. Modular monolith backed by
PostgreSQL + pgvector and Redis/BullMQ (per the C4 architecture).

> Foundation + data layer + tooling — roadmap steps 1–14 complete. Domain
> modules (auth, email, agent, rag, llm-gateway, activity, crm) come next.

## Stack

- **Runtime:** Node.js 22 (`.nvmrc`), pnpm
- **Framework:** NestJS 11 on Fastify
- **ORM:** Prisma 6 (PostgreSQL + pgvector)
- **Cache:** `@nestjs/cache-manager` + Keyv (Redis)
- **Queues:** BullMQ + Bull Board dashboard
- **Logging:** nestjs-pino (JSON in prod, pretty in dev)
- **Security:** helmet, CORS, cookies, CSRF, strict global validation, Redis rate limiting
- **API tooling:** Swagger (OpenAPI) + Orval client codegen
- **Infra (local):** Docker Compose — Postgres (pgvector) + Redis

## Prerequisites

- Node 22 (`nvm install 22 && nvm use 22`)
- pnpm (`corepack enable`)
- Docker + Docker Compose

## Setup

```bash
nvm use 22
pnpm install
cp .env.example .env        # then edit secrets

# Start Postgres (pgvector) + Redis
docker compose up -d postgres redis

# Sync the Prisma schema (enables the pgvector extension)
pnpm exec prisma db push
```

## Run

```bash
pnpm start:dev      # watch mode
pnpm start          # one-off
```

## Endpoints

| Route                      | Purpose                          |
| -------------------------- | -------------------------------- |
| `GET /health`              | Liveness → `200 {"status":"ok"}` |
| `GET /docs`                | Swagger UI                       |
| `GET /docs-json`           | OpenAPI spec                     |
| `GET /admin/queues`        | Bull Board queue dashboard       |
| `POST /queue/demo/enqueue` | Enqueue a demo job (example)     |

## Scripts

| Command                    | Purpose                                                 |
| -------------------------- | ------------------------------------------------------- |
| `pnpm build`               | Compile to `dist/`                                      |
| `pnpm start:dev`           | Run with watch                                          |
| `pnpm lint`                | ESLint (autofix)                                        |
| `pnpm format`              | Prettier                                                |
| `pnpm test`                | Unit tests                                              |
| `pnpm test:e2e`            | E2E tests (needs Redis up)                              |
| `pnpm exec prisma db push` | Sync schema to DB                                       |
| `pnpm openapi:gen`         | Emit `openapi.json` (needs Postgres + Redis up)         |
| `pnpm api:gen`             | Generate the typed API client (Orval) into `generated/` |

## Docker

```bash
docker compose up --build      # full stack incl. the backend image
```

Host port map: Postgres is published on **5433** (container 5432) to avoid
clashing with a local Postgres.

## Conventions

Commits and branches follow [`.github/CommitConvention.md`](.github/CommitConvention.md)
and [`.github/BranchNamingConvention.md`](.github/BranchNamingConvention.md), enforced
locally by husky + commitlint + lint-staged.
