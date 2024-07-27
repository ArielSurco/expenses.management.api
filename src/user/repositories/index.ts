import type { UserRepository } from '../domain/UserRepository'

import { mockUserRepository } from './MockUserRepository'

export const userRepository: UserRepository = mockUserRepository
