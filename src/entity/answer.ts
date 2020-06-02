import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm'
import { Choice } from './choice'
import { User } from './user'

@Entity()
export class Answer {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({ type: 'timestamp' })
    answerDate: Date

    @Column({ name: 'choice_id' })
    choiceId: number

    @Column({ name: 'user_id' })
    userId: number

    @ManyToOne(_ => Choice, c => c.answers)
    @JoinColumn({ name: 'choice_id', referencedColumnName: 'id' })
    choice: Choice

    @ManyToOne(_ => User, u => u.answers)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User
}