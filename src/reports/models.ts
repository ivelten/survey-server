interface IChoiceReportResponseModel {
    id: number
    description: string
    weight: number
    answerCount: number
}

interface IQuestionReportResponseModel {
    id: number
    description: string
    choices: IChoiceReportResponseModel[]
}

interface IFormReportResponseModel {
    id: number
    description: string
    questions: IQuestionReportResponseModel[]
}

export { 
    IFormReportResponseModel,
    IQuestionReportResponseModel,
    IChoiceReportResponseModel
}