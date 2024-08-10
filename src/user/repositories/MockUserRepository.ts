import type { User } from '../domain/User'
import type { UserRepository } from '../domain/UserRepository'

const users: User[] = []

const save: UserRepository['save'] = async (user) => {
  const alreadyExists = users.some((u) => u.id === user.id)

  if (alreadyExists) {
    return Promise.reject(new Error('User already exists'))
  }

  users.push(user)

  return Promise.resolve()
}

const findByUsername: UserRepository['findByUsername'] = async (username) => {
  const foundUser = users.find((user) => user.username === username)

  return Promise.resolve(foundUser ?? null)
}

const findByEmail: UserRepository['findByEmail'] = async (email) => {
  const foundUser = users.find((user) => user.email === email)

  return Promise.resolve(foundUser ?? null)
}

const findById: UserRepository['findById'] = async (id) => {
  const foundUser = users.find((user) => user.id === id)

  return Promise.resolve(foundUser ?? null)
}

const getAll: UserRepository['getAll'] = async () => {
  return Promise.resolve(users)
}

export const mockUserRepository: UserRepository = {
  findByEmail,
  findById,
  findByUsername,
  getAll,
  save,
}
