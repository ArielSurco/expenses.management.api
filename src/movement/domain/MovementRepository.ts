import { type Movement } from './Movement'

export interface MovementRepository {
  delete: (movementId: string) => Promise<void>
  getById: (movementId: string) => Promise<Movement>
  getByUser: (userId: string) => Promise<Movement[]>
  save: (movement: Movement) => Promise<void>
}
