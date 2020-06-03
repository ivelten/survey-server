import { CreateQuestionRequestModel, IQuestionResponseModel, AnswerQuestionRequestModel, IAnswerQuestionResponseModel } from './models'
import { Question } from '../entity/question'
import { Choice } from '../entity/choice'
import { Recommendation } from '../entity/recommendation'
import { Answer } from '../entity/answer'
import { User } from '../entity/user'

export const mapCreateQuestionRequestToQuestion = async (
    request: CreateQuestionRequestModel): Promise<Question> => {
    const question = new Question()
    question.description = request.description
    question.formId = request.formId
    question.choices = request.choices?.map(choiceRequest => {
        const choice = new Choice()
        choice.description = choiceRequest.description
        choice.weight = choiceRequest.weight
        choice.recommendations = choiceRequest.recommendations?.map(recommendationRequest => {
            const recommendation = new Recommendation()
            recommendation.description = recommendationRequest.description
            return recommendation
        })
        return choice
    })
    return question
}

export const mapQuestionToQuestionResponse = async (
    question: Question): Promise<IQuestionResponseModel> => {
    if (question) {
        return {
            id: question.id,
            formId: question.formId,
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
    }
}

export const mapAnswerQuestionRequestToAnswer = async (
    request: AnswerQuestionRequestModel,
    userId: number): Promise<Answer> => {
        const answer = new Answer()
        answer.choiceId = request.choiceId
        answer.answerDate = new Date()
        answer.userId = userId
        return answer
}

export const mapAnswerToQuestionResponse = async (
    answer: Answer): Promise<IAnswerQuestionResponseModel> => {
        if (answer) {
            return {
                id: answer.id,
                userId: answer.userId,
                choiceId: answer.choiceId,
                answerDate: answer.answerDate
            }
    }
}