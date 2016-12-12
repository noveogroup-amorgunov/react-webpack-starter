const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const defaults = {
  entry: './app/index.jsx',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
    //   test: path.join(__dirname, 'app'),
    //   test: /\.js$/
    //   exclude: /node_modules|libs|vendor/,
    //   loader: 'babel-loader',
    //   // query: {
    //   //   presets: 'es2015',
    //   // },
    // }/*, {
    //   test: /\.jsx$/,
    //   loader: 'jsx-loader?insertPragma=React.DOM&harmony'
    // }*/]
    // {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components|public)/,
      loader: "babel"
    }],
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    root: path.resolve('./app'),
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './app/index.html'),
      filename: 'index.html',
      inject: 'body'
    })
  ],
};

module.exports = defaults;
