const merge = require('webpack-merge')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.NoEmitOnErrorsPlugin()
  ]
})
