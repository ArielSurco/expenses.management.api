import { type Category } from './Category'

export interface CategoryRepository {
  delete: (categoryId: string) => Promise<void>
  // Should include the default/global categories
  findByUser: (userId: string) => Promise<Category[]>
  save: (category: Category) => Promise<void>
}
