import { User } from './entity/user'
import { getConnection } from 'typeorm'
import bcrypt from 'bcrypt'

const saltRounds = process.env.NODE_ENV == 'production' ? 12 : 0

export const saveUser = async (user: User): Promise<User> => {
    return await  getConnection().getRepository(User).save(user)
}

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, saltRounds)
}