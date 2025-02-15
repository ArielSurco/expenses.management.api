import { Column, Entity, PrimaryColumn } from 'typeorm'

import { generateUUID } from '../../shared/utils/generateUUID'

interface Constructor {
  name: string
  symbol: string
}

@Entity()
export class Currency {
  @PrimaryColumn()
  id: string

  @Column({ unique: true })
  name: string

  @Column({ unique: true })
  symbol: string

  constructor(params?: Constructor) {
    this.id = generateUUID()
    this.name = params?.name ?? ''
    this.symbol = params?.symbol ?? ''
  }
}
