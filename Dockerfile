# syntax=docker/dockerfile:1

# ----- Base: Node 22 + pnpm via corepack -----
FROM node:22-alpine AS base
ENV PNPM_HOME=/pnpm
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

# ----- Dependencies (full set, used to build) -----
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# ----- Build: generate Prisma client, compile, drop dev deps -----
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm exec prisma generate
RUN pnpm build
# Remove dev deps; prod deps (incl. the generated @prisma/client) are kept.
RUN pnpm prune --prod --ignore-scripts

# ----- Runtime: minimal production image -----
FROM node:22-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json ./package.json
EXPOSE 3000
USER node
CMD ["node", "dist/main.js"]
