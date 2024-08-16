import { Category } from '../category/domain/Category'

import { userAlejandro, userJose, userMaria } from './users'

export const foodCategory = new Category({ name: 'Food' })
export const marketCategory = new Category({ name: 'Market' })
export const familyCategory = new Category({ name: 'Family', user: userAlejandro })
export const petsCategory = new Category({ name: 'Pets', user: userJose })
export const travelCategory = new Category({ name: 'Travel', user: userMaria })
