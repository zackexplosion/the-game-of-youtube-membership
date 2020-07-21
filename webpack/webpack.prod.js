const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const JavaScriptObfuscator = require('webpack-obfuscator')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const prod = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[contenthash].chunk.js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          filename: '[name].[contenthash].bundle.js'
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist/*.js')] }),
    new JavaScriptObfuscator(
      {
        rotateStringArray: true,
        stringArray: true,
        // stringArrayEncoding: 'base64', // disabled by default
        stringArrayThreshold: 0.75
      },
      ['vendors.*.js']
    ),
    // fix path from phasereditor2d generated asset-pack.json
    new CopyWebpackPlugin([{
      from: 'src/assets/asset-pack.json',
      to: 'assets/asset-pack.json',
      force: true,
      transform(content, path) {
        content = JSON.stringify(JSON.parse(content.toString())).replace(/src\//gm, '')
        return content
      }
    }]),
  ]
}
const config = merge(common, prod)
module.exports = config
