const {monfyToArray} = require('monfy');
const webpack = require('webpack');
const {requireIfExists, resolve, HTML_INDEX_PATH, CHUNK_LIST_PATH, LIBRARY_MANIFEST_PATH} = require('./utils');


const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


console.log(process.env);
console.log(process.env.API_GATEWAY_URL);

let plugins = {
  friendly: new FriendlyErrorsPlugin(),

  define: new webpack.DefinePlugin({
    IS_DEV: process.env.WEBPACK === 'dev' ? JSON.stringify(true) : JSON.stringify(false),
    API_GATEWAY_URL: JSON.stringify(process.env.API_GATEWAY_URL),
    API_GATEWAY_PORT: JSON.stringify(process.env.API_GATEWAY_PORT)
  }),

  hot__dev: new webpack.HotModuleReplacementPlugin(),

  html: new HtmlWebpackPlugin({
    template: resolve('index.html'),
    filename: HTML_INDEX_PATH,
    inject: true,
    assets: requireIfExists(CHUNK_LIST_PATH)
  }),

  minify__dev$: new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    sourceMap: false
  }),

  extractCSS__dev$: new ExtractTextPlugin({
    filename: 'css/[name].[contenthash].css'
  }),

  dllReference: new webpack.DllReferencePlugin({
    context: process.cwd(),
    manifest: requireIfExists(LIBRARY_MANIFEST_PATH)
  })
};


module.exports = monfyToArray(plugins, process.env.WEBPACK);

