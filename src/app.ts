import express, { Express } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { usersRouter } from './users/router'
import { formsRouter } from './forms/router'
import { questionsRouter } from './questions/router'
import { reportsRouter } from './reports/router'

export const createApp = (): Express => {
    const app = express()
    app.use(helmet())
    app.use(cors())
    app.use(express.json())
    app.use('/users', usersRouter)
    app.use('/forms', formsRouter)
    app.use('/questions', questionsRouter)
    app.use('/reports', reportsRouter)
    return app
}