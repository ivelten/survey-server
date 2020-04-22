import express, { Request, Response } from 'express'
import { create } from './users.services'
import { mapCreateUserRequestToUser, mapUserToCreateUserResponse } from './users.mappers'
import { hashPassword, saveUser } from '../di'

const usersRouter = express.Router()

usersRouter.get('/', async (req: Request, res: Response) => {
    res.status(200).send("teste")
})

usersRouter.post('/', async (req: Request, res: Response) => {
    try {
        const response = await create(req.body, hashPassword, mapCreateUserRequestToUser, saveUser, mapUserToCreateUserResponse)
        res.status(201).send(response)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

export { usersRouter }