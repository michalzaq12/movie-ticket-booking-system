

module.exports = {
    // amqp_url: 'amqp://guest:guest@rabbitmq'
    amqp_url: 'amqp://guest:guest@localhost',

    q: process.env.MOVIES_QUEUE || 'movies',

    services: {
        notifications_q: process.env.NOTIFICATIONS_QUEUE || 'notifications'
    }

};