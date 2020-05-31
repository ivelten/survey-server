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

usersRouter.get('/:id', isAnalystAuthorized, async (req: Request, res: Response) => {
    processRequest(res, async () => {
        const id = parseInt(req.params.id as string, 10)
        const response = await get(id, getUser, mapUserToUserResponse)
        sendResponseModel(response, res)
    })
})

usersRouter.post('/', isAdminAuthorized, async (req: Request, res: Response) => {
    processRequest(res, async () => {
        console.log(req.body)
        const response = await create(req.body, validateCreateUserRequestModel, hashPassword, mapCreateUserRequestToUser, saveUser, mapUserToUserResponse)
        sendResponseModel(response, res)
    })
})

export { usersRouter }