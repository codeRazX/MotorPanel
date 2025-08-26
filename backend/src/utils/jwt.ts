import 'dotenv/config'
import { Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserType } from '../models/User'


export const generateJWTandSendCookie = (res: Response, id: UserType['id']) => {
  const token = jwt.sign({id}, String(process.env.JWT_SECRET_KEY), {
    expiresIn: '1d'
  })

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 3600 * 24 * 1000
  })

}

export const clearCookie = (res: Response) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 3600 * 24 * 1000
  })
}

export const shouldRefreshToken = (exp: jwt.JwtPayload['exp']) => {
  if (exp){
    const now = Math.floor((Date.now() / (3600 * 1000)))
    const expires =  Math.floor(exp / 3600)
    return (expires - now) < Number(process.env.TM_REFRESH)
  }
  return false
}