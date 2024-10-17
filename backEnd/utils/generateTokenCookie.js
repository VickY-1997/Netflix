import jwt from 'jsonwebtoken'
import { ENV_VARS } from '../config/envVariables.js'

export const generateTokenCookie = (userId, res) => {
    const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET, {expiresIn:"10days"})

    res.cookie('jwt-netflix', token, {
        maxAge : 10 * 24 * 60 * 60 * 1000,
        httpOnly : true,
        sameSite : "strict",
        secure : ENV_VARS.NODE_ENV !== "development"
    })
    return token
}