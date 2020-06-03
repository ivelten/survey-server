import { IFormReportResponseModel, IChoiceReportResponseModel, IQuestionReportResponseModel } from './models'
import { FormReport } from '../entity/form-report'

const mapChoiceReportResponse = (report: FormReport): IChoiceReportResponseModel => {
    return {
        id: report.choiceId,
        description: report.choiceDescription,
        weight: report.choiceWeight,
        answerCount: report.answerCount
    }
}

const mapQuestionReportResponse = (report: FormReport): IQuestionReportResponseModel => {
    return {
        id: report.questionId,
        description: report.questionDescription,
        choices: [ mapChoiceReportResponse(report) ]
    }
}

const mapFormReportResponse = (report: FormReport): IFormReportResponseModel => {
    return {
        id: report.formId,
        description: report.formDescription,
        questions: [ mapQuestionReportResponse(report) ]
    }
}

export const mapFormReportsToFormReportResponse = async (
    reports: FormReport[]): Promise<IFormReportResponseModel[]> => {
        const formModels: IFormReportResponseModel[] = []
        reports.forEach(report => {
            const formModel = formModels.find(f => f.id == report.formId)
            if (formModel) {
                const questionModel = formModel.questions.find(q => q.id == report.questionId)
                if (questionModel) {
                    questionModel.choices.push(mapChoiceReportResponse(report))
                } else {
                    formModel.questions.push(mapQuestionReportResponse(report))
                }
            } else {
                formModels.push(mapFormReportResponse(report))
            }
        })
        return formModels
}