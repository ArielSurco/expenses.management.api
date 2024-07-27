import type { User } from '../domain/User'

import { Controller } from '../../shared/utils/Controller'
import { userRepository } from '../repositories'

type Response = Pick<User, 'username'>[]

export const getUsers = Controller<never, never, Response>(async (_req, res) => {
  const foundUsers = await userRepository.getAll()

  const users = foundUsers.map((user) => ({
    username: user.username,
  }))

  res.json(users)
})
