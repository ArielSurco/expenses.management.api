import { type AccountRepository } from '../domain/AccountRepository'

import { pgAccountRepository } from './PgAccountRepository'

export const accountRepository: AccountRepository = pgAccountRepository
