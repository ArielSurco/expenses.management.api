import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

import { Account } from '../../account/domain/Account'
import { Category } from '../../category/domain/Category'
import { Currency } from '../../currency/domain/Currency'
import { generateUUID } from '../../shared/utils/generateUUID'

interface Constructor {
  account: Account
  category: Category | null
  currency: Currency | null
  date: string
  detail: string
  title: string
  value: number
}

@Entity()
export class Movement {
  @ManyToOne(() => Account)
  @JoinColumn({ name: 'account_id' })
  account: Account

  @Column()
  remainingBalance: number

  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category: Category | null

  @ManyToOne(() => Currency, { nullable: true })
  @JoinColumn({ name: 'currency_id' })
  currency: Currency | null

  @Column({ type: 'timestamp' })
  date: string

  @Column()
  detail: string

  @PrimaryColumn()
  id: string

  @Column()
  title: string

  @Column()
  value: number

  constructor(params?: Constructor) {
    this.account = params?.account ?? new Account()
    // We're assuming that the balance was already updated with the value of the movement
    this.remainingBalance = params?.account.availableBalance ?? 0
    this.category = params?.category ?? null
    this.currency = params?.currency ?? null
    this.date = params?.date ?? new Date().toISOString()
    this.detail = params?.detail ?? ''
    this.id = generateUUID()
    this.title = params?.title ?? ''
    this.value = params?.value ?? 0
  }

  public isOwner(userId: string): boolean {
    return this.account.user?.id === userId
  }
}
