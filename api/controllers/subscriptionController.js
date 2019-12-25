
import { createSubscription } from '../services/subscriptionService'
import { createComment } from '../services/commentaryService'
const SubscriptionController = {
    create: async ctx => {
        const { body } = ctx.request
        const subscription = {
            idVacancy: body.idVacancy,
            idCandidate: body.idCandidate,
            idAdmin: ctx.state.user.id
        }
        try {
            await createSubscription(subscription)
            ctx.body = { message: 'Inscrição feita com sucesso!' }
            ctx.status = 201
        } catch (error) {
            ctx.body = { message: error }
            ctx.status = 400
        }
    },
    createCommentary: async ctx => {
        const { body } = ctx.request
        const { idSubs } = ctx.params
        const Commentary = {
            idAdmin: ctx.state.user.id,
            idSubs,
            commentary: body.commentary
        }
        try {
            await createComment(Commentary)
            ctx.body = { message: 'Comentário adicionado' }
            ctx.status = 201
        } catch (error) {
            if (error.errno == 19) {
                ctx.body = { message: 'Verifique os campos e tente novamente' }
                ctx.status = 400
            }
            ctx.body = { message: error }
            ctx.status = 400

        }
    }
}


export default SubscriptionController