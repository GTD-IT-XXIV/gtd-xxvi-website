FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY prisma ./
RUN --mount=type=cache,id=pnpm-prisma,target=/pnpm/store pnpm install prisma
RUN pnpm prisma migrate diff --from-empty --to-schema-datamodel schema.prisma --script > migration.sql

FROM postgres:15.1
COPY --from=base /app/migration.sql /docker-entrypoint-initdb.d/init-0-migration.sql
COPY --from=base /app/init-1-gtdfest.sql /docker-entrypoint-initdb.d/init-1.sql
COPY --from=base /app/init-2-merch.sql /docker-entrypoint-initdb.d/init-2.sql
