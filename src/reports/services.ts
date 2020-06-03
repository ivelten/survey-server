import { IFormReportResponseModel } from './models'
import { FormReport } from '../entity/form-report'

export const get = async (
    page: number,
    getFormReports: (page: number) => Promise<FormReport[]>,
    mapFormReportsToResponse: (formReport: FormReport[]) => Promise<IFormReportResponseModel[]>): Promise<IFormReportResponseModel[]> => {
        const reports = await getFormReports(page)
        return await mapFormReportsToResponse(reports)
}
