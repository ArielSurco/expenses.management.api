import { type Currency } from '../../currency/domain/Currency'
import { Controller } from '../../shared/utils/Controller'
// import { decodeAuthToken } from '../../shared/utils/decodeAuthToken'
// import { movementRepository } from '../repositories'

interface MonthlyAmounts {
  budget: number
  currency: Currency
  expenses: number
  incomes: number
  month: number
  year: number
}

type Response = MonthlyAmounts[]

export const getMovementsSummary = Controller<never, never, Response>(async (req, res) => {
  // const { id: userId } = decodeAuthToken(req.header('Authorization'))

  // const movements = await movementRepository.getByUser(userId)

  const currentMonth: MonthlyAmounts = {
    budget: 0,
    currency: {
      id: '1',
      name: 'Peso Argentino',
      symbol: 'AR$',
    },
    expenses: 0,
    incomes: 0,
    month: 1,
    year: 2025,
  }

  const lastMonth: MonthlyAmounts = {
    budget: 0,
    currency: {
      id: '1',
      name: 'Peso Argentino',
      symbol: 'AR$',
    },
    expenses: 0,
    incomes: 0,
    month: 0,
    year: 2025,
  }

  res.status(200).json([currentMonth, lastMonth])
})
