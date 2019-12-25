import Router from 'koa-router'

import CandidateController from '../controllers/candidateController'

const router = new Router()

router.post('/candidates', CandidateController.create)
router.get('/candidates/:idCandidate', CandidateController.show)
router.get('/candidates', CandidateController.showAll)



export default router.routes()