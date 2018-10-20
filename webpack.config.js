const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BUILD_DIR = path.resolve(__dirname, 'public');
const SRC_DIR = path.resolve(__dirname, 'src');

const webpack = require('webpack');

module.exports = {
    entry: {
        main: ["babel-polyfill", `${SRC_DIR}/js/main.js`]
    },
    output: {
        path: BUILD_DIR,
        publicPath: '/',
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
            }, {
                test: /\.(eot|png|jpg|gif|svg|otf|ttf|woff|woff2)$/,
                use: 'file-loader',
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: `${SRC_DIR}/index.html`, to: `${BUILD_DIR}/index.html`},
            {from: `${SRC_DIR}/assets/`, to: `${BUILD_DIR}/assets/`}
        ]),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "/css/[name].css",
            chunkFilename: "/css/[id].css",
            allChunks: true
        }),
        new webpack.optimize.AggressiveMergingPlugin(), // Merge chunks
        new webpack.ProvidePlugin({
            Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
            fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
        })
    ]
};
