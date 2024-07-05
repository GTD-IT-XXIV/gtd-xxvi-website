FROM node:20.15.0-bullseye AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

ENV HUSKY=0

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
  --mount=type=bind,source=prisma,target=prisma \
  corepack enable pnpm && pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Use development environment variables as production for this development build
# CAUTION: environment variables are included inside the final Docker image
RUN rm -rfv .env .env*.local 
COPY .env.developmen[t] .env.production
COPY .env.development.loca[l] .env.production.local

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN --mount=type=cache,id=next,target=.next/cache \
  corepack enable pnpm && pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

RUN mkdir .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/.next/standalone /app/.env* ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/publi[c] ./public

FROM gcr.io/distroless/nodejs20-debian11
WORKDIR /app

COPY --from=runner --chown=nonroot:nonroot /app ./

USER nonroot

EXPOSE 3000

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD [ "server.js" ]

