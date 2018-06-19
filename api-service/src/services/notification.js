const config = require('../config');
const amqp = require('amqplib');


/**
 *
 * @param {string} q
 * @returns {Promise<*|Error>}
 */
async function createChannel(q) {
    const connection = await amqp.connect(config.amqp_url);
    const channel = await connection.createChannel();
    await channel.assertQueue(q);
    return channel;
}


let channel = null;

module.exports = {
    /**
     *
     * @param {object} mail
     * @returns {Promise<void | Error>}
     */
    async send(mail){
        channel = channel || await createChannel(config.services.notifications_q);
        return channel.sendToQueue(config.services.notifications_q, new Buffer(JSON.stringify(mail)));
    }
};