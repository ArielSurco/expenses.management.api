import fs from 'node:fs'
import path from 'node:path'

import { DataSource } from 'typeorm'

import { Account } from '../account/domain/Account'
import { Category } from '../category/domain/Category'
import { Currency } from '../currency/domain/Currency'
import { Movement } from '../movement/domain/Movement'
import { ENV } from '../shared/constants/env'
import { User } from '../user/domain/User'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: ENV.DB_HOST,
  port: Number(ENV.DB_PORT),
  username: ENV.DB_USERNAME,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
  entities: [User, Currency, Category, Account, Movement],
  synchronize: true,
  logging: false,
  ssl: ENV.SSL_CERT_PATH
    ? {
        ca: fs.readFileSync(path.resolve(ENV.SSL_CERT_PATH)).toString(),
      }
    : false,
})
