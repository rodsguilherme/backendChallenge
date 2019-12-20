const koa = require('koa');
const cors = require('@koa/cors')
const Router = require('koa-router');
const mount = require('koa-mount')
const koaBody = require('koa-body');
const respond = require('koa-respond')

const api = new koa()


api.use(cors({
    origin: '*',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    exposeHeaders: ['X-Request-Id']
}));
api.use(koaBody(({ multipart: true })))

api.use(mount(require('./controllers/candidateController')))



const router = new Router();
api.use(respond())
api.use(router.routes())
api.use(router.allowedMethods())


const port = 3000;
api.listen(port, () => console.log(`Running at port ${port}`))