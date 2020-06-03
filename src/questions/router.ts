import express, { Request, Response } from 'express'
import { isAnalystAuthorized, isUserAuthorized, getUserNameFromAuthHeader } from '../auth'
import { processRequest } from '../requests'
import { getAll, get, create, answer } from './services'
import { sendResponseModel } from '../models'
import { getQuestions, getQuestion, saveQuestion, getUser, saveAnswer } from '../di'
import { validateCreateQuestionRequestModel, validateAnswerQuestionRequestModel } from './validators'
import { mapQuestionToQuestionResponse, mapCreateQuestionRequestToQuestion, mapAnswerQuestionRequestToAnswer, mapAnswerToQuestionResponse } from './mappers'

const questionsRouter = express.Router()

questionsRouter.get('/', isUserAuthorized, async (req: Request, res: Response) => {
    processRequest(res, async () => {
        const page = parseInt(req.query.page as string, 10)
        const formId = parseInt(req.query.formId as string, 10)
        const response = await getAll(page, formId, getQuestions, mapQuestionToQuestionResponse)
        sendResponseModel(response, res)
    })
})

questionsRouter.get('/:id', isUserAuthorized, async (req: Request, res: Response) => {
    processRequest(res, async () => {
        const id = parseInt(req.params.id as string, 10)
        const response = await get(id, getQuestion, mapQuestionToQuestionResponse)
        sendResponseModel(response, res)
    })
})

questionsRouter.post('/', isAnalystAuthorized, async (req: Request, res: Response) => {
    processRequest(res, async () => {
        const response = await create(req.body, validateCreateQuestionRequestModel, mapCreateQuestionRequestToQuestion, saveQuestion, mapQuestionToQuestionResponse)
        sendResponseModel(response, res, 201)
    })
})

questionsRouter.post('/answer', isUserAuthorized, async (req: Request, res: Response) => {
    processRequest(res, async() => {
        const user = await getUser(getUserNameFromAuthHeader(req))
        const response = await answer(req.body, user.id, validateAnswerQuestionRequestModel, mapAnswerQuestionRequestToAnswer, saveAnswer, mapAnswerToQuestionResponse)
        sendResponseModel(response, res, 201)
    })
})

export { questionsRouter }