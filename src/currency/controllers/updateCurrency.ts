import { z } from 'zod'

import { ResponseError } from '../../server/ResponseError'
import { type PathParams } from '../../shared/types/PathParams'
import { Controller } from '../../shared/utils/Controller'
import { currencyRepository } from '../repositories'

export const updateCurrencyParamsSchema = z.object({
  id: z.string(),
})

export const updateCurrencyBodySchema = z.object({
  name: z.string(),
  symbol: z.string(),
})

type UpdateCurrencyBody = z.infer<typeof updateCurrencyBodySchema>

interface Response {
  message: string
}

export const updateCurrency = Controller<PathParams<'id'>, UpdateCurrencyBody, Response>(
  async (req, res) => {
    const { id } = req.params
    const { name, symbol } = req.body

    const foundCurrency = await currencyRepository.findById(id)

    if (!foundCurrency) {
      throw new ResponseError(404, 'Currency not found')
    }

    foundCurrency.name = name
    foundCurrency.symbol = symbol

    await currencyRepository.update(foundCurrency)

    res.status(200).json({ message: 'Currency updated' })
  },
)
