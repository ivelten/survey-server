import express, { Request, Response } from 'express'
import { create, getAll, get } from './services'
import { mapCreateUserRequestToUser, mapUserToUserResponse } from './mappers'
import { hashPassword, saveUser, getUsers, getUser } from '../di'
import { validateCreateUserRequestModel } from './validators'
import { sendResponseModel } from '../models'
import { isAnalystAuthorized, isAdminAuthorized } from '../auth'
import { processRequest } from '../requests'

const usersRouter = express.Router()

usersRouter.get('/', isAnalystAuthorized, async (req: Request, res: Response) => {
    processRequest(res, async () => {
        const page = parseInt(req.query.page as string, 10)
        const response = await getAll(page, getUsers, mapUserToUserResponse)
        sendResponseModel(response, res)
    })
})

usersRouter.get('/:userName', isAnalystAuthorized, async (req: Request, res: Response) => {
    processRequest(res, async () => {
        const userName = req.params.userName as string
        const response = await get(userName, getUser, mapUserToUserResponse)
        sendResponseModel(response, res)
    })
})

usersRouter.post('/', isAdminAuthorized, async (req: Request, res: Response) => {
    processRequest(res, async () => {
        const response = await create(req.body, validateCreateUserRequestModel, hashPassword, mapCreateUserRequestToUser, saveUser, mapUserToUserResponse)
        sendResponseModel(response, res, 201)
    })
})

export { usersRouter }