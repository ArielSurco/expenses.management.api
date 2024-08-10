import { Controller } from '../../shared/utils/Controller'
import { type Currency } from '../domain/Currency'
import { currencyRepository } from '../repositories'

type Response = Currency[]

export const getCurrencies = Controller<never, never, Response>(async (_req, res) => {
  const currencies = await currencyRepository.findAll()

  res.status(200).json(currencies)
})
