import { z } from 'zod'

import { Controller } from '../../shared/utils/Controller'
import { Currency } from '../domain/Currency'
import { currencyRepository } from '../repositories'

export const createCurrencySchema = z.object({
  name: z.string(),
  symbol: z.string(),
})

type CreateCurrencyBody = z.infer<typeof createCurrencySchema>

interface Response {
  message: string
}

export const createCurrency = Controller<never, CreateCurrencyBody, Response>(async (req, res) => {
  const { name, symbol } = req.body

  const newCurrency = new Currency({ name, symbol })

  await currencyRepository.create(newCurrency)

  res.status(201).json({ message: 'Currency created' })
})
