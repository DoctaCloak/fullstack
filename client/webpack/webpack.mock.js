const {merge} = require('webpack-merge');
const {createMockRoutes} = require('./mock-router');
const webpackCommon = require('./webpack.common');
const {createDefinePlugin} = require('./webpack-utils');
const mockRoutes = require('../mock-routes.json');

module.exports = merge(webpackCommon, {
  mode: 'development',
  devServer: {
    onBeforeSetupMiddleware: devServer =>
      createMockRoutes(mockRoutes, devServer.app),
  },
  plugins: [createDefinePlugin('mock')],
});
