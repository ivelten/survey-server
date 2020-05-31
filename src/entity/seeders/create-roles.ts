import { Factory, Seeder } from 'typeorm-seeding'
import { Connection, InsertResult } from 'typeorm'
import { insertInto } from '../../di'
import { Role } from '../role'
import { ADMIN_ROLE, ANALYST_ROLE, USER_ROLE } from '../../constants'

export class CreateRoles implements Seeder {
    async run(_: Factory, connection: Connection): Promise<any> {
        await insertInto(connection, Role, [
            { id: ADMIN_ROLE, name: 'Administrador' },
            { id: ANALYST_ROLE, name: 'Analista' },
            { id: USER_ROLE, name: 'Usuário' }
        ])
    }
}