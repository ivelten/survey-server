import express, { Request, Response } from 'express'
import { isAnalystAuthorized } from '../auth'
import { processRequest } from '../requests'
import { getAll } from './services'
import { mapFormToFormResponseModel } from './mappers'
import { sendResponseModel } from '../models'
import { getForms } from '../di'

const formsRouter = express.Router()

formsRouter.get('/', isAnalystAuthorized, async (req: Request, res: Response) => {
    processRequest(res, async () => {
        const page = parseInt(req.query.page as string, 10)
        const response = await getAll(page, getForms, mapFormToFormResponseModel)
        sendResponseModel(response, res)
    })
})

export { formsRouter }