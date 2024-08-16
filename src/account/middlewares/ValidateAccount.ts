import { type NextFunction, type Request, type Response } from 'express'

import { ResponseError } from '../../server/ResponseError'
import { asyncMiddleware } from '../../shared/middlewares/asyncHandler'
import { accountRepository } from '../repositories'

export const ValidateAccount = asyncMiddleware(
  async (
    req: Request<unknown, unknown, Record<string, unknown>>,
    _res: Response,
    next: NextFunction,
  ) => {
    const accountId = String(req.body.accountId)
    const foundAccount = await accountRepository.findById(accountId)

    if (!foundAccount) {
      throw new ResponseError(400, 'Invalid currency')
    }

    next()
  },
)
