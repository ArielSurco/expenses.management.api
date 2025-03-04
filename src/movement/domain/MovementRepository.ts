import { type Movement } from './Movement'

export interface MonthlySummary {
  budget: number
  currency_id: string
  expenses: number
  incomes: number
  month: number
  year: number
}

export interface MovementRepository {
  delete: (movementId: string) => Promise<void>
  getById: (movementId: string) => Promise<Movement>
  getByUser: (userId: string) => Promise<Movement[]>
  getMonthlySummariesByUser: (userId: string) => Promise<MonthlySummary[]>
  save: (movement: Movement) => Promise<void>
}
