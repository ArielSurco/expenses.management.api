import { type Movement } from '../domain/Movement'
import { MonthlySummary, type MovementRepository } from '../domain/MovementRepository'

const movements: Movement[] = []

const deleteMovement: MovementRepository['delete'] = async (movementId) => {
  const index = movements.findIndex((m) => m.id === movementId)

  if (index === -1) {
    throw new Error('Movement not found')
  }

  movements.splice(index, 1)

  return Promise.resolve()
}

const getById: MovementRepository['getById'] = async (movementId) => {
  const movement = movements.find((m) => m.id === movementId)

  if (!movement) {
    throw new Error('Movement not found')
  }

  return Promise.resolve(movement)
}

const getByUser: MovementRepository['getByUser'] = async (userId) => {
  const userMovements = movements.filter((m) => m.account.user?.id === userId)

  return Promise.resolve(userMovements)
}

const save: MovementRepository['save'] = async (movement) => {
  const movementIndex = movements.findIndex((m) => m.id === movement.id)

  if (movementIndex !== -1) {
    movements.splice(movementIndex, 1, movement)
  } else {
    movements.push(movement)
  }

  return Promise.resolve()
}

const getMonthlySummariesByUser: MovementRepository['getMonthlySummariesByUser'] = async (
  userId,
) => {
  const monthlySummaries: MonthlySummary = {
    budget: 0,
    currency_id: '',
    expenses: 0,
    incomes: 0,
    month: 0,
    year: 0,
  }

  return Promise.resolve([monthlySummaries])
}

export const mockMovementRepository: MovementRepository = {
  delete: deleteMovement,
  getById,
  getByUser,
  getMonthlySummariesByUser,
  save,
}
