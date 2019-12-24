import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../config'

export const generateToken = id => jwt.sign(({ id }, JWT_SECRET))