import { Controller } from '../../shared/utils/Controller'
import { decodeAuthToken } from '../../shared/utils/decodeAuthToken'
import { type Account } from '../domain/Account'
import { accountRepository } from '../repositories'

export const getAccounts = Controller<never, never, Account[]>(async (req, res) => {
  const { id } = decodeAuthToken(req.header('Authorization'))

  const accounts = await accountRepository.findByUser(id)

  res.status(200).json(accounts)
})
