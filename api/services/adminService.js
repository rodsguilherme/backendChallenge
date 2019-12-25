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

const getUserByEmail = async email => await database('Admin').select('idAdmin').where({ email })


const getUserById = async idAdmin => {
    const id = await database('Admin').select("*").where({ idAdmin })
    if (id.length == 0) {
        throw "Administrador não existe."
    }
    return id
}

const getAllUsers = async () => {
    const users = await database('Admin').select('*')
    if (users.length === 0) {
        throw "Não há adminstradores cadastrados."
    }
    return users
}
module.exports = { createAdmin, getUserByEmail, getUserById, getAllUsers }
