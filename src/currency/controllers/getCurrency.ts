import type { PathParams } from '../../shared/types/PathParams'
import type { Currency } from '../domain/Currency'

import { z } from 'zod'

import { ResponseError } from '../../server/ResponseError'
import { Controller } from '../../shared/utils/Controller'
import { currencyRepository } from '../repositories'

export const getCurrencyParamsSchema = z.object({
  id: z.string(),
})

type Response = Currency

export const getCurrency = Controller<PathParams<'id'>, never, Response>(async (req, res) => {
  const { id } = req.params

  const currency = await currencyRepository.findById(id)

  if (!currency) {
    throw new ResponseError(404, 'Currency not found')
  }

  res.status(200).json(currency)
})
