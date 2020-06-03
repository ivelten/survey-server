import { IsNotEmpty, IsInt, Min, IsString, MaxLength } from 'class-validator'

interface ICreateFormRequestModel {
    version: number
    description: string
}

class CreateFormRequestModel implements ICreateFormRequestModel {
    constructor(model: ICreateFormRequestModel, userId: number) {
        if (model && userId) {
            this.version = model.version
            this.description = model.description
            this.userId = userId
        }
    }

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    version: number

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    description: string

    userId: number
}



interface IFormResponseModel {
    id: number
    creationDate: Date
    version: number
    userId: number
    description: string
}

export { ICreateFormRequestModel, CreateFormRequestModel, IFormResponseModel }