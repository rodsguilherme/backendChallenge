
import { createAdmin, getUserByEmail, getUserById, getAllUsers } from '../services/adminService'
import { login } from '../services/loginService'
import { generateToken } from '../services/authService'

const AdminController = {
    create: async ctx => {
        const { body } = ctx.request
        const admin = {
            name: body.name,
            password: body.password,
            email: body.email
        }

        try {
            await createAdmin(admin)
            ctx.body = {
                message: 'Administrador criado com sucesso!'
            }
            ctx.status = 201
        } catch (error) {
            if (error.errno == 19) {
                ctx.body = { message: 'Email ou senha incorretos.' }
                ctx.status = 400
            }
            else {
                ctx.body = { message: error }
                ctx.status = 400

            }
        }
    },
    login: async ctx => {
        const { body } = ctx.request
        const admin = {
            email: body.email,
            password: body.password
        }
        const connected = await login(admin)
        if (!connected) {
            ctx.body = {
                message: 'Email ou senha incorretos.'
            }
            ctx.status = 400
        }
        else {
            const credencials = await getUserByEmail(admin.email)
            const token = generateToken(credencials[0].idAdmin)

            ctx.body = { message: 'Usuário conectado.', token }
            ctx.status = 200
        }
    },
    show: async ctx => {
        const { idAdmin } = ctx.params

        try {
            const admin = await getUserById(idAdmin)
            ctx.body = { admin }
            ctx.status = 200
        } catch (error) {
            ctx.body = { message: error }
            ctx.status = 404
        }
    },
    showAll: async ctx => {
        try {
            const admins = await getAllUsers()
            ctx.body = { admins }
            ctx.status = 200
        } catch (error) {
            ctx.body = { message: error }
            ctx.status = 404
        }
    }

}


export default AdminController