# iu-nuxt-task-management

This is the source code of the Nuxt.js implementation for the task management case application for my bachelor's thesis "Low-Code vs. Traditional Development: A Task Management Application Case Study with Insights into AI-Assisted Coding" at the IU Internationale Hochschule.

## Local Development

The following instructions help set up the project on a local machine for development. This allows for properly testing schema migration scripts and the application itself before deploying it to the hosted environment.

### Setup

Requirements:

-   `Git`
-   `Node.js`
-   `Docker Desktop`

Cloning this Repository:

```bash
git clone https://github.com/NicklasRatay/iu-quiz-app.git
```

Installing Dependencies:

```bash
npm install
```

### Environment Variables

Set up a `.env` file in the root directory of the project with the following environment variables. They are displayed in the terminal after running `npx supabase start`.

-   `SUPABASE_URL`: The API URL of the Supabase project.
-   `SUPABASE_KEY`: The anon API key of the Supabase project.
-   `SUPABASE_SERVICE_KEY`: The service API key of the Supabase project.
-   `SUPABASE_DB_URL`: The URL of the Supabase project's database.

### General

Running Linting:

```bash
npm run lint
```

Running Linting with Fix:

```bash
npm run lint-fix
```

### Backend

Starting Supabase PostgreSQL Container:

```bash
npx supabase start
```

Rebuild Database from Migrations:

```bash
npx supabase db reset
```

Stopping Supabase PostgreSQL Container:

```bash
npx supabase stop
```

Testing the Database:

```bash
npm run test-db
```

Creating a Migration:

```bash
npx supabase migration new <migration-name>
```

Generating Types from Database Schema:

```bash
npm run db-types
```

Generating Seed SQL from seed.ts:

```bash
npm run seed
```

### Frontend

Starting the App in Development Mode:

```bash
npm run dev
```

Testing the App:

```bash
npm run test-app
```

Testing the App with Coverage Report:

```bash
npm run test-app-coverage
```
