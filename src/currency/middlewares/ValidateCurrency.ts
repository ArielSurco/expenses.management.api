import { type NextFunction, type Request, type Response } from 'express'

import { ResponseError } from '../../server/ResponseError'
import { asyncMiddleware } from '../../shared/middlewares/asyncHandler'
import { currencyRepository } from '../repositories'

export const ValidateCurrency = asyncMiddleware(
  async (
    req: Request<unknown, unknown, Record<string, unknown>>,
    _res: Response,
    next: NextFunction,
  ) => {
    const currencyId = String(req.body.currencyId)
    const foundCurrency = await currencyRepository.findById(currencyId)

    if (!foundCurrency) {
      throw new ResponseError(400, 'Invalid currency')
    }

    next()
  },
)
