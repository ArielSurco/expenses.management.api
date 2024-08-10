import { type Router } from 'express'

import { currencyRouter } from '../currency/currencyRouter'
import { userRouter } from '../user/userRouter'

export interface RouterHandler {
  basePath: string
  router: Router
}

export const routes: RouterHandler[] = [userRouter, currencyRouter]
