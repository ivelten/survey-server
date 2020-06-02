import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm'
import { Choice } from './choice'

@Entity()
export class Recommendation {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({ length: 100 })
    description: string

    @Column({ name: 'choice_id' })
    choiceId: number

    @ManyToOne(_ => Choice, c => c.recommendations)
    @JoinColumn({ name: 'choice_id', referencedColumnName: 'id' })
    choice: Choice
}