const merge = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')

const dev = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: true
  }
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false
    })
  ]
}

module.exports = merge(common, dev)
