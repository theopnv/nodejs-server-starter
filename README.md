# nodejs-server-starter

This is the starter I use to build the servers I need for my side projects. Read more about how it works at http://tiny.cc/nodejs-server-starter.

![Blog post front cover](https://miro.medium.com/max/1500/1*i2v2TNtvoB_uq18W4IVLGA.png)

Features:

- A Koa.js server (Node JS)
- A MongoDB Database, access with mongo-express
- A GraphQL API
- Mocha/Chai integration tests
- GraphQL Code Generator
- Typescript
- Everything is containerized (docker-compose)
- Uses ESLint, Nodemon and git hooks for efficient development workflows.

## TL;DR - How to build my back-end on top of this starter?

1. Clone the repo.
2. Run `npm install`.
3. Duplicate `sample.env`, rename it `.env` and edit it with your secrete variables.
4. Start the database and mongo-express containers by running `docker-compose up -d database mongo-express`.
5. Start the server by running `npm run start`.
6. Start coding! Extend the server with the features you need for your application.

## Issues & Contributing

Contributions to fix/improve this starter are welcome. Note that the goal is to keep it generic so that it can be used for any kind of server.

Open a Pull Request.
