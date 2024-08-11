import { type NextFunction, type Request, type Response } from 'express'

import { currencyRepository } from '../../currency/repositories'
import { ResponseError } from '../../server/ResponseError'

export const ValidateCurrency = async (
  req: Request<unknown, unknown, Record<string, unknown>>,
  _res: Response,
  next: NextFunction,
) => {
  const currencies = await currencyRepository.findAll()
  const currencyId = String(req.body.currencyId)

  const isValidCurrency = currencies.some((currency) => currency.id === currencyId)

  if (!isValidCurrency) {
    throw new ResponseError(400, 'Invalid currency')
  }

  next()
}
