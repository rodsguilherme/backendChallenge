import database from '../database/connect'
import { validate } from 'cpf-check';
import { emailValidation, telephoneValidation } from './validationService'

const createCandidate = async dataCandidate => {
    const { name, email, telephone, cpf } = dataCandidate
    const candidateValidate = await candidateIsValid(dataCandidate)

    if (candidateValidate) {
        throw 'Valide os campos e tente novamente'
    }
    await database('Candidate').insert({ name, email, telephone, cpf })

}

const cpfExists = async cpf => {
    const foundCpf = await database('Candidate').select('cpf').where({ cpf })

    if (foundCpf.length > 0) {
        return true
    }
    return false
}

const emailExists = async email => {
    const foundEmail = await database("Candidate").select('email').where({ email })

    if (foundEmail.length > 0) {
        return true
    }
    return false
}

const candidateIsValid = async candidate => {
    const { name, email, telephone, cpf } = candidate;

    if (!name || !validate(cpf) || !emailValidation(email) || !telephoneValidation(telephone)) {
        return true
    }
    await cpfExists(cpf)

    await emailExists(email)

}

module.exports = { createCandidate }