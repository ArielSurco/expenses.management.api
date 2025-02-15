import type { AccountRepository } from '../domain/AccountRepository'

import { AppDataSource } from '../../db/app-source'
import { Account } from '../domain/Account'

const appAccountRepository = AppDataSource.getRepository(Account)

const create: AccountRepository['create'] = async (account) => {
  await appAccountRepository.save(account)
}

const deleteAccount: AccountRepository['delete'] = async (account) => {
  const foundAccount = await appAccountRepository.findOne({ where: { id: account.id } })

  if (!foundAccount) {
    throw new Error('Account not found')
  }

  foundAccount.deactivate()

  await appAccountRepository.save(foundAccount)
}

const findById: AccountRepository['findById'] = async (accountId) => {
  const foundAccount = await appAccountRepository.findOne({
    where: { id: accountId },
    relations: ['user', 'currency'],
  })

  return Promise.resolve(foundAccount ?? null)
}

const findByUser: AccountRepository['findByUser'] = async (userId) => {
  const userAccounts = await appAccountRepository.find({
    where: { user: { id: userId } },
    relations: ['user', 'currency'],
  })

  return Promise.resolve(userAccounts)
}

const update: AccountRepository['update'] = async (account) => {
  const foundAccount = await appAccountRepository.findOne({ where: { id: account.id } })

  if (!foundAccount) {
    throw new Error('Account not found')
  }

  await appAccountRepository.save(account)
}

export const pgAccountRepository: AccountRepository = {
  create,
  delete: deleteAccount,
  findById,
  findByUser,
  update,
}
