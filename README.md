# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## ENV

```text
PUBLIC_SUPABASE_ANON_KEY=""
PUBLIC_SUPABASE_URL="http://localhost:54321"
SUPABASE_DB_URL="postgresql://postgres:postgres@localhost:54322/postgres"
GRAPHQL_URL="http://localhost:54321/graphql/v1"
INBUCKET_URL="http://localhost:54324"
JWT_SECRET="super-secret-jwt-token-with-at-least-32-characters-long"
SUPABASE_SERVICE_ROLE_KEY=""
STUDIO_URL="http://localhost:54323"

STRIPE_SIGNING_SECRET=""
STRIPE_SECRET_KEY=""

PUBLIC_BASE_URL="http://localhost:5173"
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
