import { Controller } from '../../shared/utils/Controller'
import { decodeAuthToken } from '../../shared/utils/decodeAuthToken'
import { type Movement } from '../domain/Movement'
import { movementRepository } from '../repositories'

type Response = Movement[]

export const getMovements = Controller<never, never, Response>(async (req, res) => {
  const { id } = decodeAuthToken(req.header('Authorization'))

  const movements = await movementRepository.getByUser(id)

  res.status(200).json(movements)
})
