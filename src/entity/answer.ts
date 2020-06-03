import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm'
import { Choice } from './choice'
import { User } from './user'

@Entity()
export class Answer {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({ type: 'timestamp' })
    answerDate: Date

    @Column()
    choiceId: number

    @Column()
    userId: number

    @ManyToOne(_ => Choice, c => c.answers)
    choice: Choice

    @ManyToOne(_ => User, u => u.answers)
    user: User
}