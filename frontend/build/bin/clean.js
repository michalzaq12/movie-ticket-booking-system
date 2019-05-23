const rimraf = require('rimraf');
const config = require('../../config');

const OUTPUT_PATH = config.build.path;

console.log(`> Cleaning output directory: ${OUTPUT_PATH}`);

rimraf.sync(OUTPUT_PATH);
