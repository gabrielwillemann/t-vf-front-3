const Module = require('module');
const defaultRequire = Module.prototype.require;

Module.prototype.require = function(...args) {
  if (args[0] === 'vue') {
    return defaultRequire.apply(this, ['vue2']);
  }
  return defaultRequire.apply(this, args);
};

const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  devServer: {
    contentBase: '/home/my/dev/tests/t-vf-front-3/server',
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 8004,
    proxy: {
      '/eng2/*': {
        target: 'http://0.0.0.0:8004/',
        pathRewrite: { '^/eng2': '' },
      },
    },
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{ loader: 'babel-loader', query: { cacheDirectory: true } }],
      },
      { test: /\.vue$/, use: [{ loader: 'cache-loader' }, { loader: 'vue-loader' }] },
    ],
  },
  output: {
    jsonpFunction: '_vfP',
    filename: '[name].js',
    chunkFilename: 'chunks/[name].[chunkhash].js',
    path: '/home/my/dev/tests/t-vf-front-3/dist/release',
  },
  resolve: {
    alias: {
      vue: 'vue2/dist/vue.esm.js',
    },
  },
  entry: {
    'vf-v2': '/home/my/dev/tests/t-vf-front-3/src/main-vue2.js',
  },
  plugins: [new VueLoaderPlugin()],
};
