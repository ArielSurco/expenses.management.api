import { type Router } from 'express'

import { accountRouter } from '../account/accountRouter'
import { categoryRouter } from '../category/categoryRouter'
import { currencyRouter } from '../currency/currencyRouter'
import { userRouter } from '../user/userRouter'

export interface RouterHandler {
  basePath: string
  router: Router
}

export const routes: RouterHandler[] = [userRouter, currencyRouter, accountRouter, categoryRouter]
