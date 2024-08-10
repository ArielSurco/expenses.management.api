/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import { type RouterHandler } from '../server/routes'
import { ValidateSchema } from '../shared/middlewares/ValidateSchema'

import { createCurrency, createCurrencySchema } from './controllers/createCurrency'
import { deleteCurrency, deleteCurrencyParamsSchema } from './controllers/deleteCurrency'
import { getCurrencies } from './controllers/getCurrencies'
import { getCurrency, getCurrencyParamsSchema } from './controllers/getCurrency'
import {
  updateCurrency,
  updateCurrencyBodySchema,
  updateCurrencyParamsSchema,
} from './controllers/updateCurrency'

const router = Router()

router.get('/', getCurrencies)
router.get('/:id', ValidateSchema(getCurrencyParamsSchema, 'params'), getCurrency)

router.post('/', ValidateSchema(createCurrencySchema, 'body'), createCurrency)

router.put(
  '/:id',
  ValidateSchema(updateCurrencyParamsSchema, 'params'),
  ValidateSchema(updateCurrencyBodySchema, 'body'),
  updateCurrency,
)

router.delete('/:id', ValidateSchema(deleteCurrencyParamsSchema, 'params'), deleteCurrency)

export const currencyRouter: RouterHandler = {
  basePath: '/currency',
  router,
}
