import koa from 'koa';
import Router from 'koa-router';
const router = new Router({ prefix: '/v1' });
const api = new koa()

import {createCandidate} from '../services/candidateService'

router.post('/candidate', async ctx => {
    const { body } = ctx.request
    const candidate = {
        name: body.name,
        email: body.email,
        telephone: body.telephone,
        cpf: body.cpf
    }

    try {
        await createCandidate(candidate)
        ctx.body = "Candidato criado com sucesso!"
        ctx.status = 201
    } catch (error) {
        console.log(error)
        ctx.body = error
        ctx.status = 400
    }
})



api.use(router.routes())
module.exports = api