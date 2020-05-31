import { CreateUserRequestModel, CreateUserResponseModel, GetUserResponseModel } from './models'
import { User } from '../entity/user'

export const mapCreateUserRequestToUser = async (
    request: CreateUserRequestModel,
    hashPassword: (password: string) => Promise<string>): Promise<User> => {
        const user = new User()
        user.firstName = request.firstName
        user.lastName = request.lastName
        user.email = request.email
        user.passwordHash = await hashPassword(request.password)
        user.userName = request.userName
        user.roleId = request.roleId
        return user
}

export const mapUserToCreateUserResponse = async (user: User): Promise<CreateUserResponseModel> => {
    return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        roleId: user.roleId
    }
}

export const mapUserToGetUserResponse = async (user: User): Promise<GetUserResponseModel> => {
    return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        roleId: user.roleId
    }
}