 import { DataSource } from "typeorm";

import { Category } from "../category/domain/Category";
import { Currency } from "../currency/domain/Currency";
import { ENV } from "../shared/constants/env";
import { User } from "../user/domain/User";

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: ENV.DB_HOST,
  port: Number(ENV.DB_PORT),
  username: ENV.DB_USERNAME,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
  entities: [User, Currency, Category],
  synchronize: true,
  logging: false
})
