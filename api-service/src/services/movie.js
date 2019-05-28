const config = require('../config');
const amqp = require('amqplib');
const uuid = require('node-uuid');


let globalChannel = null;
let replyQueue = null;
const promises = new Map(); // correlationId => Function - callback

/**
 *
 * @param {string} q
 * @returns {Promise<*|Error>}
 */
async function createChannel(q) {
    const connection = await amqp.connect(config.amqp_url);
    const channel = await connection.createChannel();
    await channel.assertQueue(q);
    const {queue: tmp} = await channel.assertQueue('', {exclusive: true});
    replyQueue = tmp;
    return channel;
}


function sendMessage(data){
    return new Promise((resolve, reject) => {
        const corrId = uuid();

        promises.set(corrId, msg => {
            const data = JSON.parse(msg.content.toString());
            if(data.error !== undefined){
                reject(data);
            }
            else {
                resolve(data.body);
            }
        });

        globalChannel.sendToQueue(config.services.movies_q, new Buffer(JSON.stringify(data)), {
            correlationId: corrId, replyTo: replyQueue
        });
    })
}
createChannel(config.services.movies_q).then(channel => {
    globalChannel = channel;
    console.log('> API listening for replies');
    channel.consume(replyQueue, msg => {
        const corrId = msg.properties.correlationId;
        if(!promises.has(corrId)) console.log('Invalid corrId');
        const promise = promises.get(corrId);
        promise(msg);
        promises.delete(corrId);
    }, {noAck: true})
});

module.exports = {
    /**
     *
     * @param {object} data
     * @returns {Promise<void | Error>}
     */
    createMovie(data){
        return sendMessage({action: 'movie.create', body: data})
    },

    getAllMovies(){
        return sendMessage({action: 'movie.getAll'})
    },

    getMovieById(id){
        return sendMessage({action: 'movie.getById', body: id})
    },

    getTrailer(title, year){
        return sendMessage({action: 'movie.getTrailer', body: {title: title, year: year}})
    },

    createOrder(data){
        return sendMessage({action: 'order.create', body: data})
    },

    getAllOrders(){
        return sendMessage({action: 'order.getAll'})
    }
};