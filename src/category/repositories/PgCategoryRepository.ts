import { IsNull } from 'typeorm'

import { AppDataSource } from '../../db/app-source'
import { Category } from '../domain/Category'
import { type CategoryRepository } from '../domain/CategoryRepository'

const appCategoryRepository = AppDataSource.getRepository(Category)

const save: CategoryRepository['save'] = async (category) => {
  await appCategoryRepository.save(category)
}

const deleteCategory: CategoryRepository['delete'] = async (categoryId) => {
  await appCategoryRepository.delete(categoryId)
}

const findById: CategoryRepository['findById'] = async (categoryId) => {
  const foundCategory = await appCategoryRepository.findOneBy({ id: categoryId })

  return foundCategory ?? null
}

const findByUser: CategoryRepository['findByUser'] = async (userId) => {
  // Include the default (without user) categories
  const userCategories = await appCategoryRepository.find({
    where: [
      {
        user: {
          id: userId
        },
      },
      {
        user: IsNull()
      },
    ],
  })

  return userCategories
}

export const pgCategoryRepository: CategoryRepository = {
  save,
  delete: deleteCategory,
  findById,
  findByUser,
}
