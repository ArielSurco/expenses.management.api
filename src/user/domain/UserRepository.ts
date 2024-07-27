import { type User } from './User'

export interface UserRepository {
  findByEmail: (email: string) => Promise<User | null>
  findByUsername: (username: string) => Promise<User | null>
  getAll: () => Promise<User[]>
  save: (user: User) => Promise<void>
}
