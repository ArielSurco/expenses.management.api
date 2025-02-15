import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'

import { generateUUID } from '../../shared/utils/generateUUID'
import { User } from '../../user/domain/User'

interface Constructor {
  name: string
  user?: User | null
}

@Entity()
export class Category {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user?: User | null

  constructor(params?: Constructor) {
    this.id = generateUUID()
    this.name = params?.name ?? ''
    this.user = params?.user ?? null
  }
}
