'use strict'

const {
    findCustomerByUserId,
    updateCustomer
} = require('./../../utils/customer')
const {
    retrieveCustomerSchema,
    updateCustomerSchema
} = require('./schema')

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

    fastify.get('/me', { schema: retrieveCustomerSchema }, async function(request, reply) {
        return findCustomerByUserId(this.mongo, request.userId)
    })

    fastify.put('/me', { schema: updateCustomerSchema }, async function(request, reply) {
        return updateCustomer(this.mongo, request.userId, request.body)
    })
}
