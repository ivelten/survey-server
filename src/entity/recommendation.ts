import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm'
import { Choice } from './choice'

@Entity()
export class Recommendation {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({ length: 200 })
    description: string

    @Column()
    choiceId: number

    @ManyToOne(_ => Choice, c => c.recommendations)
    choice: Choice
}