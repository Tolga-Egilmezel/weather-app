const path = require("path")
const config = require("./config")
const base_webpack_config = require("./webpack_base_config")

const webpack = require("webpack")
const merge = require("webpack-merge")
const extractText = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")
const WebpackBuildNotifierPlugin = require("webpack-build-notifier")

Object.keys(base_webpack_config.entry).forEach(function (name) {
    base_webpack_config.entry[name] = [path.join(__dirname, "dev_client")].concat(base_webpack_config.entry[name])
})

module.exports = merge(base_webpack_config, {
    "devtool": '#source-map',
    "plugins": [
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(config.dev.env)
        }),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            config.defaults.folder
        ),
        new WebpackBuildNotifierPlugin({ "title": "🎉 Complete!" }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            "filename": "index.html",
            "template": "index.html",
            "inject": true
        }),
        new FriendlyErrorsPlugin()
    ]
})
