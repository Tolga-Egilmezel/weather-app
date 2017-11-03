const webpack = require("webpack")
const path = require("path")
const config = require("./config")
const copy = require('copy-webpack-plugin')
const extractText = require("extract-text-webpack-plugin")

module.exports = {
    "cache": true,
    "entry": {
        "polyfills": path.join(__dirname, config.defaults.folder, "polyfills.ts"),
        "vendor": path.join(__dirname, config.defaults.folder, "vendor.ts"),
        "client": path.join(__dirname, config.defaults.folder, "app.ts"),
        // "styles": path.join(__dirname, config.defaults.folder, "/app.scss")
    },
    "output": {
        "filename": "[name].[hash].js",
        "path": config.defaults.output,
        "publicPath": process.env.NODE_ENV === "production"
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath,
        "hotUpdateChunkFilename": 'hot/hot-update.js',
        "hotUpdateMainFilename": 'hot/hot-update.json'
    },
    "resolve": {
        "extensions": [".ts", ".js", ".css", ".scss"],
        "alias": {
           "css": path.resolve(__dirname, "../assets/css"),
        },

    },
    "module": {
        "rules": [
            {
                "test": /\.scss$/,
                "exclude": "/node_modules/",
                "loader": 'raw-loader!postcss-loader!sass-loader'
            },
            {
                "test": /\.(css|sass|scss)$/,
                "include": path.resolve(__dirname, '../app/app.scss'),
                "use": extractText.extract(['css-loader?importLoaders=2?sourceMap=true!postcss-loader?sourceMap=true!sass-loader?sourceMap=true'])
            },
            {
                "test": /\.ts$/,
                "loaders": [
                    {
                        "loader": "awesome-typescript-loader",
                        "options": {
                            "configFileName": path.join(__dirname, "..", "tsconfig.json")
                        }
                    },
                    "angular2-template-loader"
                ]
            },
            {
                "test": /\.html$/,
                "loaders": ["html-loader"]
            },
            {
                "test": /\.(ttf|eot|svg|woff|woff2)$/,
                "loader": "file-loader?name=fonts/[name].[ext]"
            }
        ]
    },

    "plugins": [
        new extractText({ "filename": "app.[hash].css", "allChunks": true }),
        new webpack.optimize.CommonsChunkPlugin({
            "name": ["client", "vendor", "polyfills", "styles"]
        }),
    ]
}
