/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import { ValidateCurrency } from '../currency/middlewares/ValidateCurrency'
import { type RouterHandler } from '../server/routes'
import { ValidateAuth } from '../shared/middlewares/ValidateAuth'
import { ValidateSchema } from '../shared/middlewares/ValidateSchema'

import { createAccount, createAccountBodySchema } from './controllers/createAccount'
import { getAccounts } from './controllers/getAccounts'

const router = Router()

router.get('/', getAccounts)

router.post(
  '/',
  ValidateAuth,
  ValidateSchema(createAccountBodySchema, 'body'),
  ValidateCurrency,
  createAccount,
)

export const accountRouter: RouterHandler = {
  basePath: '/account',
  router,
}
