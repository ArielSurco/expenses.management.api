import { type Currency } from '../../currency/domain/Currency'
import { currencyRepository } from '../../currency/repositories'
import { Controller } from '../../shared/utils/Controller'
import { decodeAuthToken } from '../../shared/utils/decodeAuthToken'
import { movementRepository } from '../repositories'

interface MonthlyAmounts {
  budget: number
  currency: Currency | null
  expenses: number
  incomes: number
  month: number
  year: number
}

type Response = MonthlyAmounts[]

export const getMovementsSummary = Controller<never, never, Response>(async (req, res) => {
  const { id: userId } = decodeAuthToken(req.header('Authorization'))

  const monthlySummaries = await movementRepository.getMonthlySummariesByUser(userId)

  const currencyIds = Array.from(new Set(monthlySummaries.map((summary) => summary.currency_id)))

  const currencies = await Promise.all(
    currencyIds.map((currencyId) => currencyRepository.findById(currencyId)),
  )

  const currencyMap = new Map(currencies.map((currency) => [currency?.id, currency]))

  const response = monthlySummaries.map((summary) => ({
    budget: summary.budget,
    currency: currencyMap.get(summary.currency_id) ?? null,
    expenses: summary.expenses,
    incomes: summary.incomes,
    month: summary.month,
    year: summary.year,
  }))

  res.status(200).json(response)
})
