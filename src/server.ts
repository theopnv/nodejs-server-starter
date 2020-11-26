import Koa from "koa";
import KoaRouter from "koa-router";
import { AppDatabaseManager } from "./DatabaseManager";
import ApolloServerManager from "./ApolloServerManager";

async function main() {
  const app = await createApp();
  const port = process.env.SERVER_PORT || 3100;

  app.listen(port);

  // eslint-disable-next-line no-console
  console.log(`Listening on port http://localhost:${port}/`);
}

async function createApp(): Promise<Koa> {
  const app = new Koa();
  const router = new KoaRouter();
  const serverManager = new ApolloServerManager(new AppDatabaseManager(), {
    introspection: !(process.env.NODE_ENV === "production"),
    playground: !(process.env.NODE_ENV === "production"),
  });
  const server = await serverManager.start();

  router.post("/graphql", server.getMiddleware());
  router.get("/graphql", server.getMiddleware());
  router.get("/health", (ctx: { body: string }) => {
    ctx.body = "ok";
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
}

main();
