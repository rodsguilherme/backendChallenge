
import { createAdmin } from '../services/adminService'



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
            ctx.body = error
            ctx.status = 400
        }
    }

}


export default AdminController