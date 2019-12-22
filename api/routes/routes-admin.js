import Router from 'koa-router'

import AdminController from '../controllers/adminController'

const router = new Router()

router.post('/admins', AdminController.create)


export default router.routes()