import { User } from './entity/user'
import { getConnection, Connection, InsertResult } from 'typeorm'
import bcrypt from 'bcrypt'
import { PAGE_SIZE, SALT_ROUNDS } from './env'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

const skip = (page: number): number => {
    if (page) {
        return (page - 1) * PAGE_SIZE
    } else {
        return 0;
    }
}

export const saveUser = async (user: User): Promise<User> => {
    return await getConnection().getRepository(User).save(user)
}

export const getUsers = async (page: number): Promise<User[]> => {
    return await getConnection().getRepository(User).find({ take: PAGE_SIZE, skip: skip(page) })
}

export const getUser = async (id: number): Promise<User> => {
    return await getConnection().getRepository(User).findOne(id)
}

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, SALT_ROUNDS)
}

export const authorizeUser = async (userName: string, password: string): Promise<User> => {
    const user = await getConnection().getRepository(User).findOne({ where: { userName: userName, isActive: true } })
    if (user && await bcrypt.compare(password, user.passwordHash)) return user
}

export const insertInto = async <T>(
    connection: Connection,
    entity: (new () => T),
    values: QueryDeepPartialEntity<T> | QueryDeepPartialEntity<T>[]): Promise<InsertResult> => {
        return await connection
            .createQueryBuilder()
            .insert()
            .into(entity)
            .values(values)
            .execute()
}