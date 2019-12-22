import Router from 'koa-router'

import SubscriptionController from '../controllers/subscriptionController'

const router = new Router()

router.post('/subscriptions', SubscriptionController.create)
router.post('/subscriptions/comments/:idSubs', SubscriptionController.createCommentary)

export default router.routes()