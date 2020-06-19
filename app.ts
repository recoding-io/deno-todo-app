// Oak https://deno.land/x/oak/mod.ts

import {Application ,send} from 'https://deno.land/x/oak/mod.ts';
import {
    viewEngine,
    engineFactory,
    adapterFactory
} from 'https://deno.land/x/view_engine@v1.1.1/mod.ts';

import ListRoute from './routes/list.ts';

const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();

const app = new Application();

app.use(viewEngine(oakAdapter,ejsEngine,{
    viewRoot: './views',
    viewExt: '.ejs'
}));

app.use(async (ctx,next) => {
    await next();
    const rt = ctx.response.headers.get("X-Response-Time");
    console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

app.use(async (ctx,next)=> {
    const start = Date.now();
    await next();
    const ms = Date.now();
    ctx.response.headers.set("X-Response-Time", `${ms - start}ms`);
})

app.use(ListRoute.routes());

app.use(ListRoute.allowedMethods());

app.use(async (ctx,next) => {
    await send(ctx, ctx.request.url.pathname,{
        root: `${Deno.cwd()}/static`
    });
    next();
})

console.log('Our App is listening to Port 800');
await app.listen({port: 8000});