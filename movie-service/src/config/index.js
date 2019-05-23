module.exports = {
    amqp_url: process.env.AMQP_URL || 'amqp://guest:guest@localhost',

    movies_q: process.env.MOVIES_QUEUE || 'movies',
    orders_q: process.env.ORDERS_QUEUE || 'orders',

    services: {
        notifications_q: process.env.NOTIFICATIONS_QUEUE || 'notifications'
    }

};