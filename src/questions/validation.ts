import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator'
import { getConnection } from 'typeorm'
import { Form } from '../entity/form'

export function IsValidFormId(validationOptions?: ValidationOptions): PropertyDecorator {
    return function (object: Object, propertyName: string) {
        if (!validationOptions) {
            validationOptions = { 
                message: `${propertyName} value refers to a non-existent Form`
            }
        }
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            name: 'isValidFormId',
            validator: {
                async validate(value: any, _validationArguments?: ValidationArguments) {
                    if (await getConnection().getRepository(Form).findOne({ id: value })) return true
                    return false
                }
            }
        })
    }
}