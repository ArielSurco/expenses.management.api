import { z } from 'zod'

import { accountRepository } from '../../account/repositories'
import { categoryRepository } from '../../category/repositories'
import { currencyRepository } from '../../currency/repositories'
import { ResponseError } from '../../server/ResponseError'
import { Controller } from '../../shared/utils/Controller'
import { decodeAuthToken } from '../../shared/utils/decodeAuthToken'
import { Movement } from '../domain/Movement'
import { movementRepository } from '../repositories'

export const createExpenseMovementBodySchema = z.object({
  accountId: z.string(),
  categoryId: z.string(),
  currencyId: z.string(),
  detail: z.string().optional(),
  title: z.string().min(3),
  value: z.number().min(0),
  forceSpend: z.boolean().optional(),
})

type CreateExpenseMovementBody = z.infer<typeof createExpenseMovementBodySchema>

interface Response {
  message: string
  remainingBalance: number
}

export const createExpenseMovement = Controller<never, CreateExpenseMovementBody, Response>(
  async (req, res) => {
    const { id: userId } = decodeAuthToken(req.header('Authorization'))
    const { accountId, categoryId, currencyId, detail, title, value, forceSpend } = req.body

    const foundAccount = await accountRepository.findById(accountId)

    if (!foundAccount) {
      throw new ResponseError(400, 'Invalid account')
    }

    if (!foundAccount.isOwner(userId)) {
      throw new ResponseError(403, 'Forbidden')
    }

    if (!foundAccount.canSpend(value) && !forceSpend) {
      throw new ResponseError(400, 'Insufficient funds')
    }

    const foundCategory = await categoryRepository.findById(categoryId)

    if (!foundCategory) {
      throw new ResponseError(400, 'Invalid category')
    }

    const foundCurrency = await currencyRepository.findById(currencyId)

    if (!foundCurrency) {
      throw new ResponseError(400, 'Invalid currency')
    }

    foundAccount.expense(value)

    const newMovement = new Movement({
      account: foundAccount,
      category: foundCategory,
      currency: foundCurrency,
      detail: detail ?? '',
      title,
      value,
    })

    await Promise.all([
      accountRepository.update(foundAccount),
      movementRepository.save(newMovement),
    ])

    res.status(200).json({
      message: 'Movement created',
      remainingBalance: foundAccount.availableBalance,
    })
  },
)
