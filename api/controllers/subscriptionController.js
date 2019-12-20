import koa from 'koa';
import Router from 'koa-router';
const router = new Router({ prefix: '/v1' });

const api = new koa()

import { createSubscription } from '../services/subscriptionService'
router.post('/subscriptions', async ctx => {
    const { body } = ctx.request
    const subscription = {
        idVacancy: body.idVacancy,
        idCandidate: body.idCandidate,
        idAdmin: body.idAdmin
    }
    console.log(subscription)
    try {
        await createSubscription(subscription)
        ctx.body = {
            message: 'Inscrição feita com sucesso!'
        }
        ctx.status = 201
    } catch (error) {
        console.log(error)
        ctx.body = error
        ctx.status = 400
    }
})


api.use(router.routes())
module.exports = api