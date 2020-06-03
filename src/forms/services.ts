import { ICreateFormRequestModel, IFormResponseModel } from './models'
import { ValidationError } from 'class-validator'
import { Form } from '../entity/form'
import { ResponseModel, makeResponseModel } from '../models'
import { User } from '../entity/user'

export const create = async (
    request: ICreateFormRequestModel,
    user: User,
    validateRequest: (request: ICreateFormRequestModel) => Promise<ValidationError[]>,
    mapRequestToForm: (req: ICreateFormRequestModel, user: User) => Promise<Form>,
    saveForm: (form: Form) => Promise<Form>,
    mapFormToResponse: (form: Form) => Promise<IFormResponseModel>): Promise<ResponseModel<IFormResponseModel>> => {
        return makeResponseModel(await validateRequest(request), async () => {
            var form = await mapRequestToForm(request, user)
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
