import { type CurrencyRepository } from '../domain/CurrencyRepository'

import { mockCurrencyRepository } from './MockCurrencyRepository'

export const currencyRepository: CurrencyRepository = mockCurrencyRepository
