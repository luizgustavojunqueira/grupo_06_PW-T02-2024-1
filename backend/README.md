# Backend

## Development server

To start the development server, run:

```bash
    docker compose up --build
```

The server will be available at `http://localhost:3001`.

To run without the logs, run:

```bash
    docker compose up --build -d
```

Then migrate the database schemas with the following commands:

```bash
    docker compose exec backend_progweb.dev sh
    npx prisma migrate dev
```

To stop the server, run:

```bash
    docker compose down
```
