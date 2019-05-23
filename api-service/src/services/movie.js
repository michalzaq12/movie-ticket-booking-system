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
        console.log('ID: ', corrId);
        //channel = channel || await createChannel(config.services.movies_q);

        promises.set(corrId, msg => {
            const data = JSON.parse(msg.content.toString());
            if(data.error !== undefined){
                console.log('reject');
                reject(data);
            }
            else {
                console.log('reseolve');
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
    console.log(replyQueue);
    channel.consume(replyQueue, msg => {
        console.log('Get message: ', msg);
        const corrId = msg.properties.correlationId;
        if(!promises.has(corrId)) {
            console.log('Invalid corrId');
        }
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

    async getAllMovies(){
        return sendMessage({action: 'movie.getAll'})
    },

    async getMovieById(id){
        return sendMessage({action: 'movie.getById', body: id})
    },

    createOrder(data){
        return sendMessage({action: 'order.create', body: data})
    },

    getAllOrders(){
        return sendMessage({action: 'order.getAll'})
    }
};