import Router from 'koa-router'
import users from './routes-users'
import candidates from './routes-candidates'
const router = new Router()
const api = new Router()

api.use(users)
api.use(candidates)

router.use('/v1', api.routes())

export default router