import { type Category } from '../domain/Category'
import { type CategoryRepository } from '../domain/CategoryRepository'

const categories: Category[] = []

const save: CategoryRepository['save'] = async (category) => {
  const foundCategoryIndex = categories.findIndex((c) => c.id === category.id)

  if (foundCategoryIndex === -1) {
    categories.push(category)
  } else {
    categories[foundCategoryIndex] = category
  }

  return Promise.resolve()
}

const deleteCategory: CategoryRepository['delete'] = async (categoryId) => {
  const foundCategoryIndex = categories.findIndex((c) => c.id === categoryId)

  if (foundCategoryIndex === -1) {
    throw new Error('Category does not exist')
  }

  categories.splice(foundCategoryIndex, 1)

  return Promise.resolve()
}

const findById: CategoryRepository['findById'] = async (categoryId) => {
  const foundCategory = categories.find((c) => c.id === categoryId)

  return Promise.resolve(foundCategory ?? null)
}

const findByUser: CategoryRepository['findByUser'] = async (userId) => {
  // Include the default (without user) categories
  const userCategories = categories.filter((c) => !c.user || c.user.id === userId)

  return Promise.resolve(userCategories)
}

export const mockCategoryRepository: CategoryRepository = {
  save,
  delete: deleteCategory,
  findById,
  findByUser,
}
