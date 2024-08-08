import type { User } from '../domain/User'

import { ResponseError } from '../../server/ResponseError'
import { Controller } from '../../shared/utils/Controller'
import { decodeAuthToken } from '../../shared/utils/decodeAuthToken'
import { userRepository } from '../repositories'

type Response = Pick<User, 'id' | 'username' | 'email'>

export const getUser = Controller<never, never, Response>(async (req, res) => {
  const { id: userId } = decodeAuthToken(req.header('Authorization'))

  const foundUser = await userRepository.findById(userId)

  if (!foundUser) {
    throw new ResponseError(401, 'Unauthorized')
  }

  res.json({
    id: foundUser.id,
    username: foundUser.username,
    email: foundUser.email,
  })
})
