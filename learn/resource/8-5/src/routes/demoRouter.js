import Router from 'koa-router'
import demoController from '../api/demoController'

const router = new Router();
router.get('/demo', demoController.demo); // 第2个参数必须是1个函数，not object

export default router