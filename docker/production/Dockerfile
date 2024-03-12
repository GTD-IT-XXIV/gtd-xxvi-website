FROM node:20-bullseye AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

ENV HUSKY=0

COPY package.json pnpm-lock.yaml prisma ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store corepack enable pnpm \
  && pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN rm -rfv .env .env*.local 
COPY .env.production .env.production

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

ENV SKIP_ENV_VALIDATION=TRUE
RUN corepack enable pnpm && pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

# Set the correct permission for prerender cache
RUN mkdir .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/publi[c] ./public
COPY --from=builder /app/.env* ./

# Copy sharp optionalDependencies due to @vercel/nft bug: https://github.com/lovell/sharp/issues/3967
# For linux/arm64 platform
COPY --from=deps /app/node_modules/.pnpm/@img+sharp-libvips-linux-arm64@1.0.[1] ./node_modules/.pnpm/@img+sharp-libvips-linux-arm64@1.0.1
COPY --from=deps /app/node_modules/.pnpm/@img+sharp-libvips-linuxmusl-arm64@1.0.[1] ./node_modules/.pnpm/@img+sharp-libvips-linuxmusl-arm64@1.0.1
COPY --from=deps /app/node_modules/.pnpm/@img+sharp-linux-arm64@0.33.[2] ./node_modules/.pnpm/@img+sharp-linux-arm64@0.33.2
COPY --from=deps /app/node_modules/.pnpm/@img+sharp-linuxmusl-arm64@0.33.[2] ./node_modules/.pnpm/@img+sharp-linuxmusl-arm64@0.33.2
# For linux/amd64 platform
COPY --from=deps /app/node_modules/.pnpm/@img+sharp-libvips-linux-x64@1.0.[1] ./node_modules/.pnpm/@img+sharp-libvips-linux-x64@1.0.1
COPY --from=deps /app/node_modules/.pnpm/@img+sharp-libvips-linuxmusl-x64@1.0.[1] ./node_modules/.pnpm/@img+sharp-libvips-linuxmusl-x64@1.0.1
COPY --from=deps /app/node_modules/.pnpm/@img+sharp-linux-x64@0.33.[2] ./node_modules/.pnpm/@img+sharp-linux-x64@0.33.2
COPY --from=deps /app/node_modules/.pnpm/@img+sharp-linuxmusl-x64@0.33.[2] ./node_modules/.pnpm/@img+sharp-linuxmusl-x64@0.33.2

FROM gcr.io/distroless/nodejs20-debian11
COPY --from=runner --chown=nonroot:nonroot /app /app
WORKDIR /app

USER nonroot

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD [ "server.js" ]

