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
            {
                id: 1,
                firstName: 'José',
                lastName: 'Silva',
                userName: 'jose.silva',
                email: 'jose.silva@gmail.com',
                passwordHash,
                roleId: ADMIN_ROLE,
                birthDate: new Date(1988, 4, 2),
                isActive: true,
                weigth: 80,
                height: 170
            },
            {
                id: 2,
                firstName: 'João',
                lastName: 'Silva',
                userName: 'joao.silva',
                email: 'joao.silva@gmail.com',
                passwordHash,
                roleId: ANALYST_ROLE,
                birthDate: new Date(1991, 10, 19),
                isActive: true,
                weigth: 74,
                height: 168
            },
            {
                id: 3,
                firstName: 'Maria',
                lastName: 'Silva',
                userName: 'maria.silva',
                email: 'maria.silva@gmail.com',
                passwordHash,
                roleId: USER_ROLE,
                birthDate: new Date(1980, 3, 5),
                isActive: true,
                weigth: 96,
                height: 190
            },
            {
                id: 4,
                firstName: 'Pedro',
                lastName: 'Silva',
                userName: 'pedro.silva',
                email: 'pedro.silva@gmail.com',
                passwordHash,
                roleId: USER_ROLE,
                birthDate: new Date(1991, 1, 9),
                isActive: true,
                weigth: 74,
                height: 176
            },
            {
                id: 5,
                firstName: 'Josefino',
                lastName: 'Silva',
                userName: 'josefino.silva',
                email: 'josefino.silva@gmail.com',
                passwordHash,
                roleId: USER_ROLE,
                birthDate: new Date(1984, 12, 21),
                isActive: true,
                weigth: 79,
                height: 184
            },
            {
                id: 6,
                firstName: 'Fernanda',
                lastName: 'Silva',
                userName: 'fernanda.silva',
                email: 'fernanda.silva@gmail.com',
                passwordHash,
                roleId: USER_ROLE,
                birthDate: new Date(1992, 7, 30),
                isActive: true,
                weigth: 69,
                height: 168
            }
        ])
    }
}