'use strict'

const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')

const config = require('./../../config')
const {
    findUserByEmail,
    insertUser
} = require('../../utils/user')
const {
    sign
} = require('./../../utils/jwt')

const {
    loginSchema,
    registerSchema
} = require('./schema')

/**
 * @param {import('fastify').FastifyInstance} fastify
 * @param {Object} options
 */
module.exports = async function(fastify, options) {
    fastify.post('/login', { schema: loginSchema }, async function(request, reply) {
        const {
            email,
            password
        } = request.body

        const user = await findUserByEmail(this.mongo, email)

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw this.httpErrors.badRequest('Invalid credentials')
        }

        // const token = sign(user._id.toString(), { roles: user.roles })
        const token = sign(user.uuid, { roles: user.roles })
        return { ...user, token }
    })

    fastify.post('/register', { schema: registerSchema }, async function (request, reply) {
        const {
            firstname,
            lastname,
            email
        } = request.body

        if (await findUserByEmail(this.mongo, email)) {
            throw new this.httpErrors.badRequest('Email exists')
        }

        const uuid = uuidv4()
        const password = await bcrypt.hash(request.body.password, config.bcryptSaltRounds)

        await insertUser(this.mongo, {
            uuid,
            email,
            password,
            roles: ['customer']
        })

        const eventData = {
            firstname,
            lastname,
            email,
            uuid,
        }
        await this.publish('user.created', eventData)

        return { uuid }
    })
}
