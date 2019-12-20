import database from '../database/connect'
import { compareHash } from './cryptografyService';
const login = async admin => {
   return await fieldAreValids(admin)
}


const getAdminByEmail = async email => {
    const foundEmail = await database('Admin').select('email').where({ email })

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
    const emailToSearch = foundEmail[0].email
    const foundPassword = await database('Admin').select('password').where('email', emailToSearch)

    const comparedPassword = compareHash(password, foundPassword[0].password)

    return comparedPassword
}

const fieldAreValids = async admin => {
    const { email, password } = admin
    
    if (!email || !password) {
        return false
    }
    const emailChecked = await emailIsValid(email)
    const passwordChecked = await passwordIsValid(password, email)
    if (!emailChecked || !passwordChecked) {
        return false
    }
    return true

}

module.exports = { login }