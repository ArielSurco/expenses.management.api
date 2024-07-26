import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  PORT: process.env.PORT ?? 3000,
  NODE_ENV: process.env.NODE_ENV ?? 'development',
} as const satisfies Record<string, string | number>;