const retrieveOrdersSchema = {
    query: {
        type: 'object',
        properties: {
            page: {
                type: 'integer',
                minimum: 1
            },
            perPage: {
                type: 'integer',
                minimum: 10,
                maximum: 50
            }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                orders: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            orderNo: { type: 'string' },
                            items: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        title: { type: 'string' },
                                        unitPrice: { type: 'number' },
                                        quantity: { type: 'integer' },
                                        productId: { type: 'string' }
                                    }
                                }
                            },
                            createdDate: { type: 'string', format: 'datetime' },
                            deliveryAddress: {
                                type: 'object',
                                properties: {
                                    address: { type: 'string' },
                                    county: { type: 'string' },
                                    locality: { type: 'string' },
                                    contactName: { type: 'string' },
                                    phone: { type: 'string' }
                                },
                            }
                        }
                    },
                    minItems: 0
                },
                total: { type: 'integer' }
            }
        }
    }
}

module.exports = {
    retrieveOrdersSchema
}
