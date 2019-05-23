const fs = require('fs');

const DEFAULT_FILE_NAME = 'chunk-list.json';

function WebpackChunkListPlugin(options) {
  options = options || {};
  this.outputFilePath = options.path || DEFAULT_FILE_NAME;
}

//https://gist.github.com/kisenka/b31d3dd1d1a9182dde0bb3e3efe1a038

WebpackChunkListPlugin.prototype.apply = function(compiler) {
  let outputFilePath = this.outputFilePath;
  let result = [];

  compiler.plugin('emit', function(compilation, callback) {

    const stats = compilation.getStats().toJson();

    stats.assets.forEach(function (assetInfo) {
      result.push(assetInfo.name);
    });


    let resultString = JSON.stringify(result);

    fs.writeFile(outputFilePath, resultString, err => {
      if(err) callback(err);
      callback();
    });


  });

};

module.exports = WebpackChunkListPlugin;
