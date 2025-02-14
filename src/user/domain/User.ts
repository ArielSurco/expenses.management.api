import { Column, Entity, PrimaryColumn } from 'typeorm'

import { generateUUID } from '../../shared/utils/generateUUID'

export interface Constructor {
  email: string
  password: string
  username: string
}

@Entity()
export class User {
  @Column({ type: 'timestamp' })
  createdAt: string

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: string | null

  @Column()
  email: string

  @PrimaryColumn()
  id: string

  @Column({ type: 'boolean' })
  isActive: boolean

  @Column()
  password: string

  @Column({ type: 'timestamp' })
  updatedAt: string

  @Column()
  username: string

  constructor(params?: Constructor) {
    const now = new Date().toISOString()
    
    this.id = generateUUID()
    this.username = params?.username ?? ''
    this.password = params?.password ?? ''
    this.email = params?.email ?? ''
    this.isActive = true
    this.createdAt = now
    this.updatedAt = now
    this.deletedAt = null
  }
}
