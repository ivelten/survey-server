import { IsNotEmpty, IsInt, Min } from 'class-validator'

interface ICreateFormRequestModel {
    version: number
}

class CreateFormRequestModel implements ICreateFormRequestModel {
    constructor(model: ICreateFormRequestModel) {
        if (model) {
            this.version = model.version
        }
    }

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    version: number
}



interface IFormResponseModel {
    id: number
    creationDate: Date
    version: number
    userId: number
}

export { ICreateFormRequestModel, CreateFormRequestModel, IFormResponseModel }