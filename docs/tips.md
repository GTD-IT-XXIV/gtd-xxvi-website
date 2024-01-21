# Tips

## Access the Dashboard

1. Sign up for a user at `/dashboard/signup`.
2. Open [Prisma Studio](https://www.prisma.io/studio):

```bash
pnpm dev:db:studio
```

3. Open the User Model:
![Prisma Studio UI](assets/Screenshot%202024-01-19%20at%2000.42.28.png)

4. Change the user's role to `ADMIN`:
![Prisma Studio UI](assets/Screenshot%202024-01-19%20at%2000.45.53.png)

5. Save changes in Prisma Studio.
6. Log in as the user at `/dashboard/login`. You should be able to access the dashboard now.

## See Example Code

Checkout the v0.1.0 tag:

```bash
git checkout v0.1.0
```

