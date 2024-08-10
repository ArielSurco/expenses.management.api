import type { Currency } from './Currency'

export interface CurrencyRepository {
  create: (currency: Currency) => Promise<void>
  delete: (currency: Currency) => Promise<void>
  find: (id: string) => Promise<Currency | null>
  findAll: () => Promise<Currency[]>
  update: (currency: Currency) => Promise<void>
}
