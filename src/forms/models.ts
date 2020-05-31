import { IsNotEmpty, IsInt, IsArray, MaxLength, IsString, ValidateNested, Min } from 'class-validator'

interface ICreateFormRequestModel {
    version: number
    questions : CreateFormRequestQuestionModel[]
}

class CreateFormRequestModel implements ICreateFormRequestModel {
    constructor(model: ICreateFormRequestModel) {
        if (model) {
            this.version = model.version
            this.questions = model.questions
        }
    }

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    version: number
    
    @IsArray()
    @ValidateNested()
    questions: CreateFormRequestQuestionModel[]
}

class CreateFormRequestQuestionModel {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    description: string

    @IsArray()
    @ValidateNested()
    choices: CreateFormRequestQuestionChoiceModel[]
}

class CreateFormRequestQuestionChoiceModel {
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
    recommendations: CreateFormRequestQuestionChoiceRecommendationModel[]
}

class CreateFormRequestQuestionChoiceRecommendationModel {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    description: string
}

interface IFormResponseQuestionChoiceRecommendationModel {
    id: number
    description: string
}

interface IFormResponseQuestionChoiceModel {
    id: number
    description: string
    weight: number
    recommendations: IFormResponseQuestionChoiceRecommendationModel[]
}

interface IFormResponseQuestionModel {
    id: number
    description: string
    choices: IFormResponseQuestionChoiceModel[]
}

interface IFormResponseModel {
    id: number
    creationDate: Date
    version: number
    userId: number
    questions: IFormResponseQuestionModel[]
}

export { 
    ICreateFormRequestModel,
    CreateFormRequestModel,
    CreateFormRequestQuestionModel,
    CreateFormRequestQuestionChoiceModel,
    CreateFormRequestQuestionChoiceRecommendationModel,
    IFormResponseModel,
    IFormResponseQuestionModel,
    IFormResponseQuestionChoiceModel,
    IFormResponseQuestionChoiceRecommendationModel
}