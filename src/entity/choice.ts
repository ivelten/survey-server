import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Question } from './question'
import { Answer } from './answer'
import { Recommendation } from './recommendation'

@Entity()
export class Choice {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({ length: 100 })
    description: string

    @Column({ type: 'tinyint' })
    weight: number

    @Column({ name: 'question_id' })
    questionId: number

    @ManyToOne(_ => Question, q => q.choices)
    @JoinColumn({ name: 'question_id', referencedColumnName: 'id' })
    question: Question

    @OneToMany(_ => Answer, a => a.choice)
    answers: Answer[]

    @OneToMany(_ => Recommendation, r => r.choice)
    recommendations: Recommendation[]
}