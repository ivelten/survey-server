import { ValidationError } from 'class-validator'
import { Response } from 'express'

interface IBadRequestResponseModel {
    validationErrors: ValidationError[]
}

type ResponseModel<T> = T | IBadRequestResponseModel

const isBadRequest = <T>(response: ResponseModel<T>): boolean => {
    return 'validationErrors' in response
}

const makeResponseModel = <T>(validationErrors: ValidationError[], responseFactory: () => T) => {
    if (validationErrors.length > 0) return { validationErrors: validationErrors }
    return responseFactory()
}

const sendResponseModel = <T>(model: ResponseModel<T>, apiResponse: Response): void => {
    if (!model) apiResponse.status(404)
    else if (isBadRequest(model)) apiResponse.status(400)
    else apiResponse.status(200)
    
    apiResponse.send(model)
}

export { IBadRequestResponseModel, ResponseModel, isBadRequest, makeResponseModel, sendResponseModel }