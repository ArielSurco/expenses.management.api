import { type Category } from './Category'

export interface CategoryRepository {
  delete: (categoryId: string) => Promise<void>
  findById: (categoryId: string) => Promise<Category | null>
  // Should include the default/global categories
  findByUser: (userId: string) => Promise<Category[]>
  save: (category: Category) => Promise<void>
}
