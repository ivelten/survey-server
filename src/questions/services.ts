import { ValidationError } from 'class-validator'
import { ResponseModel, makeResponseModel } from '../models'
import { ICreateQuestionRequestModel, IQuestionResponseModel, IAnswerQuestionRequestModel, IAnswerQuestionResponseModel } from './models'
import { Question } from '../entity/question'
import { Answer } from '../entity/answer'

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

export const answer = async (
    request: IAnswerQuestionRequestModel,
    userId: number,
    validateRequest: (request: IAnswerQuestionRequestModel, userId: number) => Promise<ValidationError[]>,
    mapRequestToAnswer: (req: IAnswerQuestionRequestModel, userId: number) => Promise<Answer>,
    saveAnswer: (answer: Answer) => Promise<Answer>,
    mapAnswerToResponse: (answer: Answer) => Promise<IAnswerQuestionResponseModel>): Promise<ResponseModel<IAnswerQuestionResponseModel>> => {
        return makeResponseModel(await validateRequest(request, userId), async() => {
            var answer = await mapRequestToAnswer(request, userId)
            answer = await saveAnswer(answer)
            return await mapAnswerToResponse(answer)
        })
}

export const getAll = async (
    page: number,
    formId: number,
    getQuestions: (page: number, formId: number) => Promise<Question[]>,
    mapQuestionToResponse: (question: Question) => Promise<IQuestionResponseModel>): Promise<IQuestionResponseModel[]> => {
        const questions = await getQuestions(page, formId)
        const response = questions?.map(async (question) => await mapQuestionToResponse(question))
        if (response) return await Promise.all(response)
}

export const get = async (
    id: number,
    getQuestion: (id: number) => Promise<Question>,
    mapQuestionToResponse: (question: Question) => Promise<IQuestionResponseModel>): Promise<IQuestionResponseModel> => {
        const question = await getQuestion(id)
        return await mapQuestionToResponse(question)
}