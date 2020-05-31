import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm'
import { User } from './user'

@Entity()
export class Role {
    @PrimaryColumn()
    id: number
    
    @Column({ length: 50 })
    name: string

    @OneToMany(_ => User, u => u.role)
    users: User[]
}