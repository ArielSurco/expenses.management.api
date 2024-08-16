import { type NextFunction, type Request, type Response } from 'express'

import { ResponseError } from '../../server/ResponseError'
import { asyncMiddleware } from '../../shared/middlewares/asyncHandler'
import { categoryRepository } from '../repositories'

export const ValidateCurrency = asyncMiddleware(
  async (
    req: Request<unknown, unknown, Record<string, unknown>>,
    _res: Response,
    next: NextFunction,
  ) => {
    const categoryId = String(req.body.categoryId)
    const foundCategory = await categoryRepository.findById(categoryId)

    if (!foundCategory) {
      throw new ResponseError(400, 'Invalid currency')
    }

    next()
  },
)
