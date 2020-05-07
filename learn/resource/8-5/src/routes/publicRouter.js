import Router from 'koa-router'
import publicController from '../api/PublicController'

const router = new Router();
router.get('/getCaptcha', publicController.getCaptcha); // 第2个参数必须是1个函数，not object

export default router