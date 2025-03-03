import { Controller } from '../../shared/utils/Controller'
import { decodeAuthToken } from '../../shared/utils/decodeAuthToken'
import { type Movement } from '../domain/Movement'
import { movementRepository } from '../repositories'

type Response = Pick<
  Movement,
  'id' | 'title' | 'value' | 'date' | 'detail' | 'account' | 'category' | 'currency'
>[]

export const getMovements = Controller<never, never, Response>(async (req, res) => {
  const { id } = decodeAuthToken(req.header('Authorization'))

  const movements = await movementRepository.getByUser(id)

  const response = movements.map((movement) => ({
    id: movement.id,
    title: movement.title,
    value: movement.value,
    date: movement.date,
    detail: movement.detail,
    account: movement.account,
    category: movement.category,
    currency: movement.currency,
  }))

  res.status(200).json(response)
})
