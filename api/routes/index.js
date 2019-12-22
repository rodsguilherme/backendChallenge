import Router from 'koa-router'
import users from './routes-user'

const router = new Router()
const api = new Router()

api.use(users)

router.use('/v1', api.routes())

export default router