import { ResponseError } from '../../server/ResponseError'
import { Controller } from '../../shared/utils/Controller'
import { User } from '../domain/User'
import { userRepository } from '../repositories'

export interface CreateUserBody {
  email: string
  password: string
  username: string
}

interface Response {
  message: string
}

export const createUser = Controller<never, CreateUserBody, Response>(async (req, res) => {
  const { email, password, username } = req.body

  const existingUser = await userRepository.findByEmail(email)

  if (existingUser) {
    throw new ResponseError(400, 'User already exists')
  }

  const user = new User({ email, password, username })

  await userRepository.save(user)

  res.json({ message: 'User created' })
})
