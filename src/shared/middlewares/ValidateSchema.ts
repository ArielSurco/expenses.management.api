import { type NextFunction, type Request, type Response } from 'express'
import { type AnyZodObject, ZodError } from 'zod'

import { ResponseError } from '../../server/ResponseError'

export const ValidateSchema =
  (schema: AnyZodObject, type: 'body' | 'params') =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req[type])

      if (!result.success) {
        throw result.error
      }

      next()
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        throw new ResponseError(400, 'Some fields are invalid', error.formErrors.fieldErrors)
      }

      throw new ResponseError(500, 'Internal server error')
    }
  }
