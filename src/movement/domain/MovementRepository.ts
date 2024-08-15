import { type Movement } from './Movement'

export interface MovementRepository {
  delete: (movement: Movement) => Promise<void>
  getByUser: (userId: string) => Promise<Movement[]>
  save: (movement: Movement) => Promise<void>
}
