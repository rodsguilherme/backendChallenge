import database from '../database/connect'

const createSubscription = async subscription => {
    const { idAdmin, idCandidate, idVacancy } = subscription

    if (!await subscriptionIsValid(subscription)) {
        throw "Verifique os campos e tente novamente."
    }
    await database('Subscription').insert({ idAdmin, idCandidate, idVacancy, date: database.raw('current_date') })
}

const subscriptionIsValid = async subscription => {
    const { idAdmin, idCandidate, idVacancy } = subscription

    return await getAdminById(idAdmin) || await getCandidateById(idCandidate) || await getVacancyById(idVacancy)

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

const getSubscriptionById = async idSubs => {
    const subs = await database.from('Subscription')
        .innerJoin('Commentary', 'Commentary.idSubs', 'Subscription.idSubs').where('Subscription.idSubs', idSubs)
    if (subs.length === 0) {
        throw 'Inscricao não existe.'
    }
    return subs
}

const getSubscriptions = async () => {
    const subs = await database.from('Subscription')
        .innerJoin('Commentary', 'Commentary.idSubs', 'Subscription.idSubs')
    if (subs.length === 0) {
        throw 'Não há inscrições.'
    }
    return subs
}

module.exports = { getVacancyById, getCandidateById, createSubscription, getSubscriptionById, getSubscriptions }