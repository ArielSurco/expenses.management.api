import { z } from 'zod'

import { ResponseError } from '../../server/ResponseError'
import { type PathParams } from '../../shared/types/PathParams'
import { Controller } from '../../shared/utils/Controller'
import { decodeAuthToken } from '../../shared/utils/decodeAuthToken'
import { categoryRepository } from '../repositories'

export const updateCategoryParamsSchema = z.object({
  id: z.string(),
})

export const updateCategoryBodySchema = z.object({
  name: z.string(),
})

type UpdateCategoryBody = z.infer<typeof updateCategoryBodySchema>

interface Response {
  message: string
}

export const updateCategory = Controller<PathParams<'id'>, UpdateCategoryBody, Response>(
  async (req, res) => {
    const { name } = req.body
    const { id: categoryId } = req.params
    const { id: userId } = decodeAuthToken(req.header('Authorization'))

    const foundCategory = await categoryRepository.findById(categoryId)

    if (!foundCategory) {
      throw new ResponseError(404, 'Category not found')
    }

    if (foundCategory.user?.id !== userId) {
      throw new ResponseError(403, 'You do not have permission to update this category')
    }

    // Currently we just allow to update the name
    foundCategory.name = name
    await categoryRepository.save(foundCategory)

    res.status(200).json({ message: 'Category updated' })
  },
)
