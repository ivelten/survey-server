import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne, JoinColumn } from 'typeorm'
import { Role } from './role'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({ length: 50, name: 'first_name' })
    firstName: string

    @Column({ length: 50, name: 'last_name' })
    lastName: string
    
    @Column({ length: 100, name: 'user_name' })
    @Unique(['userName'])
    userName: string

    @Column({ length: '254' })
    @Unique(['email'])
    email: string
    
    @Column({ length: 60, name: 'password_hash' })
    passwordHash: string

    @Column({ name: 'role_id' })
    roleId: number

    @ManyToOne(_ => Role, r => r.users)
    @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
    role: Role
}