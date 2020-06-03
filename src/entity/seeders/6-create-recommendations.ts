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
                description: 'Este percentual auxilia a higienizar, mas faz com que o álcool evapore rápido e a camada de proteção dura pouco tempo.'
            },
            {
                id: 2,
                choiceId: 3,
                description: 'Este percentual permite a camada de álcool não evaporar tão cedo, porém é considerado de baixa eficiência para a higienização.'
            },
            {
                id: 3,
                choiceId: 4,
                description: 'Este percentual permite a camada de álcool não evaporar tão cedo, porém é considerado de baixa eficiência para a higienização.'
            }
        ])
    }
}