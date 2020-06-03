import express, { Request, Response } from 'express'
import { isAnalystAuthorized, isUserAuthorized, getUserNameFromAuthHeader } from '../auth'
import { processRequest } from '../requests'
import { getAll, get, create } from './services'
import { mapFormToFormResponse, mapCreateFormRequestToForm } from './mappers'
import { sendResponseModel } from '../models'
import { getForms, getForm, saveForm, getUser } from '../di'
import { validateCreateFormRequestModel } from './validators'

const formsRouter = express.Router()

formsRouter.get('/', isUserAuthorized, async (req: Request, res: Response) => {
    processRequest(res, async () => {
        const page = parseInt(req.query.page as string, 10)
        const response = await getAll(page, getForms, mapFormToFormResponse)
        sendResponseModel(response, res)
    })
})

formsRouter.get('/:id', isUserAuthorized, async (req: Request, res: Response) => {
    processRequest(res, async () => {
        const id = parseInt(req.params.id as string, 10)
        const response = await get(id, getForm, mapFormToFormResponse)
        sendResponseModel(response, res)
    })
})

formsRouter.post('/', isAnalystAuthorized, async (req: Request, res: Response) => {
    processRequest(res, async () => {
        const user = await getUser(getUserNameFromAuthHeader(req))
        const response = await create(req.body, user.id, validateCreateFormRequestModel, mapCreateFormRequestToForm, saveForm, mapFormToFormResponse)
        sendResponseModel(response, res, 201)
    })
})

export { formsRouter }