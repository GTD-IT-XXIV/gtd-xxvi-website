# Deployment

## Development

1. Add development environment variables to `.env.development.local` in project root directory.
2. Start development build:

```bash
pnpm dev:build:start
```

3. Stop development build:

```bash
pnpm dev:build:stop
```

## Production

1. Add production environment variables to `.env.production.local` in project root directory.
2. Check whether production database schema is up to date with project schema:

```bash
pnpm dotenv -c production -- prisma migrate status
```

3. If database schema is not up to date, apply migrations:

```bash
pnpm dotenv -c production -- prisma migrate deploy
```

### Using the Docker Hub Repository

1. Pull Docker image:

```bash
docker pull devpintugtd/gtd-xxvi-website:latest
```

2. Start the Docker container (defaults to port 3000):

```bash
docker run --name gtd-xxvi-website -p 3000:3000 --mount type=bind,source="$(pwd)"/.env.production.local,target=/app/.env.production.local -d --rm devpintugtd/gtd-xxvi-website:latest
```

### Building Locally

1. Build the Docker image:

```bash
pnpm build:docker
```

2. Start the Docker container (defaults to port 3000):

```bash
pnpm start:docker
```
