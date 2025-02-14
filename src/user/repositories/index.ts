import type { UserRepository } from '../domain/UserRepository'

import { pgUserRepository } from './PgUserRepository'

export const userRepository: UserRepository = pgUserRepository
