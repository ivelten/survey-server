import { ICreateFormRequestModel, IFormResponseModel } from './models'
import { ValidationError } from 'class-validator'
import { Form } from '../entity/form'
import { ResponseModel, makeResponseModel } from '../models'

export const create = async (
    request: ICreateFormRequestModel,
    userId: number,
    validateRequest: (request: ICreateFormRequestModel, userId: number) => Promise<ValidationError[]>,
    mapRequestToForm: (req: ICreateFormRequestModel, userId: number) => Promise<Form>,
    saveForm: (form: Form) => Promise<Form>,
    mapFormToResponse: (form: Form) => Promise<IFormResponseModel>): Promise<ResponseModel<IFormResponseModel>> => {
        return makeResponseModel(await validateRequest(request, userId), async () => {
            var form = await mapRequestToForm(request, userId)
            form = await saveForm(form)
            return await mapFormToResponse(form)
        })
}

export const getAll = async (
    page: number,
    getForms: (page: number) => Promise<Form[]>,
    mapFormToResponse: (form: Form) => Promise<IFormResponseModel>): Promise<IFormResponseModel[]> => {
        const forms = await getForms(page)
        const response = forms?.map(async (form) => await mapFormToResponse(form))
        return await Promise.all(response)
}

export const get = async (
    id: number,
    getForm: (id: number) => Promise<Form>,
    mapFormToResponse: (form: Form) => Promise<IFormResponseModel>): Promise<IFormResponseModel> => {
        const form = await getForm(id)
        return await mapFormToResponse(form)
}
