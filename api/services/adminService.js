import database from '../database/connect'
import { emailValidation } from './validationService'
import { createHash } from './cryptografyService';

const createAdmin = async admin => {
    const { name, password, email } = admin

    if (!emailValidation(email)) {
        throw 'Verifique o email e tente novamente'
    }
    const passwordHashed = createHash(password)
    await database('Admin').insert({ name, password: passwordHashed, email })

}

const getUserByEmail = async email => {
    return await database('Admin').select('idAdmin').where({ email })
}

module.exports = { createAdmin, getUserByEmail }
