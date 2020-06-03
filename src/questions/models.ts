import { IsNotEmpty, IsString, MaxLength, IsArray, ValidateNested, IsInt, Min } from 'class-validator'
import { IsValidFormId } from './validation'

interface ICreateQuestionRequestModel {
    formId: number
    description: string
    choices: IChoiceRequestModel[]
}

class CreateQuestionRequestModel implements ICreateQuestionRequestModel {
    constructor(model: ICreateQuestionRequestModel) {
        if (model) {
            this.formId = model.formId
            this.description = model.description
            this.choices = model.choices?.map(choice => new ChoiceRequestModel(choice))
        }
    }

    @IsNotEmpty()
    @IsInt()
    @IsValidFormId()
    formId: number

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    description: string

    @IsArray()
    @ValidateNested()
    choices: IChoiceRequestModel[]
}

interface IChoiceRequestModel {
    description: string
    weight: number
    recommendations: IRecommendationRequestModel[]
}

class ChoiceRequestModel implements IChoiceRequestModel {
    constructor(model: IChoiceRequestModel) {
        if (model) {
            this.description = model.description
            this.weight = model.weight
            this.recommendations = model.recommendations?.map(recommendation => new RecommendationRequestModel(recommendation))
        }
    }
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    description: string

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    weight: number

    @IsArray()
    @ValidateNested()
    recommendations: IRecommendationRequestModel[]
}

interface IRecommendationRequestModel {
    description: string
}

class RecommendationRequestModel implements IRecommendationRequestModel {
    constructor(model: IRecommendationRequestModel) {
        if (model) {
            this.description = model.description
        }
    }
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    description: string
}


interface IRecommendationResponseModel {
    id: number
    description: string
}

interface IChoiceResponseModel {
    id: number
    description: string
    weight: number
    recommendations: IRecommendationResponseModel[]
}

interface IQuestionResponseModel {
    id: number
    formId: number
    description: string
    choices: IChoiceResponseModel[]
}

export { 
    ICreateQuestionRequestModel,
    CreateQuestionRequestModel,
    IChoiceRequestModel,
    ChoiceRequestModel,
    IRecommendationRequestModel,
    RecommendationRequestModel,
    IRecommendationResponseModel,
    IChoiceResponseModel,
    IQuestionResponseModel
}