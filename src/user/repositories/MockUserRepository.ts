import type { User } from '../domain/User'
import type { UserRepository } from '../domain/UserRepository'

const users: User[] = []

const save: UserRepository['save'] = async (user) => {
  const userIndex = users.findIndex((u) => u.id === user.id)

  if (userIndex === -1) {
    user.id = String(users.length + 1)
    users.push(user)
  } else {
    users[userIndex] = user
  }

  return Promise.resolve()
}

const findByUsername: UserRepository['findByUsername'] = async (username) => {
  const foundUser = users.find((user) => user.username === username) ?? null

  return Promise.resolve(foundUser)
}

const findByEmail: UserRepository['findByEmail'] = async (email) => {
  const foundUser = users.find((user) => user.email === email) ?? null

  return Promise.resolve(foundUser)
}

const findById: UserRepository['findById'] = async (id) => {
  const foundUser = users.find((user) => user.id === id) ?? null

  return Promise.resolve(foundUser)
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
