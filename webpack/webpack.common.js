const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { InjectManifest } = require('workbox-webpack-plugin')


const config = {
  entry: ['./src/game.ts'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      Utils: path.resolve(__dirname, '../src/utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, '../src'),
        // loader: ['ts-loader'],
        // loader: ['babel-loader', 'ts-loader'],
        loader: ['babel-loader'],
      },
      {
        test: /\.tsx?$/,
        include: path.join(__dirname, '../src'),
        loader: ['ts-loader'],
        // loader: ['babel-loader', 'ts-loader'],
        // loader: ['babel-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          filename: '[name].bundle.js',
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({ gameName: 'Zackexplosion 感謝您的贊助 :)', template: 'src/index.html' }),
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'assets',
      },
      // { from: 'pwa', to: '' },
      { from: 'src/favicon.ico', to: '' },
    ]),
    // new SpritesmithPlugin({
    //   src: {
    //     // cwd: path.resolve(__dirname, './src/assets/members-profile-images'),
    //     cwd: path.resolve('../src/assets/members-profile-images'),
    //     glob: '*.jpg'
    //   },
    //   target: {
    //     image: path.resolve('../src/members-profile-sprite.jpg'),
    //     css: '/tmp/tmp.css'
    //   },
    // apiOptions: {
    //   cssImageRef: "~sprite.png"
    // }
    // })
    // new InjectManifest({
    //   swSrc: path.resolve(__dirname, '../pwa/sw.js'),
    // }),
  ],
}
module.exports = config

// console.log(config)
