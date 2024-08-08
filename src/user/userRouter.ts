/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import { type RouterHandler } from '../server/routes'
import { ValidateAuth } from '../shared/middlewares/ValidateAuth'
import { ValidateSchema } from '../shared/middlewares/ValidateSchema'

import { authUser, authUserSchema } from './controllers/authUser'
import { createUser, createUserSchema } from './controllers/createUser'
import { getUser } from './controllers/getUser'

const router = Router()

router.get('/', ValidateAuth, getUser)

router.post('/', ValidateSchema(createUserSchema, 'body'), createUser)
router.post('/auth', ValidateSchema(authUserSchema, 'body'), authUser)

export const userRouter: RouterHandler = {
  basePath: '/user',
  router,
}
