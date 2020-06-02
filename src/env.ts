import * as dotenv from 'dotenv'

dotenv.config();

if (!process.env.PORT) {
    process.exit(1)
}

if (!process.env.SALT_ROUNDS) {
    process.exit(2)
}

if (!process.env.PAGE_SIZE) {
    process.exit(3)
}

export const PORT: number = parseInt(process.env.PORT as string, 10)
export const SALT_ROUNDS: number = parseInt(process.env.SALT_ROUNDS as string, 10)
export const PAGE_SIZE: number = parseInt(process.env.PAGE_SIZE as string, 10)