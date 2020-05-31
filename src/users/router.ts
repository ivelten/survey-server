import express, { Request, Response } from 'express'
import { create, getAll, get } from './services'
import { mapCreateUserRequestToUser, mapUserToCreateUserResponse, mapUserToGetUserResponse } from './mappers'
import { hashPassword, saveUser, getUsers, getUser } from '../di'
import { validateCreateUserRequestModel } from './validators'
import { sendResponseModel } from '../models'
import { isAnalystAuthorized, isAdminAuthorized } from '../auth'

const usersRouter = express.Router()

const processRequest = async (res: Response, processor: () => Promise<void>) => {
    try {
        await processor()
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
}

usersRouter.get('/', isAnalystAuthorized, async (req: Request, res: Response) => {
    processRequest(res, async () => {
        const page = parseInt(req.query.page as string, 10)
        const response = await getAll(page, getUsers, mapUserToGetUserResponse)
        sendResponseModel(response, res)
    })
})

usersRouter.get('/:id', isAnalystAuthorized, async (req: Request, res: Response) => {
    processRequest(res, async () => {
        const id = parseInt(req.params.id as string, 10)
        const response = await get(id, getUser, mapUserToGetUserResponse)
        sendResponseModel(response, res)
    })
})

usersRouter.post('/', isAdminAuthorized, async (req: Request, res: Response) => {
    processRequest(res, async () => {
        console.log(req.body)
        const response = await create(req.body, validateCreateUserRequestModel, hashPassword, mapCreateUserRequestToUser, saveUser, mapUserToCreateUserResponse)
        sendResponseModel(response, res)
    })
})

export { usersRouter }