import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

import { ResponseError } from '../../server/ResponseError'
import { ENV } from '../../shared/constants/env'
import { Controller } from '../../shared/utils/Controller'
import { userRepository } from '../repositories'

export const authUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthUserBody = z.infer<typeof authUserSchema>

interface Response {
  token: string
}

export const authUser = Controller<never, AuthUserBody, Response>(async (req, res) => {
  const { email, password } = req.body

  const foundUser = await userRepository.findByEmail(email)

  if (!foundUser) {
    throw new ResponseError(400, 'Invalid email or password')
  }

  const isPasswordValid = await bcrypt.compare(password, foundUser.password)

  if (!isPasswordValid) {
    throw new ResponseError(400, 'Invalid email or password')
  }

  const token = jwt.sign({ id: foundUser.id }, ENV.JWT_SECRET)

  res.status(200).json({ token })
})
