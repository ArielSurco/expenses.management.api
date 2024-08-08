import jwt from 'jsonwebtoken'

import { ENV } from '../constants/env'

interface JWTPayload {
  id: string
}

export const decodeAuthToken = (authorizationHeader = '') => {
  try {
    const token = authorizationHeader.replace('Bearer ', '')

    return jwt.verify(token, ENV.JWT_SECRET) as JWTPayload
  } catch (_error) {
    // Returns an empty id to avoid having to check for null values on each destructuring
    return { id: '' }
  }
}
