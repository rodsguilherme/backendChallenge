import database from '../database/connect'

const createSubscription = async subscription => {
    const { idAdmin, idCandidate, idVacancy } = subscription
    const subscriptionChecked = await subscriptionIsValid(subscription)

    if (!subscriptionChecked) {
        throw "Verifique os campos e tente novamente."
    }
    await database('Subscription').insert({ idAdmin, idCandidate, idVacancy })
}

const subscriptionIsValid = async subscription => {
    const { idAdmin, idCandidate, idVacancy } = subscription
    const adminChecked = await getAdminById(idAdmin)
    const candidateChecked = await getCandidateById(idCandidate)
    const vacancyChecked = await getVacancyById(idVacancy)

    if (!adminChecked || !candidateChecked || !vacancyChecked) {
        return false
    }
    return true
}

const getVacancyById = async idVacancy => {
    const id = await database('Vacancy').select('idVacancy').where({ idVacancy })
    if (id.length === 0) {
        return false
    }
    return true
}

const getCandidateById = async idCandidate => {
    const id = await database('Candidate').select('idCandidate').where({ idCandidate })

    if (id.length === 0) {
        return false
    }
    return true

}

const getAdminById = async idAdmin => {
    const id = await database('Admin').select('idAdmin').where({ idAdmin })

    if (id.length === 0) {
        return false
    }
    return true
}



module.exports = { getVacancyById, getCandidateById, createSubscription }