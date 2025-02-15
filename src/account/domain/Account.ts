import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

import { Currency } from '../../currency/domain/Currency'
import { generateUUID } from '../../shared/utils/generateUUID'
import { User } from '../../user/domain/User'

import { AccountType } from './AccountType'

interface Constructor {
  availableBalance: number
  currency: Currency | null
  limitCredit?: number
  name: string
  type: AccountType
  user: User | null
}

@Entity()
export class Account {
  @PrimaryColumn()
  id: string

  @Column()
  availableBalance: number

  @Column({ type: 'timestamp' })
  createdAt: string

  @ManyToOne(() => Currency, { nullable: true })
  @JoinColumn({ name: 'currency_id' })
  currency: Currency | null

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: string | null

  @Column()
  expenseUpToDate: number

  @Column()
  isActive: boolean

  @Column({ nullable: true })
  limitCredit?: number

  @Column()
  name: string

  @Column({ enum: AccountType })
  type: AccountType

  @Column({ type: 'timestamp' })
  updatedAt: string

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User | null

  constructor(params?: Constructor) {
    this.id = generateUUID()
    this.availableBalance = params?.availableBalance ?? 0
    this.createdAt = new Date().toISOString()
    this.currency = params?.currency ?? null
    this.deletedAt = null
    this.expenseUpToDate = 0
    this.isActive = true
    this.limitCredit = params?.limitCredit ?? 0
    this.name = params?.name ?? ''
    this.type = params?.type ?? AccountType.CASH
    this.updatedAt = new Date().toISOString()
    this.user = params?.user ?? null
  }

  public deactivate(): void {
    this.isActive = false
    this.deletedAt = new Date().toISOString()
  }

  public expense(value: number): void {
    this.availableBalance -= value
    this.expenseUpToDate += value
  }

  public income(value: number): void {
    this.availableBalance += value
    this.expenseUpToDate -= value
  }

  public isOwner(userId: string): boolean {
    return this.user?.id === userId
  }

  public canSpend(value: number): boolean {
    return this.availableBalance >= value
  }
}
