import { CreateFormRequestModel, IFormResponseModel } from './models'
import { Form } from '../entity/form'
import { Question } from '../entity/question'
import { Choice } from '../entity/choice'
import { Recommendation } from '../entity/recommendation'
import { User } from '../entity/user'

export const mapCreateFormRequestModelToForm = async (
    request: CreateFormRequestModel,
    user: User): Promise<Form> => {
        const form = new Form()
        form.creationDate = new Date()
        form.user = user
        form.version = request.version
        form.questions = request.questions.map(request => {
            const question = new Question()
            question.description = request.description
            question.form = form
            question.choices = request.choices.map(request => {
                const choice = new Choice()
                choice.description = request.description
                choice.question = question
                choice.weight = request.weight
                choice.recommendations = request.recommendations.map(request => {
                    const recommendation = new Recommendation()
                    recommendation.description = request.description
                    recommendation.choice = choice
                    return recommendation
                })
                return choice
            })
            return question
        })
        return form
}

export const mapFormToFormResponseModel = async (
    form: Form): Promise<IFormResponseModel> => {
        return {
            id: form.id,
            creationDate: form.creationDate,
            userId: form.userId,
            version: form.version,
            questions: form.questions?.map(question => {
                return {
                    id: question.id,
                    description: question.description,
                    choices: question.choices?.map(choice => {
                        return {
                            id: choice.id,
                            description: choice.description,
                            weight: choice.weight,
                            recommendations: choice.recommendations?.map(recommendation => {
                                return {
                                    id: recommendation.id,
                                    description: recommendation.description
                                }
                            })
                        }
                    })
                }
            })
        }
}