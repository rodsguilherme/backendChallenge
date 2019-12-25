import Router from 'koa-router'

import VacancyController from '../controllers/vacancyController'

const router = new Router()

router.post('/vacancys', VacancyController.create)
router.get('/vacancys/:idVacancy', VacancyController.show)
router.get('/vacancys', VacancyController.showAll)


export default router.routes()