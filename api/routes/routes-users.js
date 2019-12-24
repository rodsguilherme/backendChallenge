import Router from 'koa-router'

import AdminController from '../controllers/adminController'

const router = new Router()

router.post('/users/signup', AdminController.create)
router.post('/users/login', AdminController.login)

export default router.routes()