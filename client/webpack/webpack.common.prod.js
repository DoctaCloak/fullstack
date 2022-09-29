const {merge} = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpackCommon = require('./webpack.common');

module.exports = merge(webpackCommon, {
  mode: 'production',
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
});
