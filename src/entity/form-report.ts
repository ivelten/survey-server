import { ViewColumn, ViewEntity, Connection } from 'typeorm'
import { Form } from './form'
import { Question } from './question'
import { Choice } from './choice'
import { Answer } from './answer'

@ViewEntity({
    expression: (connection: Connection) =>
        connection.createQueryBuilder()
                  .select('form.id', 'formId')
                  .addSelect('form.description', 'formDescription')
                  .addSelect('question.id', 'questionId')
                  .addSelect('question.description', 'questionDescription')
                  .addSelect('choice.id', 'choiceId')
                  .addSelect('choice.description', 'choiceDescription')
                  .addSelect('choice.weight', 'choiceWeight')
                  .addSelect('count(answer.id)', 'answerCount')
                  .from(Form, 'form')
                  .innerJoin(Question, 'question', 'question.formId = form.id')
                  .innerJoin(Choice, 'choice', 'choice.questionId = question.id')
                  .leftJoin(Answer, 'answer', 'answer.choiceId = choice.id')
                  .addGroupBy('form.id, form.description, question.id, question.description, choice.id, choice.description, choice.weight')
                  
})
export class FormReport {
    @ViewColumn()
    formId: number

    @ViewColumn()
    formDescription: string

    @ViewColumn()
    questionId: number

    @ViewColumn()
    questionDescription: string

    @ViewColumn()
    choiceId: number

    @ViewColumn()
    choiceDescription: string

    @ViewColumn()
    choiceWeight: number

    @ViewColumn()
    answerCount: number
}