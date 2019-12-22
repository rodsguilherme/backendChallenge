import Router from 'koa-router'
import users from './routes-users'
import candidates from './routes-candidates'
import vacancys from './routes-vacancys'
import subscriptions from './routes-subscriptions'

const router = new Router()
const api = new Router()

api.use(users)
api.use(candidates)
api.use(vacancys)
api.use(subscriptions)

router.use('/v1', api.routes())

export default router