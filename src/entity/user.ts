import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { Role } from './role'
import { Form } from './form'
import { Answer } from './answer'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({ length: 50 })
    firstName: string

    @Column({ length: 50 })
    lastName: string
    
    @Column({ length: 100 })
    @Unique(['userName'])
    userName: string

    @Column({ length: '254' })
    @Unique(['email'])
    email: string
    
    @Column({ length: 60 })
    passwordHash: string

    @Column({ type: 'date' })
    birthDate: Date

    @Column({ type: 'smallint' })
    height: number

    @Column({ type: 'smallint' })
    weigth: number

    @Column()
    isActive: boolean

    @Column()
    roleId: number

    @ManyToOne(_ => Role, r => r.users)
    role: Role

    @OneToMany(_ => Form, f => f.user)
    forms: Form[]

    @OneToMany(_ => Answer, a => a.user)
    answers: Answer[]
}