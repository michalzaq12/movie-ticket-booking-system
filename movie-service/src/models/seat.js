const Sequelize = require('sequelize');

/**
 *
 * @param db
 * @returns {Model}
 */
module.exports = function (db) {
    return db.define('seat', {
        isAvailable: {type: Sequelize.BOOLEAN, defaultValue: true},
        row: {type: Sequelize.CHAR(1), allowNull: false},
        column: {type: Sequelize.TINYINT, allowNull: false},
    });
};