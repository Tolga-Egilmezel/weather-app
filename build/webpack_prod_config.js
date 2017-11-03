const path = require("path")
const config = require("./config")
const base_webpack_config = require("./webpack_base_config")

const webpack = require("webpack")
const merge = require("webpack-merge")
const extractText = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const WebpackBuildNotifierPlugin = require("webpack-build-notifier")
const CompressionWebpackPlugin = require("compression-webpack-plugin")

module.exports = merge(base_webpack_config, {
    "plugins": [
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(config.build.env)
        }),
        new webpack.optimize.UglifyJsPlugin({
            "compress": { "warnings": false },
            "sourceMap": false,
            "comments": false,
            "mangle": true,
            "minimize": true
        }),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            config.defaults.folder
        ),
        new WebpackBuildNotifierPlugin({ "title": "🎉 Complete!" }),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            "filename": "index.html",
            "template": "index.html",
            "inject": true,
        }),
        new CompressionWebpackPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: new RegExp(
                "\\.(" + config.build.productionGzipExtensions.join("|") +")$"
            ),
            threshold: 10240,
            minRatio: 0.8
        }),
    ]
})
