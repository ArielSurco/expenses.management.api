/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import { type RouterHandler } from '../server/routes'
import { ValidateSchema } from '../shared/middlewares/ValidateSchema'

import { createCategory, createCategoryBodySchema } from './controllers/createCategory'
import { deleteCategory, deleteCategoryParamsSchema } from './controllers/deleteCategory'
import { getCategories } from './controllers/getCategories'
import {
  updateCategory,
  updateCategoryBodySchema,
  updateCategoryParamsSchema,
} from './controllers/updateCategory'

const router = Router()

router.get('/', getCategories)

router.post('/', ValidateSchema(createCategoryBodySchema, 'body'), createCategory)

router.patch(
  '/:id',
  ValidateSchema(updateCategoryParamsSchema, 'params'),
  ValidateSchema(updateCategoryBodySchema, 'body'),
  updateCategory,
)

router.delete('/:id', ValidateSchema(deleteCategoryParamsSchema, 'params'), deleteCategory)

export const categoryRouter: RouterHandler = {
  basePath: '/category',
  router,
}
