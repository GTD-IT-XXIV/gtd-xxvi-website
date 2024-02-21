# Deployment

## Production

1. Add production environment variables to `.env.production.local` in project root directory.
2. Pull Docker image:

```bash
docker pull devpintugtd/gtd-xxvi-website:latest
```

3. Start the Docker container:

```bash
docker run --name gtd-xxvi-website -p 3000:3000 --mount type=bind,source="$(pwd)"/.env.production.local,target=/app/.env.production.local -d --rm devpintugtd/gtd-xxvi-website:latest
```

## Development

```bash
# To start
pnpm dev:build:start
# To stop
pnpm dev:build:stop
```
