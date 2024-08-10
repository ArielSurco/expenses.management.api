import type { Currency } from './Currency'

export interface CurrencyRepository {
  create: (currency: Currency) => Promise<void>
  delete: (currency: Currency) => Promise<void>
  findAll: () => Promise<Currency[]>
  findById: (id: string) => Promise<Currency | null>
  update: (currency: Currency) => Promise<void>
}
