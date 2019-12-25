
import { createVacancy, getVacancyById, getAllVacancys } from '../services/vacancyService'

const VacancyController = {
    create: async ctx => {
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
            ctx.body = { message: error }
            ctx.status = 400
        }
    },
    show: async ctx => {
        const { idVacancy } = ctx.params

        try {
            const vacancy = await getVacancyById(idVacancy)
            ctx.body = { vacancy }
            ctx.status = 200
        } catch (error) {
            ctx.body = { message: error }
            ctx.status = 404
        }
    },
    showAll: async ctx => {
        try {
            const vacancys = await getAllVacancys()
            ctx.body = { vacancys }
            ctx.status = 200
        } catch (error) {
            ctx.body = { message: error }
            ctx.status = 404
        }
    }
}

export default VacancyController