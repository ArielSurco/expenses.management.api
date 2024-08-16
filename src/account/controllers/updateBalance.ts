import { z } from 'zod'

import { ResponseError } from '../../server/ResponseError'
import { type PathParams } from '../../shared/types/PathParams'
import { Controller } from '../../shared/utils/Controller'
import { decodeAuthToken } from '../../shared/utils/decodeAuthToken'
import { accountRepository } from '../repositories'

export const updateBalanceBodySchema = z.object({
  amount: z.number().positive(),
  type: z.enum(['add', 'subtract']),
})

export const updateBalanceParamsSchema = z.object({
  id: z.string(),
})

type UpdateBalanceBody = z.infer<typeof updateBalanceBodySchema>

interface Response {
  message: string
  updatedBalance: number
}

export const updateBalance = Controller<PathParams<'id'>, UpdateBalanceBody, Response>(
  async (req, res) => {
    const { id: userId } = decodeAuthToken(req.header('Authorization'))
    const { id: accountId } = req.params
    const { amount, type } = req.body

    const foundAccount = await accountRepository.findById(accountId)

    if (!foundAccount?.isActive) {
      throw new ResponseError(404, 'Account not found')
    }

    if (!foundAccount.isOwner(userId)) {
      throw new ResponseError(403, 'You are not allowed to modify this account')
    }

    if (type === 'add') {
      foundAccount.income(amount)
    }

    if (type === 'subtract') {
      foundAccount.expense(amount)
    }

    await accountRepository.update(foundAccount)

    res.status(200).json({
      message: 'Balance updated successfully',
      updatedBalance: foundAccount.availableBalance,
    })
  },
)
