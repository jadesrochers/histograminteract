const path = require('path');

const config = {
  entry: './src/index.js',

  mode: 'production',

  optimization: {
    usedExports: true,
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "./dist",
    library: '@jadesrochers/histograminteract',
    libraryTarget: 'umd',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: {
          loader: 'babel-loader',
        }
      },
    ],
  }
}

module.exports = config;
