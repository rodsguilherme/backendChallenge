
import { createAdmin } from '../services/adminService'
import { login } from '../services/loginService'


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
            ctx.body = {
                message: 'Usuário conectado.'
            }
            ctx.status = 200
        }
    }

}


export default AdminController