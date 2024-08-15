import { z } from 'zod'

import { ResponseError } from '../../server/ResponseError'
import { type PathParams } from '../../shared/types/PathParams'
import { Controller } from '../../shared/utils/Controller'
import { decodeAuthToken } from '../../shared/utils/decodeAuthToken'
import { movementRepository } from '../repositories'

export const deleteMovementParamsSchema = z.object({
  id: z.string(),
})

interface Response {
  message: string
}

export const deleteMovement = Controller<PathParams<'id'>, never, Response>(async (req, res) => {
  const { id: userId } = decodeAuthToken(req.header('Authorization'))
  const { id: movementId } = req.params

  const foundMovement = await movementRepository.getById(movementId)

  if (!foundMovement.isOwner(userId)) {
    throw new ResponseError(403, 'Forbidden')
  }

  await movementRepository.delete(movementId)

  res.status(200).json({ message: 'Movement deleted' })
})
