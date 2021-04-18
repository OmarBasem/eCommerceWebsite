var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
const fs = require('fs');
const WebpackOnBuildPlugin = require('on-build-webpack');
const buildDir = './assets/bundles/';

module.exports = {
    context: __dirname,
    watch: true,

    entry: ['babel-polyfill', './src/index.js'],

    output: {
        path: path.resolve('./assets/bundles/'),
        filename: "[name]-[hash].js",
    },

    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        new WebpackOnBuildPlugin(function (stats) {
            const newlyCreatedAssets = stats.compilation.assets;

            const unlinked = [];
            fs.readdir(path.resolve(buildDir), (err, files) => {
                files.forEach(file => {
                    if (!newlyCreatedAssets[file]) {
                        fs.unlink(path.resolve(buildDir + file), (err) => {
                            if (err) throw err;
                            unlinked.push(file);
                        })
                    }
                });
                if (unlinked.length > 0) {
                    console.log('Removed old assets: ', unlinked);
                }
            });

        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
new webpack.optimize.UglifyJsPlugin()
    ],

    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
            {test: /\.(png|jpg|jpeg)$/, loader: 'file-loader'},
            {test: /\.(png|jpg|jpeg)$/, loader: 'url-loader'},
            {
                test: /\.css$/,
                loader: 'style-loader'
            }, {
                test: /\.css$/,
                loader: 'css-loader',
                query: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }
            },
        ],
    },

};