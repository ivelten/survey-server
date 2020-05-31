import { Factory, Seeder } from 'typeorm-seeding'
import { Connection, InsertResult } from 'typeorm'
import { insertInto } from '../../di'
import { Role } from '../role'

export class CreateRoles implements Seeder {
    async run(_: Factory, connection: Connection): Promise<any> {
        await insertInto(connection, Role, [
            { id: 1, name: 'Administrador' },
            { id: 2, name: 'Analista' },
            { id: 3, name: 'Usuário' }
        ])
    }
}