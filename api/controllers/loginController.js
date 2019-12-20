import koa from 'koa';
import Router from 'koa-router';
const router = new Router({ prefix: '/v1' });
const api = new koa()
import { login } from '../services/loginService'

router.post('/login', async ctx => {
    const { body } = ctx.request
    const admin = {
        email: body.email,
        password: body.password
    }

    const connected = await login(admin)
    console.log(connected)
    if (!connected) {
        ctx.body = {
            message: 'Email ou senha incorretos.'
        }
        ctx.status = 400
    }
    else {
        ctx.body = {
            message: 'Usuário conectado.'
        }
        ctx.status = 200
    }

})


api.use(router.routes())
module.exports = api