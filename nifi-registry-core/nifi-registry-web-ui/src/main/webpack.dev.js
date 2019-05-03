/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
    // Tells webpack to use its built-in optimizations accordingly
    mode: 'development',

    // Source maps
    devtool: 'eval-source-map',

    // Output bundles
    output: {
        filename: '[name].js'
    },

    // "webpack-dev-server" configuration
    devServer: {
        // Open the browser after server had been started
        open: true,

        historyApiFallback: true,

        // The bundled files will be available in the browser under this path.
        publicPath: '/nifi-registry/',

        // Tell the server where to serve content from
        contentBase: [
            path.join(__dirname, './')
        ],

        // Enable Hot Module Replacement feature
        hot: true,

        // The filename that is considered the index file.
        index: path.join(__dirname, 'index.html'),

        // Specify a port number to listen for requests on
        port: 8080,

        // Proxying URLs
        proxy: {
            '/nifi-registry-api': 'http://localhost:18080'
        },

        stats: 'verbose'
    },

    plugins: [
        // Hot Module Replacement
        new webpack.HotModuleReplacementPlugin(),

        // Source map generation
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        }),
        // Create CSS files separately
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css'
        }),

        // Create HTML files to serve your webpack bundles
        new HtmlWebpackPlugin({
            template: 'webapp/template.dev.html',
            filename: 'index.html',
            favicon: path.resolve(__dirname, 'webapp/images/registry-favicon.png')
        })
    ]
});
