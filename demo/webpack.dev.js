/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/* eslint-enable */

module.exports = {
    entry: {
        index: `${__dirname}/index.js`,
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "..", "demo-dist"),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                loader: 'babel-loader',
                query: {
                    presets: [['es2015'], 'react', 'stage-0'],
                    plugins: ['add-module-exports'],
                    babelrc: false,
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000&minetype=application/font-woff',
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=10000&minetype=application/octet-stream',
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=10000&minetype=image/svg+xml',
            },
            {
                test: /\.(eot|png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${__dirname}/index.html`,
        }),
    ],
    devtool: '#eval-source-map'
};
