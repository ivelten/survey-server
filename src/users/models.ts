import { IsNotEmpty, IsString, MaxLength, IsEmail, IsInt, IsISO8601, Min, IsBoolean } from 'class-validator'
import { IsUserNameAlreadyInUse, IsUserEmailAlreadyInUse } from './validation'

interface ICreateUserRequestModel {
    firstName: string
    lastName: string
    userName: string
    email: string
    roleId: number
    birthDate: Date
    height: number
    weigth: number
    password: string
    isActive: boolean
}

interface IUserResponseModel {
    firstName: string
    lastName: string
    userName: string
    roleId: number
    birthDate: Date
    height: number
    weigth: number
    email: string
    isActive: boolean
}

class CreateUserRequestModel implements ICreateUserRequestModel {
    constructor(model: ICreateUserRequestModel) {
        if (model) {
            this.firstName = model.firstName
            this.lastName = model.lastName
            this.userName = model.userName
            this.email = model.email
            this.roleId = model.roleId
            this.password = model.password
            this.birthDate = model.birthDate
            this.height = model.height
            this.weigth = model.weigth
            this.isActive = model.isActive
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
    @IsISO8601({ strict: true })
    birthDate: Date

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    height: number

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    weigth: number

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsInt()
    roleId: number

    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean
}

export { ICreateUserRequestModel, IUserResponseModel, CreateUserRequestModel }