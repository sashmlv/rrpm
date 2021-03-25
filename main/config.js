'use strict';

const path = require( 'path' );
const IS_BUNDLE = typeof BUNDLE === 'boolean' ? BUNDLE : false;
const ROOT = path.resolve(
   __dirname,
   IS_BUNDLE ? '' : '..'
);
const FILE = `${ ROOT }/database.sqlite`;

const config = {
   DB: {
      FILE,
   }
};

module.exports = config;