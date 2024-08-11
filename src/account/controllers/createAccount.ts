import { z } from 'zod'

import { currencyRepository } from '../../currency/repositories'
import { ResponseError } from '../../server/ResponseError'
import { Controller } from '../../shared/utils/Controller'
import { decodeAuthToken } from '../../shared/utils/decodeAuthToken'
import { userRepository } from '../../user/repositories'
import { Account } from '../domain/Account'
import { AccountType } from '../domain/AccountType'
import { accountRepository } from '../repositories'

export const createAccountBodySchema = z.object({
  name: z.string(),
  type: z.nativeEnum(AccountType),
  currencyId: z.string(),
  balance: z.number().int().min(0),
  limitCredit: z.number().int().min(0).optional(),
})

type CreateAccountBody = z.infer<typeof createAccountBodySchema>

interface Response {
  message: string
}

export const createAccount = Controller<never, CreateAccountBody, Response>(async (req, res) => {
  const { id } = decodeAuthToken(req.header('Authorization'))
  const { name, type, currencyId, balance, limitCredit } = req.body

  const foundUser = await userRepository.findById(id)
  const foundCurrency = await currencyRepository.findById(currencyId)

  if (!foundUser || !foundCurrency) {
    // We already have middlewares to validate if they are valid
    throw new ResponseError(500, 'Unexpected error')
  }

  const account = new Account({
    name,
    type,
    availableBalance: balance,
    limitCredit,
    user: foundUser,
    currency: foundCurrency,
  })

  await accountRepository.create(account)

  res.status(201).json({ message: 'Account created successfully' })
})
