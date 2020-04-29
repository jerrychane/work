// const koa = require('koa');
// const path = require('path');
import koa from 'koa';
import path from 'path';
const app = new koa();
// const helmet = require('koa-helmet');
// const statics = require('koa-static');

import helmet from 'koa-helmet';
import statics from 'koa-static';

// const router = require('./routes/routes');
import router from './routes/routes';

app.use(helmet());
app.use(statics(path.join(__dirname, '../public/')));
app.use(router());

app.listen(3000);