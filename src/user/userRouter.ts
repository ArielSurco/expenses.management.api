import { Router } from 'express'

import { type RouterHandler } from '../server/routes'
import { ValidateSchema } from '../shared/middlewares/ValidateSchema'

import { createUser, createUserSchema } from './controllers/createUser'
import { getUsers } from './controllers/getUsers'

const router = Router()

router.get('/', getUsers)

router.post('/', ValidateSchema(createUserSchema, 'body'), createUser)
router.post('/auth')

export const userRouter: RouterHandler = {
  basePath: '/user',
  router,
}
