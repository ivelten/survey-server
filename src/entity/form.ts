import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { User } from './user'
import { Question } from './question'

@Entity()
export class Form {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({ type: 'timestamp', default: () => 'now()' })
    creationDate: Date

    @Column({ type: 'smallint' })
    version: number

    @Column({ length: 100 })
    description: string

    @Column({ name: 'user_id' })
    userId: number

    @ManyToOne(_ => User, u => u.forms)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User

    @OneToMany(_ => Question, q => q.form)
    questions: Question[]
}