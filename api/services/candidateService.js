import database from '../database/connect'
import { validate } from 'cpf-check';
import { emailValidation, telephoneValidation } from './validationService'

const createCandidate = async candidate => {
    const { name, email, telephone, cpf } = candidate
   
    if (!await candidateIsValid(candidate)) {
        throw 'Valide os campos e tente novamente'
    }
    await database('Candidate').insert({ name, email, telephone, cpf })

}

const candidateIsValid = async candidate => {
    const { name, email, telephone, cpf } = candidate;
   
    if (!name || !validate(cpf) || !emailValidation(email) || !telephoneValidation(telephone)) { 
        return false
    }
    return true
}

module.exports = { createCandidate }