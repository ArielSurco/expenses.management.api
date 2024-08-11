/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import { type RouterHandler } from '../server/routes'
import { asyncMiddleware } from '../shared/middlewares/asyncHandler'
import { ValidateAuth } from '../shared/middlewares/ValidateAuth'
import { ValidateSchema } from '../shared/middlewares/ValidateSchema'

import { createAccount, createAccountBodySchema } from './controllers/createAccount'
import { getAccounts } from './controllers/getAccounts'
import { ValidateCurrency } from './middlewares/ValidateCurrency'

const router = Router()

router.get('/', getAccounts)

router.post(
  '/',
  ValidateAuth,
  ValidateSchema(createAccountBodySchema, 'body'),
  asyncMiddleware(ValidateCurrency),
  createAccount,
)

export const accountRouter: RouterHandler = {
  basePath: '/account',
  router,
}
