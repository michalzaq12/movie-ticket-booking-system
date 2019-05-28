const amqp = require('amqplib');
const config = require('./config');

const movieController = require('./controllers/movie');
const orderController = require('./controllers/order');
const models = require('./models');

console.log('> movie service starting...');

/**
 *
 * @param {string} q
 * @returns {Promise<amqp.channel | Error>}
 */
async function createChannel(q) {
    const connection = await amqp.connect(config.amqp_url);
    const channel = await connection.createChannel();
    await channel.assertQueue(q);
    //NOTE: set maximum allowed number of unacknowledged messages
    channel.prefetch(1);
    return channel;
}


/**
 *
 * @param {amqp.channel} channel
 * @param {object} msg
 * @param {Buffer} msg.content
 * @returns {Promise<void|Error>}
 */
async function processMessage(channel, msg) {
    if(msg === null) return;
    try {
        const data = JSON.parse(msg.content.toString());

        console.log('Dispatch action: ', data.action);
        let actionResult = null;

        switch (data.action){
            case 'movie.create':
                actionResult = await movieController.create(data.body);
                break;
            case 'movie.getAll':
                actionResult = await movieController.getAll();
                break;
            case 'movie.getById':
                actionResult = await movieController.getById(parseInt(data.body));
                break;
            case 'movie.getTrailer':
                actionResult = await movieController.getTrailer(data.body);
                break;
            case 'order.create':
                actionResult = await orderController.create(data.body);
                break;
            case 'order.getAll':
                actionResult = await orderController.getAll();
                break;
            default:
                throw new Error('Invalid action name');
                break;
        }


        const response = {
            code: 200,
            body: actionResult
        };

        channel.ack(msg);
        channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(response)), {correlationId: msg.properties.correlationId});

    }catch (e) {
        console.log('Error in movie-service', e);
        const response = {
            code: e.code || 500,
            error: e.message || 'Error in movie-service'
        };
        if(process.env.NODE_ENV !== 'production') response.stack = e.stack;
        channel.ack(msg);
        channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(response)), {correlationId: msg.properties.correlationId});
    }
}






// createChannel(config.orders_q).then(channel => {
//     console.log('> orders service listening for messages');
//     channel.consume(config.orders_q, msg => createOrder(channel, msg));
// }).catch(console.log);

// sync() will create all table if they doesn't exist in database
models.db.sync().then(()=>{
    createChannel(config.movies_q).then(channel => {
        console.log('> movie service listening for messages');
        channel.consume(config.movies_q, msg => processMessage(channel, msg));
    }).catch(console.log);
});