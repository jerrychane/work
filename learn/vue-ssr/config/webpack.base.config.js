const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const resolve = (dir) => path.join(path.resolve(__dirname, '../'), dir)
const isProd = process.env.NODE_ENV