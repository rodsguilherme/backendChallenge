import database from '../database/connect'
import { compareHash } from './cryptografyService';

const getAdminByEmail = async email => {
    const foundEmail = await database('Admin').select('email').where({ email })
    if (foundEmail.length === 0) {
        return false
    }
    return foundEmail

}

const emailIsValid = async email => {
    const foundEmail = await database('Admin').select('email').where({ email })

    if (foundEmail.length > 0) {
        return true
    }
    return false
}

const passwordIsValid = async (password, adminEmail) => {
    const foundEmail = await getAdminByEmail(adminEmail)
    if (foundEmail.length == 1) {
        const emailToSearch = foundEmail[0].email
        const foundPassword = await database('Admin').select('password').where('email', emailToSearch)
        const comparedPassword = compareHash(password, foundPassword[0].password)
        return comparedPassword
    }
    else {
        return false
    }

}

const fieldAreValids = async admin => {
    const { email, password } = admin

    if (!email || !password) {
        return false
    }
    return await emailIsValid(email) || await passwordIsValid(password, email)

}

const login = async admin => {
    return await fieldAreValids(admin)
}

module.exports = { login }