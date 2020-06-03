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
            },
            {
                id: 4,
                choiceId: 3,
                userId: 4,
                answerDate: new Date()
            },
            {
                id: 5,
                choiceId: 2,
                userId: 5,
                answerDate: new Date()
            },
            {
                id: 6,
                choiceId: 4,
                userId: 6,
                answerDate: new Date()
            },
            {
                id: 7,
                choiceId: 6,
                userId: 1,
                answerDate: new Date()
            },
            {
                id: 8,
                choiceId: 6,
                userId: 2,
                answerDate: new Date()
            },
            {
                id: 9,
                choiceId: 5,
                userId: 3,
                answerDate: new Date()
            },
            {
                id: 10,
                choiceId: 5,
                userId: 4,
                answerDate: new Date()
            },
            {
                id: 11,
                choiceId: 8,
                userId: 5,
                answerDate: new Date()
            },
            {
                id: 12,
                choiceId: 8,
                userId: 6,
                answerDate: new Date()
            },
            {
                id: 13,
                choiceId: 12,
                userId: 1,
                answerDate: new Date()
            },
            {
                id: 14,
                choiceId: 12,
                userId: 2,
                answerDate: new Date()
            },
            {
                id: 15,
                choiceId: 12,
                userId: 3,
                answerDate: new Date()
            },
            {
                id: 16,
                choiceId: 12,
                userId: 4,
                answerDate: new Date()
            },
            {
                id: 17,
                choiceId: 12,
                userId: 5,
                answerDate: new Date()
            },
            {
                id: 18,
                choiceId: 12,
                userId: 6,
                answerDate: new Date()
            }
        ])
    }
}