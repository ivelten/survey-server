interface CreateUserRequestModel {
    firstName: string
    lastName: string
    userName: string
    email: string
    password: string
}

interface CreateUserResponseModel {
    id: number
    firstName: string
    lastName: string
    userName: string
    email: string
}

export { CreateUserRequestModel, CreateUserResponseModel }