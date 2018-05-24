const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    background: './src/background.js',
    inject: './src/injection/inject.js',
    content: './src/content.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['env', 'stage-2']
      }
    }]
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: "src/manifest.json", to: '../dist'},
      {from: "src/injection/moocplayer.js", to: '../dist/moocplayer.js'},
      {context: 'src/popups/', from : "*" , to : '../dist/popups'},
      {context: 'src/assets/', from : "*/*" , to : '../dist/assets'},
    ])
  ],
};

