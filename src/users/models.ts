import { IsNotEmpty, IsString, MaxLength, IsEmail, IsInt } from 'class-validator'
import { IsUserNameAlreadyInUse, IsUserEmailAlreadyInUse } from './validation'

interface ICreateUserRequestModel {
    firstName: string
    lastName: string
    userName: string
    email: string
    roleId: number
    password: string
}

interface ICreateUserResponseModel {
    id: number
    firstName: string
    lastName: string
    userName: string
    roleId: number
    email: string
}

interface IGetUserResponseModel {
    id: number
    firstName: string
    lastName: string
    userName: string
    roleId: number
    email: string
}

export class CreateUserRequestModel implements ICreateUserRequestModel {
    constructor(model: ICreateUserRequestModel) {
        if (model) {
            this.firstName = model.firstName
            this.lastName = model.lastName
            this.userName = model.userName
            this.email = model.email
            this.roleId = model.roleId
            this.password = model.password
        }
    }

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    firstName: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    lastName: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @IsUserNameAlreadyInUse()
    userName: string

    @IsNotEmpty()
    @IsEmail()
    @IsUserEmailAlreadyInUse()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsInt()
    roleId: number
}

export { ICreateUserRequestModel, ICreateUserResponseModel, IGetUserResponseModel }