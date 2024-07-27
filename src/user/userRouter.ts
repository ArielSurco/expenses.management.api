import { Router } from 'express'

import { type RouterHandler } from '../server/routes'

import { createUser } from './controllers/createUser'
import { getUsers } from './controllers/getUsers'

const router = Router()

router.get('/', getUsers)

router.post('/', createUser)

export const userRouter: RouterHandler = {
  basePath: '/user',
  router,
}
