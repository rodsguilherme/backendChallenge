import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
    path: path.resolve(__dirname, './.env')
})

export const JWT_SECRET = process.env.SECRET || 'mysupersecret'
export const PORT = process.env.PORT || 3000