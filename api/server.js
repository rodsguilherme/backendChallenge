const koa = require('koa');
const cors = require('@koa/cors')
const Router = require('koa-router');
const koaBody = require('koa-body');
const respond = require('koa-respond')
const jwt = require('koa-jwt')

import routes from './routes'
import getToken from './middlewares/jwtMiddleware'
import { JWT_SECRET } from './config'
const api = new koa()


api.use(cors({
    origin: '*',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    exposeHeaders: ['X-Request-Id']
}));
api.use(koaBody(({ multipart: true })))

api.use(
    jwt({
        secret: JWT_SECRET,
        getToken
    }).unless({
        path: ['/v1/users/login', 'v1/users/signup']
    })
)

const router = new Router();
api.use(respond())
api.use(routes.routes())
api.use(router.allowedMethods())

export default api