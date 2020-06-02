# O que é este projeto

Este projeto é um trabalho de faculdade.
Ele levanta um servidor RESTful para atender um aplicativo de questionário Mobile.

## Pré-requisitos

1. [Node.js](https://nodejs.org/en/)
2. [Yarn](https://yarnpkg.com/)
3. [MySQL](https://www.mysql.com/)
4. [TypeScript](https://www.typescriptlang.org/)

## Como executar este projeto

1. Clone o projeto em um diretório qualquer
2. Renomeie o arquivo [.env.sample] para .env
3. Configure os parâmetros da aplicação no arquivo .env
4. Crie a base de dados vazia na sua instância do MySQL
5. Execute a migração da base de dados: `yarn run schema:drop && yarn run schema:sync`
6. Execute o seeding para inserir dados iniciais na base: `yarn run seed:config && yarn run seed:run`
7. Execute o servidor: `yarn start`
8. Faça requisições!

## Endpoints prontos até o momento

1. `GET /users`
2. `GET /users/:userName`
3. `POST /users`
4. `GET /forms`
5. `GET /forms/:id`
6. `POST /forms`
7. `GET /questions`
8. `GET /questions/:id`
9. `POST /questions`
