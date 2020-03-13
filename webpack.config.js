const path = require('path');

// Production mode automatically sets usedExports: true
// This config just sets a bundle type (umd)
// and makes sure everything gets run through babel loader.
// Does not need CSS loader because the library has no CSS.
const config = {
  entry: './src/index.js',

  mode: 'production',

  optimization: {
    usedExports: true,
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
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
