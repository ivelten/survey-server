import { CreateUserRequestModel, CreateUserResponseModel, GetUserResponseModel } from './models'
import { User } from '../entity/user'

export const create = async (
    request : CreateUserRequestModel,
    hashPassword: (password: string) => Promise<string>,
    mapRequestToUser: (req: CreateUserRequestModel, hashPassword: (password: string) => Promise<string>) => Promise<User>,
    saveUser: (user: User) => Promise<User>,
    mapUserToResponse: (user: User) => Promise<CreateUserResponseModel>): Promise<CreateUserResponseModel> => {
        var user = await mapRequestToUser(request, hashPassword)
        user = await saveUser(user)
        return await mapUserToResponse(user)
}

export const getAll = async (
    page: number,
    getUsers: (page: number) => Promise<User[]>,
    mapUserToResponse: (user: User) => Promise<GetUserResponseModel>): Promise<GetUserResponseModel[]> => {
        const users = await getUsers(page)
        const response = users.map(async (user) => await mapUserToResponse(user))
        return Promise.all(response)
}