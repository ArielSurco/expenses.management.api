import { accountRepository } from '../account/repositories'
import { categoryRepository } from '../category/repositories'
import { currencyRepository } from '../currency/repositories'
import { userRepository } from '../user/repositories'

import { cashAlejandroAccount, cashJoseAccount, cashMariaAccount } from './accounts'
import {
  familyCategory,
  foodCategory,
  marketCategory,
  petsCategory,
  travelCategory,
} from './categories'
import { arsCurrency, usdCurrency } from './currencies'
import { userAlejandro, userJose, userMaria } from './users'

export const populateMockRepositories = async () => {
  await Promise.all([
    currencyRepository.create(arsCurrency),
    currencyRepository.create(usdCurrency),
  ])

  await Promise.all([
    userRepository.save(userAlejandro),
    userRepository.save(userJose),
    userRepository.save(userMaria),
  ])

  await Promise.all([
    categoryRepository.save(foodCategory),
    categoryRepository.save(marketCategory),
    categoryRepository.save(familyCategory),
    categoryRepository.save(petsCategory),
    categoryRepository.save(travelCategory),
  ])

  await Promise.all([
    accountRepository.create(cashAlejandroAccount),
    accountRepository.create(cashJoseAccount),
    accountRepository.create(cashMariaAccount),
  ])
}
