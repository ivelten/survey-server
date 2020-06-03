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
                description: 'Qual o percentual ideal da intensidade do álcool gel usado para higienização?'
            },
            {
                id: 2,
                formId: 1,
                description: 'Quantos metros de distância são considerados o ideal para o isolamento social?'
            },
            {
                id: 3,
                formId: 1,
                description: 'Dentre os objetos abaixo, quais são considerados seguros para compartilhar com outras pessoas durante a crise?'
            }
        ])
    }
}