import type { Account } from './Account'

export interface AccountRepository {
  create: (account: Account) => Promise<void>
  delete: (account: Account) => Promise<void>
  find: (id: string) => Promise<Account | null>
  findByUser: (userId: string) => Promise<Account[]>
  update: (account: Account) => Promise<void>
}
