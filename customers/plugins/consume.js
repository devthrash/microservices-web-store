'use strict'

/**
 * @type {import('fastify-plugin').FastifyPlugin}
 */
const fp = require('fastify-plugin')
const amqp = require('amqplib')
const config = require('./../config')

const {
    insertCustomer
} = require('./../utils/customer')

function decodeJson(str) {
    try {
        return JSON.parse(str)
    } catch (err) {
        return null
    }
}

async function createChannel() {
    const connection = await amqp.connect(config.amqpUrl)
    return connection.createChannel()
}

async function consumeMessage(mongo, channel, message) {
    const content = decodeJson(message.content)

    if (!content) {
        return channel.ack(message)
    }

    const { uuid, ...opts } = content

    try {
        await insertCustomer(mongo, uuid, opts)

        channel.ack(message)
        console.log('msg ack')
    } catch (err) {
        channel.reject(message, true)
        console.log('mgs error', err)
    }
}

module.exports = fp(async function rabbitPlugin(fastify, opts) {
    const channel = await createChannel()

    await channel.assertQueue('customer_create_customer', {
        durable: true
    })
    await channel.bindQueue('customer_create_customer', 'user', 'user.created')
    await channel.prefetch(5)

    fastify.addHook('onReady', async function () {
        await channel.consume('customer_create_customer', (message) => {
            consumeMessage(fastify.mongo, channel, message)
        }, { noAck: false })

        fastify.log.debug('Consumer started')
    })
});
