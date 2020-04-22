import { CreateUserRequestModel, CreateUserResponseModel } from './users.models'
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