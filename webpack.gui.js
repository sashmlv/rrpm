'use strict';

const path = require( 'path' ),
   MiniCssExtractPlugin   = require( 'mini-css-extract-plugin' ),
   CopyPlugin = require( 'copy-webpack-plugin' ),
   ROOT = path.resolve( __dirname ),
   GUI  = path.resolve( __dirname, 'gui' ),
   MAIN = path.resolve( __dirname, 'main' ),
   DIST = path.resolve( __dirname, 'dist' ),
   mode = process.env.NODE_ENV || 'development',
   prod = mode === 'production';

module.exports = {

   // target: 'electron-renderer',
   mode,
   devtool: prod ? false : 'source-map',
   entry: {

      gui:  path.resolve( GUI,  'app.js' ),
   },
   output: {

      path: DIST,
      publicPath: `/`,
      filename: '[name].js',
      clean: {
         keep(asset) {
            return [
               'index.js',
               'index.js.map',
            ].find(v => asset.includes(v));
         },
      },
   },
   devServer: {

      contentBase: DIST,
      index: 'index.html',
      port: 3000,
      host: 'localhost',
      hot: true,
   },
   resolve: {

      alias: {
         svelte: path.dirname(
            require.resolve( 'svelte/package.json' )
         )
      },
      extensions: [ '.mjs', '.js', '.svelte' ],
      mainFields: [ 'svelte', 'browser', 'module', 'main' ]
   },
   module: {
      rules: [
         {
            // required to prevent errors from Svelte on Webpack 5+
            test: /node_modules\/svelte\/.*\.mjs$/,
            resolve: {
               fullySpecified: false
            }
         },
         {
            test: /\.svelte$/,
            use: {
               loader: 'svelte-loader',
               options: {
                  compilerOptions: {
                     dev: !prod
                  },
                  emitCss: prod,
                  hotReload: !prod
               }
            }
         },
         {
            test: /\.(scss|css)$/,
            use: [

               MiniCssExtractPlugin.loader,
               'css-loader',
               'sass-loader',
            ],
         },
      ]
   },
   plugins: [

      new MiniCssExtractPlugin({ filename: 'styles.css', }),
      new CopyPlugin({
         patterns: [
            { from: 'gui/index.html' },
            { from: 'gui/favicon.ico' },
         ],
      }),
   ],
};
