import bcrypt from 'bcrypt'

import { User } from '../user/domain/User'

const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)

  return hashedPassword
}

export const userAlejandro = new User({
  username: 'alejandro',
  password: hashPassword('Test123!'),
  email: 'alejandro@gmail.com',
})

export const userJose = new User({
  username: 'jose',
  password: hashPassword('Mock123!'),
  email: 'jose@gmail.com',
})

export const userMaria = new User({
  username: 'maria',
  password: hashPassword('Jest123!'),
  email: 'maria@gmail.com',
})
