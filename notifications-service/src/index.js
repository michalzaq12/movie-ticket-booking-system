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
    try{
        const connection = await amqp.connect(config.amqp_url);
        const channel = await connection.createChannel();
        await channel.assertQueue(q);
        return channel;
    }catch (e){
        return Promise.reject(e);
    }
}


createChannel(config.q).then(channel => {
    console.log('> notification service listening for messages');
   channel.consume(config.q, msg => {
      if(msg != null){
          console.log('msg: ', msg.content.toString());
          notificationController.send({
              from: '"Fred Foo 👻" <foo@example.com>', // sender address
              to: 'michalzaq12@gmail.com', // list of receivers
              subject: 'Hello ✔', // Subject line
              text: 'Hello world?', // plain text body
          }).then(() => {
              console.log('Success send message');
              channel.ack(msg);
          }).catch(console.log)
      }
   });
}).catch(console.log);








