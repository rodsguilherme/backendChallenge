import Router from 'koa-router'

import CandidateController from '../controllers/candidateController'

const router = new Router()

router.post('/candidates', CandidateController.create)

export default router.routes()