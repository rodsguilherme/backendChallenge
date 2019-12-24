
const getToken = ({ headers }, ctx) => {
    if (!headers.authorization) {
        ctx.body = { message: "Você não está conectado." }
        ctx.status = 401
    }

    const [bearer, token] = headers.authorization.split(' ')
    if (bearer !== 'Bearer') {
        ctx.body = { message: "Token inválido" }
        ctx.status = 401
    }
    return token
}

export default getToken