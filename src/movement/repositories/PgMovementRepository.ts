import { AppDataSource } from '../../db/app-source'
import { Movement } from '../domain/Movement'
import { type MovementRepository } from '../domain/MovementRepository'

const appMovementRepository = AppDataSource.getRepository(Movement)

const deleteMovement: MovementRepository['delete'] = async (movementId) => {
  const foundMovement = await appMovementRepository.findOne({ where: { id: movementId } })

  if (!foundMovement) {
    throw new Error('Movement not found')
  }

  await appMovementRepository.remove(foundMovement)
}

const getById: MovementRepository['getById'] = async (movementId) => {
  const foundMovement = await appMovementRepository.findOne({ where: { id: movementId } })

  if (!foundMovement) {
    throw new Error('Movement not found')
  }

  return Promise.resolve(foundMovement)
}

const getByUser: MovementRepository['getByUser'] = async (userId) => {
  const userMovements = await appMovementRepository.find({
    where: { account: { user: { id: userId } } },
    relations: ['category', 'currency', 'account', 'account.user', 'category.user'],
  })

  return Promise.resolve(userMovements)
}

const save: MovementRepository['save'] = async (movement) => {
  await appMovementRepository.save(movement)
}

export const pgMovementRepository: MovementRepository = {
  delete: deleteMovement,
  getById,
  getByUser,
  save,
}
