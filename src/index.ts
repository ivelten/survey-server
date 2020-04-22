import 'reflect-metadata'
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createConnection } from 'typeorm'
import { usersRouter } from './users/users.router'

dotenv.config();

if (!process.env.PORT) {
    process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10)

const app = express()

createConnection().then(() => {
        app.use(helmet())
        app.use(cors())
        app.use(express.json())
        app.use('/users', usersRouter)
        app.listen(PORT, () => { 
            console.log(`Listening on port ${PORT}`)
         })
    }).catch(error => {
        console.log(error)
    })