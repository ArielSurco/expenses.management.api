import { type Router } from 'express'

import { userRouter } from '../user/userRouter'

export interface RouterHandler {
  basePath: string
  router: Router
}

export const routes: RouterHandler[] = [userRouter]
