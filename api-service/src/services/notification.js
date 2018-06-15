const config = require('../config');
const amqp = require('amqplib');



let channel = null;


/**
 *
 * @param {string} q
 * @returns {Promise<void | Error>}
 */
async function createChannel(q) {
    try{
        const connection = await amqp.connect(config.amqp_url);
        const channel = await connection.createChannel();
        await channel.assertQueue(q);
        return channel;
    }catch (e){
        return Promise.reject(e);
    }
}


/**
 *
 * @param {string | object} text
 * @returns {Promise<void | Error>}
 */
async function sendMessage(text){
    try{
        channel = channel || await createChannel(config.services.notifications_q);
        return channel.sendToQueue(config.services.notifications_q, new Buffer(text));
    }catch(e){
        return Promise.reject(e);
    }
}


/**
 *
 * @type {{sendMessage: sendMessage}}
 */
module.exports = {
    sendMessage
};