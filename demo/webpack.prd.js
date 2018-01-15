/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
/* eslint-enable */

module.exports = {
    entry: {
        index: `${__dirname}/index.js`,
        vendor: [
            'react',
            'react-dom',
            'draft-js',
        ],
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '..', 'demo-dist'),
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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader'],
                }),
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                }),
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
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new HtmlWebpackPlugin({
            template: `${__dirname}/index.html`,
        }),
        new ExtractTextPlugin({
            filename: 'index.css',
        }),
    ],
    devtool: '#eval-source-map'
};
