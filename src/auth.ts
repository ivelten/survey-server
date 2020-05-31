import basicAuth from 'express-basic-auth'
import { authorizeUser } from './di'
import { authorize } from './users/services'
import { USER_ROLE, ANALYST_ROLE, ADMIN_ROLE } from './constants'

const asyncAuthorizer = (roleId: number): basicAuth.AsyncAuthorizer => {
    return (userName: string, password: string, callback: basicAuth.AsyncAuthorizerCallback) => {
        authorize(userName, password, roleId, authorizeUser).then(authed => callback(null, authed))
    }
}

export const isUserAuthorized = basicAuth({
    authorizer: asyncAuthorizer(USER_ROLE),
    authorizeAsync: true
})

export const isAnalystAuthorized = basicAuth({
    authorizer: asyncAuthorizer(ANALYST_ROLE),
    authorizeAsync: true
})

export const isAdminAuthorized = basicAuth({
    authorizer: asyncAuthorizer(ADMIN_ROLE),
    authorizeAsync: true
})