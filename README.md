# NCH Backend
This repository hosts the backend codebase of NCH platform.

## Getting Started

Setup required envrionment variables from `.env.example` file.

1. Install dependencies:
   ```sh
   pnpm install
   ```
2. Set up the database:
   ```sh
   pnpm latest
   ```
3. Start the development server:
   ```sh
   pnpm dev
   ```

API docs can be accessed from the following route:
> Note: Host and port are subject to change based on your environment and `.env` configuration.
```sh
http://localhost:3001/docs
```




## Dependencies Overview

### Essential Dependencies

- **hono**: A fast and lightweight web framework for building APIs and web applications in TypeScript.
- **@hono/node-server**: A server adapter for running Hono applications in a Node.js environment.
- **@hono/zod-openapi**: Provides schema validation and OpenAPI documentation support using Zod in Hono applications.
- **kysely**: A TypeScript SQL query builder that provides a type-safe way to interact with databases.
- **pg**: PostgreSQL client for Node.js, used to connect and interact with PostgreSQL databases.
- **pino**: A fast, low-overhead logging library for Node.js applications.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **http-status-codes**: A utility for using standardized HTTP status codes in applications.

## Important Dev Dependencies

- **tsx**: A fast TypeScript runtime for Node.js, used to execute TypeScript files without a build step.
- **kysely-codegen**: Generates TypeScript types from a database schema for use with Kysely.
- **kysely-ctl**: A CLI tool for managing database migrations and schema generation with Kysely.
- **lefthook**: A Git hooks manager for automating tasks like linting and formatting.
- **@types/node**: TypeScript type definitions for Node.js.


## Project Scripts

This project uses various scripts to manage development, database migrations, and code formatting.

### Development

- **`dev`**  
  Starts the development server in watch mode. Automatically reloads when changes are detected.  
  ```sh
  pnpm dev
  ```

### Database Migrations (Kysely)

- **`kysely`**  
  Runs the Kysely CLI.  
  ```sh
  pnpm kysely
  ```

- **`gen`**  
  Generates TypeScript types for the database schema.  
  ```sh
  pnpm gen
  ```

- **`create`**  
  Creates a new database migration file. You will be prompted to enter a migration name.  
  ```sh
  pnpm create
  ```

- **`latest`**  
  Applies all pending migrations to update the database to the latest schema.  
  ```sh
  pnpm latest
  ```

- **`up`**  
  Runs the next pending migration.  
  ```sh
  pnpm up
  ```

- **`down`**  
  Rolls back the last applied migration.  
  ```sh
  pnpm down
  ```

### Formatting

- **`format`**  
  Formats the code in the `src` directory using Biome.  
  ```sh
  pnpm format
  ```