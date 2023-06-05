'use strict'

const address = {
    type: 'object',
    properties: {
        address: { type: 'string' },
        county: { type: 'string' },
        locality: { type: 'string' },
        contactName: { type: 'string' },
        phone: { type: 'string' }
    },
    additionalProperties: false,
    required: ['address', 'county', 'locality', 'contactName', 'phone']
}

const customerOutput = {
    type: 'object',
    properties: {
        _id: { type: 'string' },
        firstname: { type: 'string' },
        lastname: { type: 'string' },
        phone: {
            oneOf: [
                { type: 'string' },
                { type: 'null' }
            ]
        },
        email: { type: 'string' },
        // addresses: {
        //     type: 'array',
        //     items: address,
        //     minItems: 0
        // }
        address: {
            oneOf: [
                address,
                { type: 'null' }
            ]
        }
    },
    required: ['_id', 'firstname', 'lastname']
}

const retrieveCustomerSchema = {
    response: {
        200: customerOutput
    }
}

const updateCustomerSchema = {
    body: {
        type: 'object',
        properties: {
            firstname: { type: 'string' },
            lastname: { type: 'string' },
            phone: {
                oneOf: [
                    { type: 'string' },
                    { type: 'null' }
                ]
            },
            // addresses: {
            //     type: 'array',
            //     items: address,
            //     minItems: 0
            // }
            address: {
                oneOf: [
                    address,
                    { type: 'null' }
                ]
            }
        },
        // patternProperties: {
        //     '^address_[0-9]{1,}$': address
        // },
        additionalProperties: false,
        // minProperties: 1
    },
    response: {
        200: customerOutput
    }
}

module.exports = {
    retrieveCustomerSchema,
    updateCustomerSchema
}
