import Router from 'koa-router'

import VacancyController from '../controllers/vacancyController'

const router = new Router()

router.post('/users/vacancys', VacancyController.create)

export default router.routes()