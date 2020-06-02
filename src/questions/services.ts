import { ValidationError } from 'class-validator'
import { ResponseModel, makeResponseModel } from '../models'
import { ICreateQuestionRequestModel, IQuestionResponseModel } from './models'
import { Question } from '../entity/question'

export const create = async (
    request: ICreateQuestionRequestModel,
    validateRequest: (request: ICreateQuestionRequestModel) => Promise<ValidationError[]>,
    mapRequestToQuestion: (req: ICreateQuestionRequestModel) => Promise<Question>,
    saveQuestion: (question: Question) => Promise<Question>,
    mapQuestionToResponse: (question: Question) => Promise<IQuestionResponseModel>): Promise<ResponseModel<IQuestionResponseModel>> => {
        return makeResponseModel(await validateRequest(request), async () => {
            var question = await mapRequestToQuestion(request)
            question = await saveQuestion(question)
            return await mapQuestionToResponse(question)
        })
}

export const getAll = async (
    page: number,
    getQuestions: (page: number) => Promise<Question[]>,
    mapQuestionToResponse: (question: Question) => Promise<IQuestionResponseModel>): Promise<IQuestionResponseModel[]> => {
        const questions = await getQuestions(page)
        const response = questions?.map(async (question) => await mapQuestionToResponse(question))
        return Promise.all(response)
}

export const get = async (
    id: number,
    getQuestion: (id: number) => Promise<Question>,
    mapQuestionToResponse: (question: Question) => Promise<IQuestionResponseModel>): Promise<IQuestionResponseModel> => {
        const question = await getQuestion(id)
        return await mapQuestionToResponse(question)
}