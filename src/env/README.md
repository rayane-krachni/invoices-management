# Environment Variables

Type-safe environment variable configuration using T3 Env.

## Structure

- `client.ts` - Client-side environment variables (exposed to browser)
- `server.ts` - Server-side environment variables (never exposed to browser)

## Usage

### Client-side (React components, browser code)

```typescript
import { clientEnv } from "@/env/client";

// Access validated environment variables
const appUrl = clientEnv.VITE_APP_URL;
const appName = clientEnv.VITE_APP_NAME;
```

### Server-side (API routes, server functions)

```typescript
import { serverEnv } from "@/env/server";

// Access validated environment variables
const dbUrl = serverEnv.DATABASE_URL;
const authSecret = serverEnv.BETTER_AUTH_SECRET;
```

## Adding New Variables

### Client Variables

1. Add to `client.ts` schema with `VITE_` prefix
2. Add to `.env.example`
3. Add to your local `.env` file

```typescript
// src/env/client.ts
client: {
  VITE_MY_VAR: z.string().describe("My variable"),
}
```

### Server Variables

1. Add to `server.ts` schema
2. Add to `.env.example`
3. Add to your local `.env` file

```typescript
// src/env/server.ts
server: {
  MY_SECRET: z.string().describe("My secret variable"),
}
```

## Rules

- ✅ Client variables MUST be prefixed with `VITE_`
- ❌ NEVER put secrets in client variables
- ✅ Always use Zod schemas for validation
- ✅ Import from specific files (`@/env/client` or `@/env/server`)
- ❌ Never import server env in client code
