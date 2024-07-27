export interface Constructor {
  email: string
  password: string
  username: string
}

export class User {
  createdAt: string
  deletedAt: string
  email: string
  id: string
  isActive: boolean
  password: string
  updatedAt: string
  username: string

  constructor({ username, password, email }: Constructor) {
    this.id = ''
    this.username = username
    this.password = password
    this.email = email
    this.isActive = true
    this.createdAt = new Date().toISOString()
    this.updatedAt = new Date().toISOString()
    this.deletedAt = ''
  }
}
