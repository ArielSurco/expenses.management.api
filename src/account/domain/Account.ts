import type { Currency } from '../../currency/domain/Currency'
import type { User } from '../../user/domain/User'

import { generateUUID } from '../../shared/utils/generateUUID'

import { type AccountType } from './AccountType'

interface Constructor {
  availableBalance: number
  currency: Currency
  id?: string
  limitCredit?: number
  name: string
  type: AccountType
  user: User
}

export class Account {
  id: string
  availableBalance: number
  createdAt: string
  currency: Currency
  deletedAt: string
  expenseUpToDate: number
  isActive: boolean
  limitCredit?: number
  name: string
  type: AccountType
  updatedAt: string
  user: User

  constructor({ name, type, user, availableBalance, currency, limitCredit }: Constructor) {
    this.id = generateUUID()
    this.availableBalance = availableBalance
    this.createdAt = new Date().toISOString()
    this.currency = currency
    this.deletedAt = ''
    this.expenseUpToDate = 0
    this.isActive = true
    this.limitCredit = limitCredit ?? 0
    this.name = name
    this.type = type
    this.updatedAt = new Date().toISOString()
    this.user = user
  }

  public deactivate(): void {
    this.isActive = false
    this.deletedAt = new Date().toISOString()
  }
}
