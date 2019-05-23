const config = require('../config');
const {resolve} = require('./utils');
const monfy = require('monfy');

const loaders = require('./loaders.conf');
const plugins = require('./plugins.conf');

let webpackConfig = {
  entry: {
    main: [resolve('src/main.js')],
    main__dev: ['webpack-hot-middleware/client?reload=true', resolve('src/main.js')],
  },
  output: {
    publicPath: config.build.publicPath,
    path: config.build.path,
    filename: '[name].js',
  },
  resolveLoader: {
    modules: [resolve('node_modules')]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.scss', 'css'],
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js',
      '@': resolve('src')
    },
    modules: [resolve('node_modules')]
  },
  module: {
    rules: loaders
  },
  plugins: plugins,
  devtool__dev: '#cheap-module-eval-source-map'
};


module.exports = monfy(webpackConfig, process.env.WEBPACK);
