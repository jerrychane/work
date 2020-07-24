const Vue = require('vue')
const path = require('path')
const server = require('express')()
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer')

const resolve = file => path.resolve(__dirname, file)

const isProd = process.env.NODE_ENV === "production"
if (isProd) {
  const bundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  const templatePath = resolve('./src/index.template.html')
  const template = fs.readFileSync(templatePath, 'utf-8')
  const renderer = createBundleRenderer(bundle, {
    runInNewContext: false, // 推荐
    template, // （可选）页面模板
    clientManifest // （可选）客户端构建 manifest
  })

} else {
  // 开发模式
  // 1.server -> bundle
  // 2.client -> manifest
  // 3.待2个文件编译完成，就可以调用 createBundleRender -> render
}

// 在服务器处理函数中……
server.get('*', (req, res) => {
  const context = {
    title: 'hello ssr with webpack',
    meta: `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
    `,
  }
  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦！
  renderer.renderToString(context, (err, html) => {
    // 处理异常……
    res.end(html)
  })
})

server.listen(8080)