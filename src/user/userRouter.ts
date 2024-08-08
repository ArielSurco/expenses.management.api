/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import { type RouterHandler } from '../server/routes'
import { ValidateSchema } from '../shared/middlewares/ValidateSchema'

import { authUser, authUserSchema } from './controllers/authUser'
import { createUser, createUserSchema } from './controllers/createUser'
import { getUsers } from './controllers/getUsers'

const router = Router()

router.get('/', getUsers)

router.post('/', ValidateSchema(createUserSchema, 'body'), createUser)
router.post('/auth', ValidateSchema(authUserSchema, 'body'), authUser)

export const userRouter: RouterHandler = {
  basePath: '/user',
  router,
}
