require('dotenv').config()
const express = require('express')
const {resolve} = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const hmr = require('webpack-hot-middleware')
const dev = require('./webpack.dev')
const prod = require('./webpack.prod')


let config = process.env.NODE_ENV === 'development' ? dev : prod
const port = process.env.PORT || 3000

const compiler = webpack(config)
const app = express()
if (process.env.NODE_ENV === 'development') {
  app
    .use(hmr(compiler))
}
app
  .use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
  .use('/*', express.static(resolve(`${__dirname}/index.html`)))
  .listen(port, () => console.log(`Example app listening on port: ${port}!`))
