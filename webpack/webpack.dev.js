const merge = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')

const dev = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.DEBUG': JSON.stringify(true),
      'process.env.PHYSIC_DEBUG': JSON.stringify(true)
    })
  ]
}

module.exports = merge(common, dev)
