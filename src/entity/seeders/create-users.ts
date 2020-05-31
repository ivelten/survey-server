import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from '../../env'
import { User } from '../user'
import { insertInto } from '../../di'
import { ADMIN_ROLE, ANALYST_ROLE, USER_ROLE } from '../../constants'

export class CreateUsers implements Seeder {
    async run(_: Factory, connection: Connection): Promise<any> {
        const passwordHash = await bcrypt.hash('password', SALT_ROUNDS)
        await insertInto(connection, User, [
            { firstName: 'José', lastName: 'Silva', userName: 'jose.silva', email: 'jose.silva@gmail.com', passwordHash, roleId: ADMIN_ROLE, birthDate: new Date(1988, 4, 2), isActive: true, weigth: 80, height: 170 },
            { firstName: 'João', lastName: 'Silva', userName: 'joao.silva', email: 'joao.silva@gmail.com', passwordHash, roleId: ANALYST_ROLE, birthDate: new Date(1991, 10, 19), isActive: true, weigth: 74, height: 168 },
            { firstName: 'Maria', lastName: 'Silva', userName: 'maria.silva', email: 'maria.silva@gmail.com', passwordHash, roleId: USER_ROLE, birthDate: new Date(1980, 3, 5), isActive: true, weigth: 96, height: 190 }
        ])
    }
}