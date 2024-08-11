import type { AccountRepository } from '../domain/AccountRepository'

import { type Account } from '../domain/Account'

const accounts: Account[] = []

const create: AccountRepository['create'] = async (account) => {
  const alreadyExists = accounts.some((acc) => acc.id === account.id)

  if (alreadyExists) {
    throw new Error('Account already exists')
  }

  accounts.push(account)

  return Promise.resolve()
}

const deleteAccount: AccountRepository['delete'] = async (account) => {
  const foundAccount = accounts.find((acc) => acc.id === account.id)

  if (!foundAccount) {
    throw new Error('Account not found')
  }

  // Modifies directly the account object, so the changes are reflected in the accounts array
  foundAccount.deactivate()

  return Promise.resolve()
}

const findByUser: AccountRepository['findByUser'] = async (userId) => {
  const userAccounts = accounts.filter((acc) => acc.user.id === userId)

  return Promise.resolve(userAccounts)
}

const update: AccountRepository['update'] = async (account) => {
  const foundAccount = accounts.find((acc) => acc.id === account.id)

  if (!foundAccount) {
    throw new Error('Account not found')
  }

  const accountIndex = accounts.findIndex((acc) => acc.id === account.id)

  accounts[accountIndex] = account

  return Promise.resolve()
}

export const mockAccountRepository: AccountRepository = {
  create,
  delete: deleteAccount,
  findByUser,
  update,
}
