#### Yeoman 脚手架总结

(1）全局 yo 命令安装，安装命令 yo <package>

脚手架的名称是 generator- 打头，如：yo brain-imooc

(2) 使用 generator-generator 快速创建脚手架生成项目

全局安装 npm install -g generator-generator

(3) 使用 npm 进行发布

link 命令本地测试，发布时设置 npm registry

#### 升级 Vue3.0

MVVM (Model-View-ViewModel) 是一种软件架构模型，组成部分：模型、视图、视图模型；

#### 代码调试

Vue DevTools 插件；

#### 前端框架分类及选型

##### 一、下一代 web 引擎 koa 框架

**1.Koa 是什么？**

Koa 是一个全新的 web 框架，致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。

利用 async 函数（使用同步的写法，去执行异步的函数）丢弃回调函数，并增强错误处理。Koa 没有任何预置的中间件，可快速而愉快地编写服务端应用程序。

**2.Koa 核心概念**

Koa Application （应用程序）

Context （上下文）

Request （请求）、Response （响应）

**3.Koa工作原理**

执行的顺序：顺序执行

回调的顺序：反向执行，即先进后出

**4.Koa开发RESTful接口**

Koa 中间件：路由 koa-router 、协议解析 koa-body、跨域处理 @koa/cors

```
npm install -S koa-body@4.1.0 @koa/cors@3.0.0
```

路由路径前缀设置：`router.prefix('/api');`

获取 GET 请求中的 params:`const params = ctx.request.query;`

koa-json 用来格式json数据的中间件

```
# 安装
npm install -S koa-json@2.0.2
# 使用
app.use(json({ pretty: false, param: 'pretty' }));
```

格式化字符串数据的第2个方法

```
JSON.parse('{"name":"imooc","age":"28"}'); // 括号里第1个为单引号
JSON.stringify(objJson,null,2);// JSON.stringify(value,?replacer,?space);
```

##### 5.开发目录结构

按照功能模块进行区分 ; 路由压缩：koa-combine-routers ; 静态资源： koa-static ; 

```
├─public 
└─src 
  ├─api 
  └─routes 
```

```
npm install koa-combine-routers@4.0.2 -S
yarn add koa-combine-routers@^4.0.2
```

Koa 安全 header 处理和静态文件处理

```
npm install koa-helmet@4.2.0 -S
npm install koa-static@5.0.0 -S
```

**6.Koa配置开发热加载、ES6语法支持&webpack配置**

第一步，实现开发热加载：

```
npm install nodemon@1.19.1 -S
yarn add nodemon@^1.19.1
# 查看 nodemon 版本，类似webpack
npx nodemon --version // 等价于 ./node_modules/.bin/nodemon --version
# 实现开发热加载
npx nodemon src/index.js
```

此时 package.json 中可加入 "start":"nodemon src/index.js"命令，执行npm run start命令，实现真正的热加载方式。

第二步，实现ES6语法支持：

```
yarn add webpack@^4.38.0 webpack-cli@^3.3.6
yarn add clean-webpack-plugin@^3.0.0 webpack-node-externals@^1.7.2 babel-loader@^8.0.6 @babel/core@^7.5.5 @babel/preset-env@^7.5.5 @babel/node@^7.5.5 cross-env@^5.2.0 
```

创建 webpack.config.js 和 .babelrc

```
# webpack.config.js
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpackconfig = {
    target: "node",
    mode: "development",
    entry: {
        server: path.join(__dirname, "./src/index.js")
    },
    output: {
        filename: "[name].bundle.js",
        path: path.join(__dirname, "./dist")
    },
    devtool: "eval-source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: [path.join(__dirname, './node_modules')]
            }
        ]
    },
    externals: [nodeExternals()],
    plugins: [
        new CleanWebpackPlugin()
    ],
    node: {
        console: true,
        global: true,
        process: true,
        Buffer: true,
        __filename: true,
        __dirname: true,
        setImmediate: true,
        path: true
    }
}

module.exports = webpackconfig;
```

```
# .babelrc
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "node": "current"
                }
            }
        ]
    ]
}
```

配置完成后，执行 npx webpakc 打包成功后，接下来就可以在 src/index.js 中书写 ES6 语法，执行 npx babel-node src/index.js 启动；对于 nodemon,默认是使用commonjs规范，如何使用nodemon的热更新呢？

```
 "start:es6":"npx nodemon --exec babel-node src/index.js",
```

