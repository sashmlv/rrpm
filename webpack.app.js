'use strict';

const path = require( 'path' ),
   MiniCssExtractPlugin   = require( 'mini-css-extract-plugin' ),
   ESLintPlugin = require( 'eslint-webpack-plugin' ),
   CopyPlugin = require( 'copy-webpack-plugin' ),
   ROOT = path.resolve( __dirname ),
   APP  = path.resolve( ROOT, 'app' ),
   MAIN = path.resolve( ROOT, 'main' ),
   DIST = path.resolve( ROOT, 'dist' ),
   NODE_MODULES = path.resolve( ROOT, 'node_modules' ),
   mode = process.env.NODE_ENV || 'development',
   prod = mode === 'production';

module.exports = {

   // target: 'electron-renderer',
   mode,
   devtool: prod ? false : 'source-map',
   entry: {

      app:  path.resolve( APP,  'app.js' ),
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
         ),
         components: path.resolve( APP, 'components' ),
         stores: path.resolve( APP, 'stores.js' ),
         'spectre.css': path.resolve( NODE_MODULES, 'spectre.css' ),
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
            test: /\.(css)$/,
            use: [

               MiniCssExtractPlugin.loader,
               'css-loader',
            ],
         },
      ]
   },
   plugins: [

      new ESLintPlugin({
         baseConfig: {
            extends: [
		         'eslint:recommended',
               'plugin:radar/recommended',
               'plugin:sonarjs/recommended',
               'plugin:security/recommended',
            ],
            parserOptions: {
               ecmaVersion: 12,
               sourceType: 'module'
            },
            env: {
               es6: true,
               browser: true
            },
            plugins: [
               'svelte3',
               'xss',
               'radar',
		         'unicorn',
               'sonarjs',
               'promise',
               'security',
            ],
            overrides: [
               {
                  files: [ '*.svelte' ],
                  processor: 'svelte3/svelte3'
               }
            ],
         },
         overrideConfig: {
            rules: {
               indent: ['error', 3]
            }
         }
      }
      ),
      new MiniCssExtractPlugin({ filename: 'styles.css', }),
      new CopyPlugin({
         patterns: [
            { from: 'app/public/index.html' },
            { from: 'app/public/favicon.ico' },
         ],
      }),
   ],
};
