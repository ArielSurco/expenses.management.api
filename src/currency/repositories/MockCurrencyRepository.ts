import type { Currency } from '../domain/Currency'

import { type CurrencyRepository } from '../domain/CurrencyRepository'

const currencies: Currency[] = []

const create: CurrencyRepository['create'] = async (currency) => {
  const alreadyExists = currencies.some((cur) => cur.id === currency.id)

  if (alreadyExists) {
    return Promise.reject(new Error('Currency already exists'))
  }

  currencies.push(currency)

  return Promise.resolve()
}

const deleteCurrency: CurrencyRepository['delete'] = async (currency) => {
  const foundCurrency = currencies.find((cur) => cur.id === currency.id)

  if (!foundCurrency) {
    return Promise.reject(new Error('Currency not found'))
  }

  currencies.splice(currencies.indexOf(foundCurrency), 1)

  return Promise.resolve()
}

const findById: CurrencyRepository['findById'] = async (currencyId) => {
  const foundCurrency = currencies.find((cur) => cur.id === currencyId)

  return Promise.resolve(foundCurrency ?? null)
}

const findAll: CurrencyRepository['findAll'] = async () => Promise.resolve(currencies)

const update: CurrencyRepository['update'] = async (currency) => {
  const foundCurrency = currencies.find((cur) => cur.id === currency.id)

  if (!foundCurrency) {
    return Promise.reject(new Error('Currency not found'))
  }

  currencies.splice(currencies.indexOf(foundCurrency), 1, currency)

  return Promise.resolve()
}

export const mockCurrencyRepository: CurrencyRepository = {
  create,
  delete: deleteCurrency,
  findById,
  findAll,
  update,
}
