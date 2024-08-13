import { generateUUID } from '../../shared/utils/generateUUID'
import { type User } from '../../user/domain/User'

interface Constructor {
  name: string
  user?: User | null
}

export class Category {
  id: string
  name: string
  user?: User | null

  constructor({ name, user }: Constructor) {
    this.id = generateUUID()
    this.name = name
    this.user = user ?? null
  }
}
