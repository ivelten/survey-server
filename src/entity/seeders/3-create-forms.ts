import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { insertInto } from '../../di'
import { Form } from '../form'

export class CreateForms implements Seeder {
    async run(_: Factory, connection: Connection): Promise<any> {
        await insertInto(connection, Form, [
            {
                id: 1,
                userId: 1,
                version: 1,
                description: 'Questões de saúde'
            }
        ])
    }
}