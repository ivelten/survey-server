import { ICreateQuestionRequestModel, CreateQuestionRequestModel } from './models'
import { validate, ValidationError } from 'class-validator'

export const validateCreateQuestionRequestModel = async (model: ICreateQuestionRequestModel): Promise<ValidationError[]> => {
    return await validate(new CreateQuestionRequestModel(model))
}