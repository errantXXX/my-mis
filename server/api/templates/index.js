import Router from 'koa-router'
import TemplateController from './template.controller'

const router = new Router();

router.get('/', TemplateController.getList)

export default router
