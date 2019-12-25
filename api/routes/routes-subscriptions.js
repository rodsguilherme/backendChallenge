import Router from 'koa-router'

import SubscriptionController from '../controllers/subscriptionController'

const router = new Router()

router.post('/subscriptions', SubscriptionController.create)
router.post('/subscriptions/comments/:idSubs', SubscriptionController.createCommentary)
router.get('/subscriptions/:idSubs', SubscriptionController.show)
export default router.routes()