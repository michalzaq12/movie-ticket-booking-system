

module.exports = {
    amqp_url: process.env.AMQP_URL || 'amqp://guest:guest@localhost',

    services: {
        notifications_q: process.env.NOTIFICATIONS_QUEUE || 'notifications',
        movies_q: process.env.MOVIES_QUEUE || 'movies'
    }

};