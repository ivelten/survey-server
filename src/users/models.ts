interface CreateUserRequestModel {
    firstName: string
    lastName: string
    userName: string
    email: string
    roleId: number
    password: string
}

interface CreateUserResponseModel {
    id: number
    firstName: string
    lastName: string
    userName: string
    roleId: number
    email: string
}

interface GetUserResponseModel {
    id: number
    firstName: string
    lastName: string
    userName: string
    roleId: number
    email: string
}

export { CreateUserRequestModel, CreateUserResponseModel, GetUserResponseModel }