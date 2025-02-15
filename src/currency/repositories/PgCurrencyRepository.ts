import { AppDataSource } from '../../db/app-source'
import { Currency } from '../domain/Currency'
import { type CurrencyRepository } from '../domain/CurrencyRepository'

const appCurrencyRepository = AppDataSource.getRepository(Currency)

const create: CurrencyRepository['create'] = async (currency) => {
  await appCurrencyRepository.save(currency)
}

const deleteCurrency: CurrencyRepository['delete'] = async (currency) => {
  await appCurrencyRepository.delete(currency)
}

const findById: CurrencyRepository['findById'] = async (currencyId) => {
  const foundCurrency = await appCurrencyRepository.findOne({ where: { id: currencyId } })

  return Promise.resolve(foundCurrency ?? null)
}

const findAll: CurrencyRepository['findAll'] = async () => {
  return appCurrencyRepository.find()
}

const update: CurrencyRepository['update'] = async (currency) => {
  await appCurrencyRepository.update(currency.id, currency)
}

export const pgCurrencyRepository: CurrencyRepository = {
  create,
  delete: deleteCurrency,
  findById,
  findAll,
  update,
}
