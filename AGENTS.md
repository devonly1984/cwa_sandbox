<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Database Workflow

- This project is in active development. Do not run `drizzle-kit migrate` or `npm run db:migrate`.
- Use `npm run db:push` to sync `lib/db/schema.ts` with the configured Neon development database.
- Review Drizzle's proposed changes before confirming any operation that drops or alters existing data.
