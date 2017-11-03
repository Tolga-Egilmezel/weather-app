const config = require("./config")
const path = require("path")
const express = require("express")
const webpack = require("webpack")
const webpack_config = process.env.NODE_ENV === "testing"
  ? require('./webpack_prod_config')
  : require('./webpack_dev_config')

const port = process.env.PORT || config.dev.port
const app = express()
const compiler = webpack(webpack_config)
const devMiddleware = require("webpack-dev-middleware")(compiler, {
    "publicPath": webpack_config.output.publicPath,
    "quiet": true,
})
const hotMiddleware = require("webpack-hot-middleware")(compiler, {
    "log": () => {}
})
compiler.plugin("compilation", function (compilation) {
    compilation.plugin("html-webpack-plugin-after-emit", function (data, cb) {
        hotMiddleware.publish({ action: "reload" })
        cb()
    })
})

app.use(devMiddleware)
app.use(hotMiddleware)
module.exports = app.listen(port, function (err) {
    if (err) {
        console.log(err)
        return
    }

    console.log(`listening on: http://localhost:${port}`)
})
