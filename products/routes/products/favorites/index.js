'use strict'

const {
    retrieveFavoritesSchema
} = require('./schema')
const {
    addFavorite,
    retrieveFavorites,
    deleteFavorite
} = require('./../../../utils/favorites')
const {
    retrieveProductById
} = require('./../../../utils/product')

/**
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
module.exports = async function(fastify, options) {
    fastify.decorateRequest('userId', null)

    fastify.addHook('preValidation', async (request, reply) => {
        request.verifyJwt()
        request.userId = request.decodeJwt().sub
    })

    fastify.put('/:productId', async function(request, reply) {
        const { userId } = request
        const productId = this.stringToObjectId(request.params.productId)

        if (!(await retrieveProductById(this.mongo, productId))) {
            throw this.httpErrors.badRequest('Invalid product id')
        }

        await addFavorite(this.mongo, userId, productId)
        reply.status(204)
    })

    fastify.delete('/:productId', async function(request, reply) {
        const { userId } = request
        const productId = this.stringToObjectId(request.params.productId)

        await deleteFavorite(this.mongo, userId, productId)
        reply.status(204)
    })

    fastify.get('/', { schema: retrieveFavoritesSchema }, async function(request, reply) {
        const { userId } = request

        return retrieveFavorites(this.mongo, userId)
    })
}
