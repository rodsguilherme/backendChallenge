import koa from 'koa';
import Router from 'koa-router';
const router = new Router({ prefix: '/v1' });
const api = new koa()

import { createVacancy } from '../services/vacancyService'

router.post('/vacancys', async ctx => {
    const { body } = ctx.request
    const vacancy = {
        name: body.name,
        skills: body.skills,
        description: body.description
    }
    try {
        await createVacancy(vacancy)
        ctx.body = {
            message: 'Vaga criada com sucesso!'
        }
        ctx.status = 201
    } catch (error) {
        ctx.body = error
        ctx.status = 400
    }
})



api.use(router.routes())
module.exports = api