const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    output: {
        libraryTarget: 'commonjs2', // necessary for the babel plugin
        path: path.join(__dirname, 'dist'), // where to place webpack files
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                }),
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader'],
                }),
            },
        ],
    },

    plugins: [
        new ExtractTextPlugin({
            filename: `${path.parse(process.argv[2]).name}.css`,
        }),
    ],
};
