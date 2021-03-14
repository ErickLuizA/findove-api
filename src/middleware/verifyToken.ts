import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'

export default function (request: any, response: Response, next: NextFunction): any {
  const { authorization } = request.headers

  if (authorization === undefined) {
    throw Error('Authorization required')
  }

  const [, token] = authorization.split(' ')

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET ?? '') as string

    request.userId = Number(decodedToken)

    return next()
  } catch (error) {
    throw new Error('Invalid token')
  }
}
