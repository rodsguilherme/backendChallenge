import database from '../database/connect'
import { emailValidation } from './validationService'
import { verifyHash, createHash } from './cryptografyService';

const createAdmin = async admin => {
    const { name, password, email } = admin

    const foundAdmin = await emailExists(admin)

    if (foundAdmin) {
        throw 'Verifique o email e tente novamente'
    }
    const passwordHashed = createHash(password)
    console.log(passwordHashed)
    await database('Admin').insert({ name, password: passwordHashed, email })

}

const emailIsValid = async email => {
    return emailValidation(email)
}

const emailExists = async email => {

    if (emailIsValid) {
        return false
    }
    const foundEmail = await database('Admin').select('email').where({ email });

    if (foundEmail.length > 0) {
        return true
    }
    return false
}

module.exports = { createAdmin }
