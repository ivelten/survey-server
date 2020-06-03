import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator'
import { getConnection } from 'typeorm'
import { Form } from '../entity/form'
import { Choice } from '../entity/choice'
import { Answer } from '../entity/answer'
import { AnswerQuestionRequestModel } from './models'

export function IsValidFormId(validationOptions?: ValidationOptions): PropertyDecorator {
    return function (object: Object, propertyName: string) {
        if (!validationOptions) {
            validationOptions = { 
                message: `${propertyName} value refers to a non-existent Form`
            }
        }
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            name: 'isValidFormId',
            validator: {
                async validate(value: any, _validationArguments?: ValidationArguments) {
                    if (typeof(value) !== 'number') return true
                    if (await getConnection().getRepository(Form).findOne(value)) return true
                    return false
                }
            }
        })
    }
}

export function IsValidChoiceId(validationOptions?: ValidationOptions): PropertyDecorator {
    return function (object: Object, propertyName: string) {
        if (!validationOptions) {
            validationOptions = { 
                message: `${propertyName} value refers to a non-existent Choice`
            }
        }
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            name: 'isValidChoiceId',
            validator: {
                async validate(value: any, _validationArguments?: ValidationArguments) {
                    if (typeof(value) !== 'number') return true
                    if (await getConnection().getRepository(Choice).findOne(value)) return true
                    return false
                }
            }
        })
    }
}

export function QuestionOfChoiceIdIsNotAnswered(validationOptions?: ValidationOptions): PropertyDecorator {
    return function (object: Object, propertyName: string) {
        if (!validationOptions) {
            validationOptions = { 
                message: `${propertyName} value refers to a Choice of a question that is already answered`
            }
        }
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            name: 'questionOfChoiceIdIsNotAnswered',
            validator: {
                async validate(value: any, validationArguments?: ValidationArguments) {
                    if (typeof(value) !== 'number') return true
                    var model = validationArguments.object as AnswerQuestionRequestModel
                    const connection = getConnection()
                    const repository = connection.getRepository(Choice)
                    const choice = await repository.findOne(value)
                    const answerCount = await repository.createQueryBuilder("c")
                                                        .leftJoinAndSelect("c.answers", "a")
                                                        .leftJoinAndSelect("c.question", "q")
                                                        .andWhere("q.id = :questionId", { questionId: choice.questionId })
                                                        .andWhere("a.user_id = :userId", { userId: model.userId })
                                                        .getCount()
                    if (answerCount > 0) return false
                    return true
                }
            }
        })
    }
}