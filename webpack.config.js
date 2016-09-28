const path = require('path');

module.exports = {
  context: __dirname,
  entry: './public/src/app.js',
  output: {
    path: path.join(__dirname, '/public/dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015'],
      },
    }],
  },
  devtool: 'source-map',
};
