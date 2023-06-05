'use strict'

const {
    retrieveOrdersSchema
} = require('./schema')
const {
    retrieveOrders
} = require('./../../utils/order')

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

    fastify.get('/', { schema: retrieveOrdersSchema }, async function(request, reply) {
        const { userId } = request
        const { perPage = 10, page = 1 } = request.query

        const result = await retrieveOrders(this.mongo, userId, { perPage, page })

        if (!result) {
            return {
                orders: [],
                total: 0
            }
        }

        return result
    })
}
