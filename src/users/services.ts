import { ICreateUserRequestModel, IUserResponseModel } from './models'
import { User } from '../entity/user'
import { ValidationError } from 'class-validator'
import { makeResponseModel, ResponseModel } from '../models'

export const create = async (
    request : ICreateUserRequestModel,
    validateRequest: (request: ICreateUserRequestModel) => Promise<ValidationError[]>,
    hashPassword: (password: string) => Promise<string>,
    mapRequestToUser: (req: ICreateUserRequestModel, hashPassword: (password: string) => Promise<string>) => Promise<User>,
    saveUser: (user: User) => Promise<User>,
    mapUserToResponse: (user: User) => Promise<IUserResponseModel>): Promise<ResponseModel<IUserResponseModel>> => {
        return makeResponseModel(await validateRequest(request), async () => {
            var user = await mapRequestToUser(request, hashPassword)
            user = await saveUser(user)
            return await mapUserToResponse(user)
        })
}

export const getAll = async (
    page: number,
    getUsers: (page: number) => Promise<User[]>,
    mapUserToResponse: (user: User) => Promise<IUserResponseModel>): Promise<IUserResponseModel[]> => {
        const users = await getUsers(page)
        const response = users.map(async (user) => await mapUserToResponse(user))
        return Promise.all(response)
}

export const get = async (
    id: number,
    getUser: (id: number) => Promise<User>,
    mapUserToResponse: (user: User) => Promise<IUserResponseModel>): Promise<IUserResponseModel> => {
        const user = await getUser(id)
        return await mapUserToResponse(user)
}

export const authorize = async (
    userName: string,
    password: string,
    roleId: number,
    authorizeUser: (userName: string, password: string) => Promise<User>): Promise<boolean> => {
        const user = await authorizeUser(userName, password)
        if (user && user.roleId <= roleId) return true;
        else return false;
}