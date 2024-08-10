import { z } from 'zod'

import { ResponseError } from '../../server/ResponseError'
import { type PathParams } from '../../shared/types/PathParams'
import { Controller } from '../../shared/utils/Controller'
import { currencyRepository } from '../repositories'

export const deleteCurrencyParamsSchema = z.object({
  id: z.string(),
})

interface Response {
  message: string
}

export const deleteCurrency = Controller<PathParams<'id'>, never, Response>(async (req, res) => {
  const { id } = req.params

  const foundCurrency = await currencyRepository.findById(id)

  if (!foundCurrency) {
    throw new ResponseError(404, 'Currency not found')
  }

  await currencyRepository.delete(foundCurrency)

  res.status(200).json({ message: 'Currency deleted' })
})
