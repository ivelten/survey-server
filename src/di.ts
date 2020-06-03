import { User } from './entity/user'
import { getConnection, Connection, InsertResult, FindManyOptions } from 'typeorm'
import bcrypt from 'bcrypt'
import { PAGE_SIZE, SALT_ROUNDS } from './env'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { Form } from './entity/form'
import { Question } from './entity/question'
import { Answer } from './entity/answer'
import { FormReport } from './entity/form-report'

const skip = (page: number): number => {
    if (page) {
        return (page - 1) * PAGE_SIZE
    } else {
        return 0
    }
}

export const saveUser = async (user: User): Promise<User> => {
    return await getConnection().getRepository(User).save(user)
}

export const getUsers = async (page: number): Promise<User[]> => {
    return await getConnection().getRepository(User).find({ take: PAGE_SIZE, skip: skip(page) })
}

export const getUser = async (userName: string): Promise<User> => {
    return await getConnection().getRepository(User).findOne({ where: { userName: userName } })
}

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, SALT_ROUNDS)
}

export const authorizeUser = async (userName: string, password: string): Promise<User> => {
    const user = await getConnection().getRepository(User).findOne({ where: { userName: userName, isActive: true } })
    if (user && await bcrypt.compare(password, user.passwordHash)) return user
}

export const getForms = async (page: number): Promise<Form[]> => {
    return await getConnection().getRepository(Form).find({ take: PAGE_SIZE, skip: skip(page) })
}

export const getForm = async (id: number): Promise<Form> => {
    return await getConnection().getRepository(Form).findOne(id)
}

export const getQuestion = async (id: number): Promise<Question> => {
    return await getConnection().getRepository(Question).findOne(id, { relations: ["choices", "choices.recommendations"] })
}

export const saveQuestion = async (question: Question): Promise<Question> => {
    return await getConnection().getRepository(Question).save(question)
}

export const saveForm = async (form: Form): Promise<Form> => {
    return await getConnection().getRepository(Form).save(form)
}

export const saveAnswer = async (answer: Answer): Promise<Answer> => {
    return await getConnection().getRepository(Answer).save(answer)
}

export const getQuestions = async (page: number, formId: number): Promise<Question[]> => {
    const options: FindManyOptions<Question> = {
        take: PAGE_SIZE,
        skip: skip(page),
        relations: [
            "choices",
            "choices.recommendations"
        ]
    }

    if (formId) options.where = { formId: formId }

    const result = await getConnection().getRepository(Question).find(options)

    if (formId && result.length == 0) return null
    
    return result
}

export const getFormReports = async (page: number): Promise<FormReport[]> => {
    return await getConnection().getRepository(FormReport).find({ take: PAGE_SIZE, skip: skip(page) })
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