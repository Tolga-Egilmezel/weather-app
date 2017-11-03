const path = require("path")

module.exports = {
    "defaults": {
        "folder": "../app",
        "output": path.join(__dirname, "../weather")
    },
    "build": {
        "env": require("./env_prod"),
        "assetsPublicPath": "/assets",
        "productionGzipExtensions": ["js", "css"],
    },
    "dev": {
        "env": require("./env_dev"),
        "port": 3000,
        "autoOpenBrowser": true,
        "assetsPublicPath": "/",
    }
}
