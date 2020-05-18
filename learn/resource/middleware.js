const Koa = require('koa')
// const Router = require('koa-router');
const app = new Koa()
// const router = new Router();
const middleware = function async(ctx, next) {
  console.log('this is middleware!')
  console.log(ctx.request.path)
  // next();
}

const middleware1 = function async(ctx, next) {
  console.log('this is middleware1!')
  console.log(ctx.request.path)
  next()
  console.log('this is middleware1! ending')
}

const middleware2 = function async(ctx, next) {
  console.log('this is middleware2!')
  console.log(ctx.request.path)
  next()
  console.log('this is middleware2! ending')
}

app.use(middleware1)
app.use(middleware2)
app.use(middleware)

app.listen(3000)
