const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const json = require('koa-json');
const app = new Koa();
const router = new Router();

router.prefix('/api');

router.get('/', ctx => {
    console.log(ctx);
    console.log(ctx.request);
    ctx.body = "Hello World!!";
})

router.get('/api', ctx => {
    // get params
    const params = ctx.request.query;
    console.log(params);
    // name:"imooc",age:"28"
    console.log(params.name, params.age)
    // console.log(ctx);
    // console.log(ctx.request);
    ctx.body = {
        name: params.name,
        age: params.age,
    };
})

router.get('/async', async ctx => {
    let result = await new Promise((resolve) => {
        setTimeout(function () {
            resolve('Hello world 2s later!')
        }, 2000)
    })
    ctx.body = result
})

router.post('/post', async (ctx) => {
    let { body } = ctx.request;
    console.log(body);
    console.log(ctx.request);
    ctx.body = {
        ...body
    }
});

app.use(koaBody());
app.use(cors());
app.use(json({ pretty: false, param: 'pretty' }));
// 1.request,method,respond
// 2.api url => function,router?
// 3.ctx,async
app.use(router.routes())
    .use(router.allowedMethods())
app.listen(3000);