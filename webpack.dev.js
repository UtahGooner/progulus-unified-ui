const {merge} = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const path = require('path');

const localProxy = {
    target: {
        host: 'localhost',
        protocol: 'http:',
        port: 8001
    },
    ignorePath: false,
    changeOrigin: true,
    secure: false,
};

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        static: [path.join(__dirname, 'public'), __dirname],
        hot: true,
        port: 8000,
        proxy: {
            '/api': {...localProxy},
            '/images/': {...localProxy},
            '/rprweb/': {...localProxy},
        },
        historyApiFallback: {
        }
    },
    devtool: 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
});
