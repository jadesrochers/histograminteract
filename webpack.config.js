const path = require('path');

// Production mode automatically sets usedExports: true
// This config just sets a bundle type (umd)
// and makes sure everything gets run through babel loader.
// Does not need CSS loader because the library has no CSS.
// IMPORTANT: even though I have React correctly set as a dev/peerdependency,
// Webpack will still include a ref to it, so you need the externals:
// statement for sure.
const config = {
  entry: './src/index.js',

  mode: 'production',

  optimization: {
    usedExports: true,
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    library: '@jadesrochers/histograminteract',
    filename: 'bundle.js',
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
  },

  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': 'react-dom',
    'reactDOM': 'react-dom',
  },


}

module.exports = config;
