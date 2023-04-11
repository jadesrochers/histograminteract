const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
    template: "./template/index.html",
    filename: "./index.html"
});


// Entrypoint is index.js, but the dev server will
// load the index.html once html-webpack-plugin generates it from
// the template.
// The devServer config sets historyApiFallback: true, which directs
// all request failures to index.html, which is needed for Reach Router.
// The resolve/alias block allows me to import components 
// from 'histograminteract' instead of needing the full path.
// The modules specify what to do with JS and CSS code, using the babel
// and style/css loaders. CSS loader probably not needed, very simple css here.
// The htmlWebpackPlugin must be listed in plugins to generate index.html,
// don't know what the loaderOptionsPlugin does.
const config = {
    mode: 'development',
    entry: [ './index.js', ],
    context: __dirname,

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },

    devServer: {
        contentBase: __dirname,
        historyApiFallback: true,
        inline: true,
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        htmlWebpackPlugin,
    ],

    resolve: {
        alias: {
            histograminteract: path.join(__dirname, '..', 'src/index.js'),
        },
        extensions: ['.js', '.jsx', '.json'],
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname ),
                    path.resolve(__dirname, '..', 'src'),
                ],
                use: { loader: 'babel-loader',
                }
            },
            {
                include: [
                    path.resolve(__dirname ),
                ],
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },

};


module.exports = config
