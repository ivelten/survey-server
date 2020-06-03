import { ICreateQuestionRequestModel, CreateQuestionRequestModel, IAnswerQuestionRequestModel, AnswerQuestionRequestModel } from './models'
import { validate, ValidationError } from 'class-validator'

export const validateCreateQuestionRequestModel = async (model: ICreateQuestionRequestModel): Promise<ValidationError[]> => {
    return await validate(new CreateQuestionRequestModel(model))
}

export const validateAnswerQuestionRequestModel = async (model: IAnswerQuestionRequestModel, userId: number): Promise<ValidationError[]> => {
    return await validate(new AnswerQuestionRequestModel(model, userId))
}