'use strict'

/**
 * @type {import('fastify-plugin').FastifyPlugin}
 */
const fastifyPlugin = require('fastify-plugin')
const amqp = require('amqplib')

const config = require('./../config')

module.exports = fastifyPlugin(async function(fastify, options) {
    const connection = await amqp.connect(config.amqpUrl);
    const channel = await connection.createChannel()

    fastify.addHook('onClose', async () => {
        await connection.close();
    })

    const publish = (event, data) => {
        channel.publish('user', event, Buffer.from(JSON.stringify(data)))
    }

    fastify.decorate('publish', publish)

    await channel.assertExchange('user', 'direct')
})
