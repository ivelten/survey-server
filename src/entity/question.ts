import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Form } from './form'
import { Choice } from './choice'

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({ length: 100 })
    description: string

    @Column({ name: 'form_id' })
    formId: number

    @ManyToOne(_ => Form, f => f.questions)
    @JoinColumn({ name: 'form_id', referencedColumnName: 'id' })
    form: Form

    @OneToMany(_ => Choice, c => c.question)
    choices: Choice[]
}