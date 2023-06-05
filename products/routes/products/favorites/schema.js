'use strict'

const retrieveFavoritesSchema = {
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    productId: { type: 'string' },
                    title: { type: 'string' },
                    price: { type: 'number' },
                    image: { type: 'string' }
                }
            }
        }
    }
}

module.exports = {
    retrieveFavoritesSchema
}
