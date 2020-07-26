const fs = require('fs')
const chokidar = require('chokidar')
const webpack = require('webpack')

const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')

const setupServer = (app, templatePath, cb) => {
  let bundle
  let clientManifest
  let template
  let ready
  const readyPromise = new Promise(r => ready = c)
  template = fs.readFileSync(templatePath, 'utf8')
  const update = () => {
    if (bundle && clientManifest) {
      // 通知 server 进行渲染
      // 执行 createRenderer -> RenderToString
      ready()
      cb(bundle, {
        template,
        clientManifest
      })
    }
  }

  // webpack -> entry-server -> bundle

  // webpack -> entry-client -> clientManifest
  // hot-middleware
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
  )
  clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]

  const clientCompiler = webpack(clientConfig);

  app.use(require("webpack-dev-middleware")(clientCompiler, {
    noInfo: true, publicPath: clientConfig.output.publicPath
  }));
  // fs -> templatePath -> template
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf8')
    console.log('template is updated');
    update()
  })

  return readyPromise
}
module.exports = setupServer