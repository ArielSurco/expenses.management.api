import dotenv from 'dotenv'

dotenv.config()

export const ENV = {
  PORT: process.env.PORT ?? 3000,
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  JWT_SECRET: process.env.JWT_SECRET ?? '',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '',
  DB_HOST: process.env.DB_HOST ?? '',
  DB_PORT: process.env.DB_PORT ?? '',
  DB_USERNAME: process.env.DB_USERNAME ?? '',
  DB_PASSWORD: process.env.DB_PASSWORD ?? '',
  DB_NAME: process.env.DB_NAME ?? ''
} as const satisfies Record<string, string | number>
