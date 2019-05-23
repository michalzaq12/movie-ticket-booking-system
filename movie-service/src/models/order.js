const Sequelize = require('sequelize');

/**
 *
 * @param db
 * @returns {Model}
 */
module.exports = function (db) {
    return db.define('order', {
        total: {type: Sequelize.DECIMAL(10,2), defaultValue: 50.0},
    });
};