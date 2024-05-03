FROM node:20.12.2-bullseye-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app

COPY prisma ./
RUN --mount=type=cache,id=pnpm-prisma,target=/pnpm/store corepack enable pnpm \
  && pnpm install prisma
RUN pnpm prisma migrate diff --from-empty --to-schema-datamodel schema.prisma --script > migration.sql

# Use the same PostgreSQL version as Supabase
FROM postgres:15.1-bullseye

COPY --from=base /app/migration.sql /docker-entrypoint-initdb.d/init-0-migration.sql
COPY --from=base /app/init-1-gtdfest.sql /docker-entrypoint-initdb.d/init-1.sql
COPY --from=base /app/init-2-merch.sql /docker-entrypoint-initdb.d/init-2.sql

USER postgres
