const config = require('../../config');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('../webpack.conf');


process.env.BABEL_ENV = 'dev';


const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false
});

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'});
    cb()
  })
});

const app = express();
app.use('/', express.static(config.build.path));
app.use(hotMiddleware);
app.use(devMiddleware);



console.log('> Starting dev server...');
devMiddleware.waitUntilValid(() => {
  const PORT = config.port;
  app.listen(PORT, () => {
    console.log(`> Listening at http://localhost:${PORT} \n`)
  });
});

