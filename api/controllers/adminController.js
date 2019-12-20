import koa from 'koa';
import Router from 'koa-router';
const router = new Router({ prefix: '/v1' });
import { createAdmin } from '../services/adminService'

const api = new koa()

router.post('/admins', async ctx => {
    const { body } = ctx.request
    const admin = {
        name: body.name,
        password: body.password,
        email: body.email
    }

    try {
        await createAdmin(admin)
        ctx.body = {
            message: 'Administrador criado com sucesso!'
        }
        ctx.status = 201
    } catch (error) {
        ctx.body = error
        ctx.status = 400
    }

})



api.use(router.routes())
module.exports = api