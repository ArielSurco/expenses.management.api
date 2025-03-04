import dayjs from 'dayjs'

import { AppDataSource } from '../../db/app-source'
import { Movement } from '../domain/Movement'
import { type MonthlySummary, type MovementRepository } from '../domain/MovementRepository'

interface PgMonthlySummary extends Omit<MonthlySummary, 'expenses' | 'incomes'> {
  expenses: string
  incomes: string
}

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

const getMonthlySummariesByUser: MovementRepository['getMonthlySummariesByUser'] = async (
  userId,
) => {
  const queryBuilder = appMovementRepository
    .createQueryBuilder('m')
    .select('0', 'budget')
    .addSelect('currency.id', 'currency_id')
    .addSelect(
      `CAST(SUM(CASE WHEN m.value >= 0 THEN m.value ELSE 0 END) AS DECIMAL(10,2))`,
      'expenses',
    )
    .addSelect(
      `CAST(SUM(CASE WHEN m.value < 0 THEN m.value * -1 ELSE 0 END) AS DECIMAL(10,2))`,
      'incomes',
    )
    .addSelect(`DATE_PART('month', m.date)`, 'month')
    .addSelect(`DATE_PART('year', m.date)`, 'year')
    .innerJoin('m.currency', 'currency')
    .innerJoin('m.account', 'account')
    .innerJoin('account.user', 'user')
    .where('user.id = :userId', { userId })
    .andWhere('m.date >= :date', {
      date: dayjs().subtract(1, 'year').toISOString(),
    })
    .groupBy('currency.id')
    .addGroupBy(`DATE_PART('month', m.date)`)
    .addGroupBy(`DATE_PART('year', m.date)`)
    .orderBy('5', 'ASC')
    .addOrderBy('6', 'ASC')

  const rawMovements = await queryBuilder.getRawMany<PgMonthlySummary>()

  const monthlyMovements = rawMovements.map((movement) => ({
    ...movement,
    expenses: Number(movement.expenses),
    incomes: Number(movement.incomes),
  }))

  return Promise.resolve(monthlyMovements)
}

const save: MovementRepository['save'] = async (movement) => {
  await appMovementRepository.save(movement)
}

export const pgMovementRepository: MovementRepository = {
  delete: deleteMovement,
  getById,
  getByUser,
  getMonthlySummariesByUser,
  save,
}
