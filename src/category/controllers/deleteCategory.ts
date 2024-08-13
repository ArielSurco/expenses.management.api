import { z } from 'zod'

import { ResponseError } from '../../server/ResponseError'
import { type PathParams } from '../../shared/types/PathParams'
import { Controller } from '../../shared/utils/Controller'
import { decodeAuthToken } from '../../shared/utils/decodeAuthToken'
import { categoryRepository } from '../repositories'

export const deleteCategoryParamsSchema = z.object({
  id: z.string(),
})

interface Response {
  message: string
}

export const deleteCategory = Controller<PathParams<'id'>, never, Response>(async (req, res) => {
  const { id: userId } = decodeAuthToken(req.header('Authorization'))
  const { id: categoryId } = req.params

  const foundCategory = await categoryRepository.findById(categoryId)

  if (!foundCategory) {
    throw new ResponseError(404, 'Category not found')
  }

  // It's default or another user's category
  if (!foundCategory.user || foundCategory.user.id !== userId) {
    throw new ResponseError(403, 'You do not have permission to delete this category')
  }

  await categoryRepository.delete(categoryId)

  res.status(200).json({ message: 'Category deleted' })
})
