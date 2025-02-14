 import { DataSource } from "typeorm";

import { ENV } from "../shared/constants/env";

const AppDataSource = new DataSource({
  type: 'postgres',
  host: ENV.DB_HOST,
  port: Number(ENV.DB_PORT),
  username: ENV.DB_USERNAME,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
  entities: [],
  synchronize: true,
  logging: false
})

export default AppDataSource