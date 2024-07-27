import bcrypt from 'bcrypt'
import { z } from 'zod'

import { ResponseError } from '../../server/ResponseError'
import { Controller } from '../../shared/utils/Controller'
import { User } from '../domain/User'
import { userRepository } from '../repositories'

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3),
})

export type CreateUserBody = z.infer<typeof createUserSchema>

interface Response {
  message: string
}

export const createUser = Controller<never, CreateUserBody, Response>(async (req, res) => {
  const { email, password, username } = req.body

  const existingUser = await userRepository.findByEmail(email)

  if (existingUser) {
    throw new ResponseError(400, 'User already exists')
  }

  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)

  const user = new User({ email, password: hashedPassword, username })

  await userRepository.save(user)

  res.json({ message: 'User created' })
})
