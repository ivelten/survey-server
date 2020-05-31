import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user'

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({ length: 50 })
    name: string

    @OneToMany(_ => User, u => u.role)
    users: User[]
}