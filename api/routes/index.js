import Router from 'koa-router'
import admin from './routes-admin'

const router = new Router()
const api = new Router()

api.use(admin)

router.use('/v1', api.routes())

export default router