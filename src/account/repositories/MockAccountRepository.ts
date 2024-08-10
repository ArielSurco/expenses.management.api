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

  foundAccount.deactivate()

  return Promise.resolve()
}

const find: AccountRepository['find'] = async (id) => {
  const account = accounts.find((acc) => acc.id === id)

  return Promise.resolve(account ?? null)
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
  find,
  findByUser,
  update,
}
