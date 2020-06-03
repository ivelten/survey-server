import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { insertInto } from '../../di'
import { Answer } from '../answer'

export class CreateAnswers implements Seeder {
    async run(_: Factory, connection: Connection): Promise<any> {
        await insertInto(connection, Answer, [
            {
                id: 1,
                choiceId: 1,
                userId: 1,
                answerDate: new Date()
            },
            {
                id: 2,
                choiceId: 1,
                userId: 2,
                answerDate: new Date()
            },
            {
                id: 3,
                choiceId: 2,
                userId: 3,
                answerDate: new Date()
            }
        ])
    }
}