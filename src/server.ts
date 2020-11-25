import Koa from "koa";
import KoaRouter from "koa-router";

async function main() {
  const app = await createApp();
  const port = process.env.PORT || 3100;

  app.listen(port);

  console.log(`Listening on port http://localhost:${port}/`);
}

async function createApp(): Promise<Koa> {
  const app = new Koa();
  const router = new KoaRouter();

  router.get("/health", (ctx: { body: string }) => {
    ctx.body = "ok";
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
}

main();
