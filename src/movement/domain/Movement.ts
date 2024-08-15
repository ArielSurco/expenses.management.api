import { type Account } from '../../account/domain/Account'
import { type Category } from '../../category/domain/Category'
import { type Currency } from '../../currency/domain/Currency'
import { generateUUID } from '../../shared/utils/generateUUID'

interface Constructor {
  account: Account
  category: Category
  currency: Currency
  detail: string
  title: string
  value: number
}

export class Movement {
  account: Account
  accountBalance: number
  category: Category
  currency: Currency
  date: string
  detail: string
  id: string
  title: string
  value: number

  constructor({ account, category, currency, detail, title, value }: Constructor) {
    this.account = account
    // We're assuming that the balance was already updated with the value of the movement
    this.accountBalance = account.availableBalance
    this.category = category
    this.currency = currency
    this.date = new Date().toISOString()
    this.detail = detail
    this.id = generateUUID()
    this.title = title
    this.value = value
  }
}
