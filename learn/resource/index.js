const Koa = require('koa');
const Router = require('koa-router')
const app = new Koa();
const router = new Router();

router.get('/')

// 1.request,method,respond
// 2.api url => function,router?
// 3.ctx,async
app.use(async ctx =>{
    console.log(ctx);
    console.log(ctx.request);
    ctx.body = "Hello World!!";
})
app.listen(3000);