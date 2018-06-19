const amqp = require('amqplib');
const config = require('./config');
const notificationController = require('./controllers/notification');


console.log('> notification service starting...');

/**
 *
 * @param {string} q
 * @returns {Promise<amqp.channel | Error>}
 */
async function createChannel(q) {
    const connection = await amqp.connect(config.amqp_url);
    const channel = await connection.createChannel();
    await channel.assertQueue(q);
    return channel;
}


/**
 *
 * @param {amqp.channel} channel
 * @param {object} msg
 * @param {Buffer} msg.content
 * @returns {Promise<void|Error>}
 */
async function consume(channel, msg) {
    if(msg === null) return;
    try {
        const mail = JSON.parse(msg.content.toString());
        console.log(`> Sending email to ${mail.to} ...`);
        await notificationController.send(mail);
        console.log(`> Email has been successfully send to ${mail.to}`);
        channel.ack(msg);
    }catch (e) {
        console.log(e);
    }
}



createChannel(config.q).then(channel => {
    console.log('> notification service listening for messages');
    channel.consume(config.q, msg => consume(channel, msg));
}).catch(console.log);