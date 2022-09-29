const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

/**
 * @internal
 */
const ROOT_DIR = path.resolve('./');
const SRC_DIR = path.resolve(ROOT_DIR, 'src');

module.exports = {
  devtool: 'source-map',
  devServer: {
    https: true,
  },
  entry: {
    app: path.resolve(SRC_DIR, 'index.js'),
  },
  output: {
    path: path.resolve(ROOT_DIR, 'dist'),
    filename: 'js/[name].js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: path.resolve(ROOT_DIR, 'public/index.html'),
      chunks: ['app'],
      hash: true,
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: path.resolve(ROOT_DIR, 'public/index.html'),
      chunks: ['app'],
      hash: true,
    }),
    new ESLintPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              modules: false,
            },
          },
          {loader: 'sass-loader'},
        ],
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true,
              svgo: {
                plugins: [
                  {
                    removeViewBox: false,
                    removeXMLProcInst: true,
                    removeDoctype: true,
                    removeComments: true,
                    removeTitle: true,
                  },
                ],
              },
            },
          },
        ],
      },
      {
        test: [/\.(woff|woff2|ttf|eot|png|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/],
        use: {
          loader: 'file-loader',
          options: {
            name: 'public/assets/[name].[ext]',
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      components: path.resolve(SRC_DIR, 'components/'),
      contexts: path.resolve(SRC_DIR, 'contexts/'),
      providers: path.resolve(SRC_DIR, 'components/providers/'),
      Services: path.resolve(SRC_DIR, 'Services/'),
      store: path.resolve(SRC_DIR, 'store/'),
      utils: path.resolve(SRC_DIR, 'utils/'),
    },
    modules: [
      path.resolve(ROOT_DIR, 'src'),
      path.resolve(ROOT_DIR, 'node_modules'),
    ],
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.scss'],
  },
};

console.log(ROOT_DIR);
