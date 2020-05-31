import { CreateUserRequestModel, IUserResponseModel } from './models'
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
        user.birthDate = request.birthDate
        user.height = request.height
        user.weigth = request.weigth
        user.isActive = request.isActive
        return user
}

export const mapUserToUserResponse = async (user: User): Promise<IUserResponseModel> => {
    return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        roleId: user.roleId,
        birthDate: user.birthDate,
        height: user.height,
        weigth: user.weigth,
        isActive: user.isActive
    }
}