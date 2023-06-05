'use strict'

const query = {
    type: 'object',
    properties: {
        session: { type: 'string' }
    }
}

const retrieveBasketItemsSchema = {
    query,
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    productId: {
                        type: 'string'
                    },
                    title: {
                        type: 'string'
                    },
                    unitPrice: {
                        type: 'number'
                    },
                    quantity: {
                        type: 'integer'
                    }
                },
                required: ['productId', 'title', 'unitPrice', 'quantity']
            },
        }
    }
}

const incrementBasketItemQuantity = {
    query,
    body: {
        type: 'object',
        properties: {
            productId: {
                type: 'string',
                minLength: 1
            },
            increment: {
                oneOf: [
                    {
                        type: 'integer',
                        maximum: -1
                    },
                    {
                        type: 'integer',
                        minimum: 1
                    }
                ]
            }
        },
        required: ['productId', 'increment']
    }
}

const checkoutSchema = {
    body: {
        type: 'object',
        properties: {
            deliveryAddress: {
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
        },
        additionalProperties: false,
        required: ['deliveryAddress']
    }
}

module.exports = {
    retrieveBasketItemsSchema,
    incrementBasketItemQuantity,
    checkoutSchema
}
