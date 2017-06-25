process.env.NODE_ENV = 'production'

var
  path = require('path'),
  express = require('express'),
  env = require('./env-utils'),
  config = require('../config'),
  proxyMiddleware = require('http-proxy-middleware'),
  webpackConfig = require('./webpack.dev.conf'),
  app = express(),
  port = process.env.PORT || config.dev.port

console.log(' Starting prod server with "' + (process.argv[2] || env.platform.theme) + '" theme...')
console.log(' Will listen at port ' + port)

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

// proxy requests like API. See /config/index.js -> dev.proxyTable
// https://github.com/chimurai/http-proxy-middleware
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve dist
app.use(webpackConfig.output.publicPath, express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log(' Running merrily')
})
