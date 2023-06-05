const { v4: uuidv4 } = require('uuid')

module.exports.generateSessionId = () => {
    return uuidv4().replaceAll('-', '')
}
