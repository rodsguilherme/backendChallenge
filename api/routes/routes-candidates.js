import Router from 'koa-router'

import CandidateController from '../controllers/candidateController'

const router = new Router()

router.post('/candidates', CandidateController.create)
router.get('/candidates/:idCandidate', CandidateController.show)
export default router.routes()