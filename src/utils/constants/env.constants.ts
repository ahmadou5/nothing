import dotenv from 'dotenv'
dotenv.config()

export const env = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
  TELEGRAM_HOOK_URL: process.env.TELEGRAM_HOOK_URL,
  SUPERBASE_URL: process.env.SUPERBASE_URL,
  SUPERBASE_KEY: process.env.SUPERBASE_KEY,
}
