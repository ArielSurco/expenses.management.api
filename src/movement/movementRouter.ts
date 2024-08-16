/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import { ValidateAccount } from '../account/middlewares/ValidateAccount'
import { ValidateCategory } from '../category/middlewares/ValidateCategory'
import { ValidateCurrency } from '../currency/middlewares/ValidateCurrency'
import { type RouterHandler } from '../server/routes'
import { ValidateAuth } from '../shared/middlewares/ValidateAuth'
import { ValidateSchema } from '../shared/middlewares/ValidateSchema'

import {
  createExpenseMovement,
  createExpenseMovementBodySchema,
} from './controllers/createExpenseMovement'
import { deleteMovement, deleteMovementParamsSchema } from './controllers/deleteMovement'
import { getMovements } from './controllers/getMovements'

const router = Router()

router.get('/', ValidateAuth, getMovements)

router.post(
  '/spend',
  ValidateAuth,
  ValidateSchema(createExpenseMovementBodySchema, 'body'),
  ValidateCurrency,
  ValidateAccount,
  ValidateCategory,
  createExpenseMovement,
)

router.delete(
  '/:id',
  ValidateSchema(deleteMovementParamsSchema, 'params'),
  ValidateAuth,
  deleteMovement,
)

export const movementRouter: RouterHandler = {
  basePath: '/movement',
  router,
}
