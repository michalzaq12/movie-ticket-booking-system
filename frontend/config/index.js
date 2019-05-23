const monfy = require('monfy');
const path = require('path');

let config = {

  port: 3333,

  build: {
    publicPath: '/',
    path: path.join(__dirname, '../dist'),
  },


  build__gh_pages: {
    publicPath: '/vue-web-starter',
    path: path.join(__dirname, '../docs')
  }


};

module.exports = monfy(config, process.env.WEBPACK);
