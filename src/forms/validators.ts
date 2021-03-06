import { ICreateFormRequestModel, CreateFormRequestModel } from './models'
import { validate, ValidationError } from 'class-validator'

export const validateCreateFormRequestModel = async (model: ICreateFormRequestModel, userId: number): Promise<ValidationError[]> => {
    return await validate(new CreateFormRequestModel(model, userId))
}