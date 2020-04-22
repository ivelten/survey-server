import 'reflect-metadata'
import { port } from './env'
import { createConnection } from 'typeorm'
import { createApp } from './app'

createConnection()
    .then(() => createApp())
    .then((app) => app.listen(port, () => console.log(`Listening on port ${port}`)))
    .catch(error => console.log(error))