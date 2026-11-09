import jwt, { Secret, type SignOptions } from "jsonwebtoken";

export type JwtPayload = {
  id: string
  email: string
}

export function signJwt(payload: JwtPayload, expiresIn?: SignOptions['expiresIn']) {
  const secret = process.env.JWT_SECRET

  if(!secret) {
    throw new Error('JWT_SECRET não está definido')
  }

  let options: SignOptions = {}

  if(expiresIn) {
    options.expiresIn = expiresIn
  }

  return jwt.sign(payload, secret, options)
}

export function verifyJwt(token: string) {
  const secret: Secret = process.env.JWT_SECRET as unknown as Secret

  return jwt.verify(token, secret) as JwtPayload
}