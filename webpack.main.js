'use strict';

const webpack = require( 'webpack' ),
   path = require( 'path' ),
   MAIN = path.resolve( __dirname, 'main' ),
   DIST = path.resolve( __dirname, 'dist' ),
   mode = process.env.NODE_ENV || 'development',
   prod = mode === 'production';

module.exports = {

   target: 'electron-main',
   mode,
   devtool: prod ? false : 'source-map',
   entry: {

      main: path.resolve( MAIN, 'index.js' ),
   },
   output: {

      path: DIST,
      publicPath: `/`,
      filename: 'index.js',
      clean: {
         keep(asset) {
            return [
               'favicon.ico',
               'gui.js',
               'gui.js.map',
               'index.html',
               'styles.css',
               'styles.css.map',
            ].find(v => asset.includes(v));
         },
      },
   },
   plugins: [

      new webpack.DefinePlugin({
         BUNDLE: JSON.stringify(true)
      })
   ],
};
