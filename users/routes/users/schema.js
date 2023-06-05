'use strict'

const loginSchema = {
    body: {
        type: 'object',
        properties: {
            email: {
                type: 'string',
                format: 'email'
            },
            password: { type: 'string' }
        },
        required: ['email', 'password'],
        additionalProperties: false
    },
    response: {
        200: {
            type: 'object',
            properties: {
                uuid: { type: 'string' },
                email: { type: 'string' },
                token: { type: 'string' }
            },
        }
    }
}

const registerSchema = {
    body: {
        type: 'object',
        properties: {
            email: {
                type: 'string',
                format: 'email'
            },
            password: {
                type: 'string',
                minLength: 8
            },
            firstname: { type: 'string' },
            lastname: { type: 'string' }
        },
        required: ['email', 'password', 'firstname', 'lastname'],
        additionalProperties: false
    }
}

module.exports = {
    loginSchema,
    registerSchema
}
