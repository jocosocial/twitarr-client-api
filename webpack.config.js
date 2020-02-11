var webpack = require('webpack');
var path = require('path');
var TypedocWebpackPlugin = require('typedoc-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

var pkginfo = require('./package.json');

var createVariants = require('parallel-webpack').createVariants;

var clonedeep = require('lodash.clonedeep');

var argv = require('yargs').argv;
var isProduction = argv.env === 'production';
// var justDocs = argv.env === 'docs';

var libraryName = 'twitarr';

var variants = {
  target: [ 'web', 'node' ],
};

if (isProduction) {
  variants.production = [ true, false ];
}

/*
if (justDocs) {
  variants = {
    target: ['node'],
    docs: [true],
  };
}
*/

var config = {
  entry: {
    'twitarr': __dirname + '/src/API.ts',
  },
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.[jt]sx?)$/,
        use: [
          'cache-loader',
          'babel-loader'
        ],
        exclude: [/node_modules/]
      }
    ],
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ],
    extensions: ['.webpack.js', '.web.js', '.ts', '.js']
  },
  plugins: [
    new webpack.IgnorePlugin(/^encoding$/, /node-fetch/),
  ],
  node: {
    fs: 'empty',
    __dirname: true,
    child_process: false,
    global: true,
    process: false
  }
};

function createConfig(options) {
  var myconf = clonedeep(config);
  myconf.output.filename = '[name]';
  var defs = {
    'IS_WEB': options.target === 'web',
    'IS_PRODUCTION': options.production,
    'global.TWITARR_JS_VERSION': JSON.stringify(pkginfo.version),
  };

  myconf.mode = options.production? 'production':'development';

  if (options.target === 'web') {
    myconf.target = 'web';
  } else {
    myconf.target = 'node';
    myconf.node = { process: false };
  }

  if (options.target === 'node') {
    myconf.output.filename += '.node';
    myconf.entry.cli = __dirname + '/src/CLI.ts';
    myconf.plugins.push(new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
      entryOnly: true,
      include: /cli/i,
    }));
  }

  if (!myconf.optimization) {
    myconf.optimization = {};
  }

  if (options.production) {
    myconf.optimization.minimize = true;
    if (!myconf.optimization.minimizer) {
      myconf.optimization.minimizer = [];
    } else {
      console.log('minimizer exists:',myconf.optimization.minimizer);
    }
    myconf.optimization.minimizer.push(new TerserPlugin({
      extractComments: false,
      terserOptions: {
        mangle: {
          keep_classnames: true,
          keep_fnames: true,
          reserved: [ '$element', '$super', '$scope', '$uib', '$', 'jQuery', 'exports', 'require', 'angular', 'c3', 'd3' ]
        },
        compress: true,
      },
    }));

    myconf.module.rules.unshift({
      // run eslint on typescript files before rendering
      enforce: 'pre',
      test: /\.(js|ts)x?$/,
      use: [
        {
          loader: 'eslint-loader',
          options: {
            cache: true,
            failOnError: true,
          }
        }
      ],
      exclude: [/node_modules/]
    });

    defs['global.GENTLY'] = false;
  
    myconf.plugins.push(new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }));
    myconf.output.filename += '.min';
  }

  myconf.plugins.push(new webpack.DefinePlugin(defs));
  myconf.plugins.push(new webpack.ProvidePlugin({X2JS: 'x2js'}));

  // build docs either on a dedicated doc build, or during production node.js build
  //var buildDocs = !!(justDocs || (options.production && options.target === 'node'));
  const buildDocs = false;
  if (buildDocs) {
    // generate documentation
    var tsconfig = require('./tsconfig.json');
    tsconfig.name = 'twitarr.js';
    tsconfig.mode = 'file';
    tsconfig.ignoreCompilerErrors = true;
    tsconfig.exclude = "/**/+(node_modules|test)/**/*";
    tsconfig.excludeExternals = false;
    myconf.plugins.push(new TypedocWebpackPlugin(tsconfig));
  }

  myconf.output.filename += '.js';

  console.log('Building variant: target=' + options.target + ', production=' + Boolean(options.production) + ', docs=' + buildDocs);

  return myconf;
}

module.exports = createVariants({}, variants, createConfig);
