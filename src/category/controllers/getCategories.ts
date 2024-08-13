import { Controller } from '../../shared/utils/Controller'
import { decodeAuthToken } from '../../shared/utils/decodeAuthToken'
import { categoryRepository } from '../repositories'

interface ResponseCategory {
  id: string
  isDefault: boolean
  name: string
}

type Response = ResponseCategory[]

export const getCategories = Controller<never, never, Response>(async (req, res) => {
  const { id } = decodeAuthToken(req.header('Authorization'))

  const categories = await categoryRepository.findByUser(id)

  const responseCategories = categories.map((category) => ({
    id: category.id,
    isDefault: !category.user,
    name: category.name,
  }))

  res.status(200).json(responseCategories)
})
