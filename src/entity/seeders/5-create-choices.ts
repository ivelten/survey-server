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
                description: '80%',
                weight: 30
            },
            {
                id: 2,
                questionId: 1,
                description: '70%',
                weight: 70
            },
            {
                id: 3,
                questionId: 1,
                description: '50%',
                weight: 0
            },
            {
                id: 4,
                questionId: 1,
                description: '30%',
                weight: 0
            },
            {
                id: 5,
                questionId: 2,
                description: '1 metro',
                weight: 0
            },
            {
                id: 6,
                questionId: 2,
                description: '2 metros',
                weight: 100
            },
            {
                id: 7,
                questionId: 2,
                description: '1 metro e meio',
                weight: 0
            },
            {
                id: 8,
                questionId: 2,
                description: 'meio metro',
                weight: 0
            },
            {
                id: 9,
                questionId: 3,
                description: 'Utensílios de cozinha',
                weight: 0
            },
            {
                id: 10,
                questionId: 3,
                description: 'Garrafas de bebidas',
                weight: 0
            },
            {
                id: 11,
                questionId: 3,
                description: 'Refeição',
                weight: 0
            },
            {
                id: 12,
                questionId: 3,
                description: 'Nenhuma das alternativas anteriores',
                weight: 100
            }
        ])
    }
}