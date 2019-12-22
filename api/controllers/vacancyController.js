
import { createVacancy } from '../services/vacancyService'

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
    }
}

export default VacancyController