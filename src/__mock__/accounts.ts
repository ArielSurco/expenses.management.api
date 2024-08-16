import { Account } from '../account/domain/Account'
import { AccountType } from '../account/domain/AccountType'

import { arsCurrency, usdCurrency } from './currencies'
import { userAlejandro, userJose, userMaria } from './users'

export const cashAlejandroAccount = new Account({
  name: 'Cash',
  type: AccountType.CASH,
  user: userAlejandro,
  availableBalance: 1052,
  currency: usdCurrency,
})

export const cashJoseAccount = new Account({
  name: 'Cash',
  type: AccountType.CASH,
  user: userJose,
  availableBalance: 70156,
  currency: arsCurrency,
})

export const cashMariaAccount = new Account({
  name: 'Cash',
  type: AccountType.CASH,
  user: userMaria,
  availableBalance: 495097,
  currency: arsCurrency,
})
