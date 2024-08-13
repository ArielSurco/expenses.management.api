import { z } from 'zod'

import { Controller } from '../../shared/utils/Controller'
import { decodeAuthToken } from '../../shared/utils/decodeAuthToken'
import { userRepository } from '../../user/repositories'
import { Category } from '../domain/Category'
import { categoryRepository } from '../repositories'

export const createCategoryBodySchema = z.object({
  name: z.string(),
})

type CreateCategoryBody = z.infer<typeof createCategoryBodySchema>

interface Response {
  message: string
}

export const createCategory = Controller<never, CreateCategoryBody, Response>(async (req, res) => {
  const { name } = req.body
  const { id } = decodeAuthToken(req.header('Authorization'))

  const foundUser = await userRepository.findById(id)

  // If the user is not found, is created as default
  const newCategory = new Category({ name, user: foundUser })

  await categoryRepository.save(newCategory)

  res.status(201).json({ message: 'Category created' })
})
