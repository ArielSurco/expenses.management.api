export class Currency {
  name: string
  symbol: string

  constructor({ name, symbol }: Currency) {
    this.name = name
    this.symbol = symbol
  }
}
