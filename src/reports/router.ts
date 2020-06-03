import express, { Request, Response } from 'express'
import { isUserAuthorized } from '../auth'
import { processRequest } from '../requests'
import { get } from './services'
import { mapFormReportsToFormReportResponse } from './mappers'
import { sendResponseModel } from '../models'
import { getFormReports } from '../di'

const reportsRouter = express.Router()

reportsRouter.get('/', isUserAuthorized, async (req: Request, res: Response) => {
    processRequest(res, async () => {
        const page = parseInt(req.query.page as string, 10)
        const response = await get(page, getFormReports, mapFormReportsToFormReportResponse)
        sendResponseModel(response, res)
    })
})

export { reportsRouter }