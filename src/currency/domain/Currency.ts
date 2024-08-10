import { generateUUID } from '../../shared/utils/generateUUID'

interface Constructor {
  name: string
  symbol: string
}

export class Currency {
  id: string
  name: string
  symbol: string

  constructor({ name, symbol }: Constructor) {
    this.id = generateUUID()
    this.name = name
    this.symbol = symbol
  }
}
