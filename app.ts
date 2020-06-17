// Oak https://deno.land/x/oak/mod.ts

import {Application} from 'https://deno.land/x/oak/mod.ts';
import ListRoute from './routes/list.ts';

const app = new Application();

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

console.log('Our App is listening to Port 800');
await app.listen({port: 8000});