
import { createCandidate, getCandidateById, getAllCandidates } from '../services/candidateService'


const CandidateController = {
    create: async ctx => {
        const { body } = ctx.request
        const candidate = {
            name: body.name,
            email: body.email,
            telephone: body.telephone,
            cpf: body.cpf
        }

        try {
            await createCandidate(candidate)
            ctx.body = {
                message: "Candidato criado com sucesso!"
            }
            ctx.status = 201
        } catch (error) {
            if (error.errno === 19) {
                ctx.body = { message: 'Verifique os campos e tente novamente.' }
                ctx.status = 400
            }
            else {
                ctx.body = { message: error }
                ctx.status = 400
            }
        }
    },
    show: async ctx => {
        const { idCandidate } = ctx.params

        try {
            const candidate = await getCandidateById(idCandidate)
            ctx.body = { candidate }
            ctx.status = 200
        } catch (error) {
            ctx.body = { error }
            ctx.status = 404
        }
    },
    showAll: async ctx => {
        try {
            const candidates = await getAllCandidates()
            ctx.body = { candidates }
            ctx.status = 200
        } catch (error) {
            ctx.body = { message: 'Não foi possivel retornar os candidatos.' }
            ctx.status = 404
        }
    }
}

export default CandidateController