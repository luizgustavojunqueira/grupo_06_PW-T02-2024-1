# ProgWeb-Calendario

## Development server

Necessário docker

Comandos para iniciar o backend, as linhas 3 e 4 são necessárias somente na primera vez que executar, para configurar o banco:

```shell
    cd grupo_06_PW-T02-2024-1
    docker compose up --build -d
    docker exec -it backend_progweb sh
    npx prisma migrate dev
    exit
```

Para rodar o frontend

```shell
    cd frontend/calendar/
    npm install
    npm run dev
```
