import type { UserRepository } from '../domain/UserRepository'

import AppDataSource from '../../db/app-source'
import { User } from '../domain/User'

const appUserRepository = AppDataSource.getRepository(User)

const save: UserRepository['save'] = async (user) => {
  await appUserRepository.save(user)
}

const findByUsername: UserRepository['findByUsername'] = async (username) => {
  const foundUser = await appUserRepository.findOne({ where: { username } })

  return Promise.resolve(foundUser ?? null)
}

const findByEmail: UserRepository['findByEmail'] = async (email) => {
  const foundUser = await appUserRepository.findOne({ where: { email } })

  return Promise.resolve(foundUser ?? null)
}

const findById: UserRepository['findById'] = async (id) => {
  const foundUser = await appUserRepository.findOne({ where: { id } })

  return Promise.resolve(foundUser ?? null)
}

const getAll: UserRepository['getAll'] = async () => {
  return appUserRepository.find()
}

export const pgUserRepository: UserRepository = {
  findByEmail,
  findById,
  findByUsername,
  getAll,
  save,
}
