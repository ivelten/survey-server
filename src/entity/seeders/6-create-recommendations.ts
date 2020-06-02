import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { insertInto } from '../../di'
import { Recommendation } from '../recommendation'

export class CreateQuestions implements Seeder {
    async run(_: Factory, connection: Connection): Promise<any> {
        await insertInto(connection, Recommendation, [
            {
                id: 1,
                choiceId: 1,
                description: 'Deixe uma garrafa de água sempre com você no trabalho.'
            },
            {
                id: 2,
                choiceId: 1,
                description: 'Configure um alarme para te lembrar de beber água pelo menos 3 vezes por dia.'
            }
        ])
    }
}