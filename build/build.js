const ora = require("ora")
const rm = require("rimraf")
const path = require("path")
const webpack = require("webpack")
const config = require("./config")
const webpack_config = require("./webpack_prod_config")

const spinner = ora("😎  Production...")
spinner.start()

rm(path.join(config.defaults.output), err => {
    if (err) throw err
    webpack(webpack_config, function (err, stats) {
        spinner.stop()
        if (err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + "\n\n")
    console.log("😎  Production build complete.\n")
    })
})
