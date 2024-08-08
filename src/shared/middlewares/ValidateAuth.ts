import { type NextFunction, type Request, type Response } from 'express'

import { ResponseError } from '../../server/ResponseError'
import { decodeAuthToken } from '../utils/decodeAuthToken'

export const ValidateAuth = (req: Request, _res: Response, next: NextFunction) => {
  const { id } = decodeAuthToken(req.header('Authorization'))

  if (id === '') {
    throw new ResponseError(401, 'Unauthorized')
  }

  next()
}
