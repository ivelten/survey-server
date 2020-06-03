import { CreateFormRequestModel, IFormResponseModel } from './models'
import { Form } from '../entity/form'

export const mapCreateFormRequestToForm = async (
    request: CreateFormRequestModel,
    userId: number): Promise<Form> => {
    const form = new Form()
    form.creationDate = new Date()
    form.userId = userId
    form.version = request.version
    form.description = request.description
    return form
}

export const mapFormToFormResponse = async (
    form: Form): Promise<IFormResponseModel> => {
    if (form) {
        return {
            id: form.id,
            creationDate: form.creationDate,
            userId: form.userId,
            version: form.version,
            description: form.description
        }
    }
}