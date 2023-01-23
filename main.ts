// import { ServiceCollection, Service } from './mod.ts';

// @Service()
// class Test{}

// const serviceCollection = new ServiceCollection();

// serviceCollection.addTransient(Test);

/** IGNORE THE SHIT ABOVE 
 * I was just testing out the dependency injection and I can't be bother rewriting or cherry-picking a commit
 * https://deno.land/x/di@v0.1.1
*/

import { logger } from './logger.ts';
import { Application } from './mod.ts';

try {
  logger.info("RumpoBot has Started");
  const webApp = new Application();

  webApp.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.headers.get("X-Response-Time");
    logger.info(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
  });


  webApp.use((ctx) => {
    ctx.response.body = "Welcome to RumpoBot";
  });
  
  // This should be an ENV
  const port = 3256;

  await webApp.listen({ port: port });

} catch (error) {

    logger.error("RumpoBot has stopped unexpectedly", error);

}

logger.info("RumpoBot has Stopped");
