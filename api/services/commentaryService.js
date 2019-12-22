import database from '../database/connect'

const createComment = async Commentary => {
    const { idAdmin, idSubs, commentary } = Commentary
    if (!await commentaryIsValid(Commentary)) {
        throw "Verifique os campos e tente novamente."
    }
    await database('Commentary').insert({ idAdmin, idSubs, commentary, date: database.raw('current_date') })
    
}

const subscriptionExists = async idSubs => {
    const isValid = await database('Subscription').select('idSubs').where({ idSubs })

    if (isValid.length === 0) {
        return false
    }
    return true
}

const commentaryIsValid = async Commentary => {
    const { commentary, idSubs } = Commentary

    if (!commentary || typeof (commentary) !== "string") {
        return false
    }
    return await subscriptionExists(idSubs)
}

module.exports = { createComment }