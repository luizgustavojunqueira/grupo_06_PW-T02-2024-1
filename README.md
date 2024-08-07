# ProgWeb-Calendario

Esse repositório contém os artefatos desenvolvidos como um projeto avaliativo para a disciplina de Programação para Web durante o curso de Ciência da Computação na UFMS.

## Descrição do Tema

Neste projeto, estamos buscando um desenvolvedor web altamente competente
para criar um aplicativo Web de calendário que permita aos usuários organizar suas
vidas diárias de maneira eficiente. O objetivo é oferecer uma ferramenta prática e
personalizável para agendar eventos e definir lembretes importantes, a fim de
melhorar a produtividade e o planejamento pessoal.
Como desenvolvedor, objetivo deste projeto é criar uma aplicação Web moderna e
envolvente que ofereça uma experiência agradável aos usuários.

## Objetivo

Este projeto visa criar uma aplicação Web de um calendário moderno, intuitivo e
altamente funcional. O aplicativo terá como objetivo principal permitir aos usuários
gerenciar suas atividades, eventos, compromissos e tarefas de forma eficiente e
organizada.
O desenvolvimento da aplicação de calendário oferece uma oportunidade para
aprimorar suas habilidades de programação web, trabalhar com bancos de dados,
criar uma interface de usuário atraente, testar os conceitos vistos em sala e as
habilidades de codificação dos desenvolvedores. (HTML, CSS, JavaScript, Python,
PHP, etc...).

## Funcionalidades Desenvolvidas

- Cadastro e Autenticação de Usuários
- Calendário Interativo (visualização de meses, semanas e dias)
- Adição de eventos (incluem título, descrição, data, horários, localizção e opções de recorrência)
- Edição de eventos
- Remoção de eventos

## Tecnologias Utilizadas

Para o desenvolvimento da API, utilizamos NodeJS com Express, armazenando as informações num banco de dados Postgres.
Para o desenvolvimento do Front-End, utilizamos ReactJS.

### Ambiente de Desenvolvimento

#### Requisitos

- Docker

#### Como iniciar

A seguir são descritos os comandos utilizados para inicializar o sistema.

Para iniciar a API (os 3 últimos comandos são necessários apenas na primeira vez): 

```shell
    cd grupo_06_PW-T02-2024-1
    docker compose up --build -d
    docker exec -it backend_progweb sh
    npx prisma migrate dev
    exit
```

Para iniciar o front-end:

```shell
    cd frontend/calendar/
    npm install
    npm run dev
```
