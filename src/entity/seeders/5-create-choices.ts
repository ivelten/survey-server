import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { insertInto } from '../../di'
import { Choice } from '../choice'

export class CreateQuestions implements Seeder {
    async run(_: Factory, connection: Connection): Promise<any> {
        await insertInto(connection, Choice, [
            {
                id: 1,
                questionId: 1,
                description: 'No máximo uma vez',
                weight: 0
            },
            {
                id: 2,
                questionId: 1,
                description: 'Entre duas a três vezes',
                weight: 50
            },
            {
                id: 3,
                questionId: 1,
                description: 'Mais de três vezes',
                weight: 100
            }
        ])
    }
}