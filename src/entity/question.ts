import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Form } from './form'
import { Choice } from './choice'

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({ length: 100 })
    description: string

    @Column()
    formId: number

    @ManyToOne(_ => Form, f => f.questions)
    form: Form

    @OneToMany(_ => Choice, c => c.question)
    choices: Choice[]
}