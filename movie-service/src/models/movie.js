const Sequelize = require('sequelize');

/**
 *
 * @param db
 * @returns {Model}
 */
module.exports = function (db) {
    return db.define('movie', {
        title: {type: Sequelize.STRING, allowNull: false},
        imdbID: {type: Sequelize.STRING, unique: true, allowNull: false},
        hall: {type: Sequelize.TINYINT, allowNull: false},
        date: {type: Sequelize.DATE, allowNull: false},
    });
};