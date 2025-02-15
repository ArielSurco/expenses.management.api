import { type CurrencyRepository } from '../domain/CurrencyRepository'

import { pgCurrencyRepository } from './PgCurrencyRepository'

export const currencyRepository: CurrencyRepository = pgCurrencyRepository
