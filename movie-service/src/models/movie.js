const Sequelize = require('sequelize');

/**
 *
 * @param db
 * @returns {Model}
 */
module.exports = function (db) {
    return db.define('movie', {
        imdbID: {type: Sequelize.STRING, unique: true, allowNull: false},
        hall: {type: Sequelize.TINYINT, allowNull: false},
    });
};