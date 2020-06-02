import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { insertInto } from '../../di'
import { Question } from '../question'

export class CreateQuestions implements Seeder {
    async run(_: Factory, connection: Connection): Promise<any> {
        await insertInto(connection, Question, [
            {
                id: 1,
                formId: 1,
                description: 'Quantas vezes ao dia você bebe água?'
            }
        ])
    }
}