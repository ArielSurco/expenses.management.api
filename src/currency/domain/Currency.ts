import { generateUUID } from '../../shared/utils/generateUUID'

export class Currency {
  id: string
  name: string
  symbol: string

  constructor({ name, symbol }: Currency) {
    this.id = generateUUID()
    this.name = name
    this.symbol = symbol
  }
}
