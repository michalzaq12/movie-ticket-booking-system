const Sequelize = require('sequelize');
const config = require('../config/db');

const db = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: config.logging,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});




const Movie = require('./movie')(db);
const Seats = require('./seat')(db);
const Order = require('./order')(db);






Movie.hasMany(Seats);


Order.belongsTo(Movie);
Seats.belongsToMany(Order, {through: 'OrderSeats'});
Order.belongsToMany(Seats, {through: 'OrderSeats'});



module.exports = {
    db,
    Movie,
    Seats,
    Order
};


