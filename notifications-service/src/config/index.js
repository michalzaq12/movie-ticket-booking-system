

module.exports = {
    amqp_url: process.env.AMQP_URL || 'amqp://guest:guest@rabbitmq',
    //amqp_url: 'amqp://guest:guest@localhost',

    q: process.env.NOTIFICATIONS_QUEUE || 'notifications'

};