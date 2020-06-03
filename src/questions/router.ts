import express, { Request, Response } from 'express'
import { isAnalystAuthorized, isUserAuthorized } from '../auth'
import { processRequest } from '../requests'
import { getAll, get, create } from './services'
import { sendResponseModel } from '../models'
import { getQuestions, getQuestion, saveQuestion } from '../di'
import { validateCreateQuestionRequestModel } from './validators'
import { mapQuestionToQuestionResponse, mapCreateQuestionRequestToQuestion } from './mappers'

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

export { questionsRouter }