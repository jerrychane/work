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
##### 第 1 章、下一代 web 引擎 koa 框架
**1.Koa 是什么？**
Koa 是一个全新的 web 框架，致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。
利用 async 函数（使用同步的写法，去执行异步的函数）丢弃回调函数，并增强错误处理。Koa 没有任何预置的中间件，可快速而愉快地编写服务端应用程序。
**2.Koa 核心概念**
Koa Application （应用程序）
Context （上下文）
Request （请求）、Response （响应）
**3.Koa 工作原理**
执行的顺序：顺序执行
回调的顺序：反向执行，即先进后出
**4.Koa 开发 RESTful 接口**
Koa 中间件：路由 koa-router 、协议解析 koa-body、跨域处理 @koa/cors
```
npm install -S koa-body@4.1.0 @koa/cors@3.0.0
```
路由路径前缀设置：`router.prefix('/api');`
获取 GET 请求中的 params:`const params = ctx.request.query;`
koa-json 用来格式 json 数据的中间件
```
# 安装
npm install -S koa-json@2.0.2
# 使用
app.use(json({ pretty: false, param: 'pretty' }));
```
格式化字符串数据的第 2 个方法
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
**6.Koa 配置开发热加载、ES6 语法支持&webpack 配置**
第一步，实现开发热加载：
```
npm install nodemon@1.19.1 -S
yarn add nodemon@^1.19.1
# 查看 nodemon 版本，类似webpack
npx nodemon --version // 等价于 ./node_modules/.bin/nodemon --version
# 实现开发热加载
npx nodemon src/index.js
```
此时 package.json 中可加入 "start":"nodemon src/index.js"命令，执行 npm run start 命令，实现真正的热加载方式。
第二步，实现 ES6 语法支持：
```
yarn add webpack@^4.38.0 webpack-cli@^3.3.6
yarn add clean-webpack-plugin@^3.0.0 webpack-node-externals@^1.7.2 babel-loader@^8.0.6 @babel/core@^7.5.5 @babel/preset-env@^7.5.5 @babel/node@^7.5.5 cross-env@^5.2.0
```
创建 webpack.config.js 和 .babelrc
```js
// webpack.config.js
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
配置完成后，执行 npx webpakc 打包成功后，接下来就可以在 src/index.js 中书写 ES6 语法，执行 npx babel-node src/index.js 启动；对于 nodemon,默认是使用 commonjs 规范，如何使用 nodemon 的热更新呢？
```
 "start:es6":"npx nodemon --exec babel-node src/index.js",
```
**7.如何调试 webpack 和配置 VSCode**

```
npx node --inspect-brk ./node_modules/webpack/bin/webpack.js --inline --progress
```
在浏览器中输入 chrome://inspect/#devices , 便可进行调试；
**8.优化 Webpack 配置，npm 构建脚本**
```
npm install -g npm-check-updates@3.1.20
ncu // package.json 中版本包的更新情况
ncu -u // 更新package.json 中所有依赖包版本
```
合并中间件的中间件 koa-compose
```
npm install koa-compose@4.1.0 -S
```
合并 webpack 配置文件的插件 webpack-merge , 压缩 js 代码的插件 TerserWebpackPlugin
```
npm install webpack-merge@4.2.1 -D
npm install terser-webpack-plugin@1.4.1 --save-dev
npm install rimraf@2.6.3 -D
yarn add -D webpack-cli
```
安装 koa-compress 压缩代码
```
npm install koa-compress@3.0.0 -S
```
#### 第 2 章 项目开发之前端--UI 框架

##### 2.1.框架 & 库
类库：JQuery , Lodash (Underscore)
JS 库：React , Vue , Angular , Ext JS , Backbone
工具：Webpack(Build) ， Jest(Test) , ESlint(Lint) , Template(EJS) , 应用类(Echarts/D3/Three)
#####  2.2.UI 框架选型
☆ 判断使用场景-PC，移动 Web,小程序，响应式；
☆ 组件丰富，成熟的模板，方便集成；
☆ 成熟的社区，成熟的生态；

```text
layui ---- https://www.layui.com
iviewui ---- https://www.iviewui.com
weapp ---- https://weapp.iviewui.com (小程序)
inmap ---- http://inmap.talkingdata.com/#/index (大屏可视化)
```
**三款 Vue.js 的移动端框架 - UI 框架**
mint-ui (by eleme), didi-ui (by didi), vant-ui (by youzan)

#####  2.3.JS 框架的选型

☆ 团队的技术能力:根据团队技术能力选择框架，按需取用；
☆ 应用场景（后台？性能要求？时间要求？）；
☆ 成熟的社区，成熟的生态；
☆ 了解框架背后的原理，并思考如何自己实现一个 JS 框架；
☆ 多读文档，求助社区，高效开发；

#### 第 3 章 项目开发之前端—登录模块

##### 3-1 本章导学
登录模块需求分析
登入页面、注册页面、忘记密码页面
图形验证码、NodeMailer 邮件服务配置

##### 3-2 UI框架快速完成登录业务的样式开发（学会用轮子）
登录注册页需求分析
##### 3-3 图形验证码功能开发1
在 npmjs 中搜索 svg-captcha 依赖包

```shell
npm install --save svg-captcha@1.4.0
```

将验证码放到 input 框，需要安装 axios；

```shell
npm install axios@0.19.0 -S
```

在 App.vue 中通过 axios 发送请求

``` javascript
mounted() {
    this.getCaptcha();
  },
  methods: {
    getCaptcha() {
      axios.get("http://localhost:3000/getCaptcha").then(res => {
        if (res.status === 200) {
          const obj = res.data;
          if (obj.code === 200) {
            this.svg = obj.data;
          }
        }
      });
    }
  }
```



##### 3-4 图形验证码功能开发2

在 Vue 中 data 是个方法，通过 return 返回一个对象；methods 则是一个对象，里面可以写方法或者对象；

##### 3-5 基本的验证方法（表单验证）

可以通过 v-model 双向绑定的方式，在 data 中初始化 name , password , code , 在 methods 对象中，添加 checkForm() 函数进行简单的校验；

```js
checkForm() {
    this.errorMsg = [];
    if (!this.name) {
        this.errorMsg.push("登录名为空！");
    }
    if (!this.password) {
        this.errorMsg.push("密码不得为空！");
    }
    if (!this.code) {
        this.errorMsg.push("验证码为空！");
    }
}
```

##### 3-6 Vuelidate的安装及使用（表单验证进阶）

首先安装 vuelidate `npm install vuelidate@0.7.4 -S`, src/main.js 中引入 Vuelidate:

```javascript
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
// 具体用法见网站 https://vuelidate.js.org/
```

使用校验时，有两种方法参考，一种是引入 $model ,一种是 withourt $model。

##### 3-7 VeeValidate的安装及使用（表单验证进阶）

首先安装 vee-validate `npm install vee-validate@2.2.13 --save` , src/main.js 中引入 VeeValidate:

```js
import VeeValidate,{ Validator } from 'vee-validate'
// method1 to zh-CN
import zh from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)
Validator.localize('zh-CN',zh)
```

改变 message 为中文的第二中方法：

```javascript
// main.js
import VeeValidate,{ Validator } from 'vee-validate'
import './local/index'
Vue.use(VeeValidate)
const validator = new Validator()
validator.localize('zh-CN')
// src/local/index.js
import { Validator } from 'vee-validate'
const dictionary = {
    'zh-CN':{
        messages:{
            required: field => '请输入' + field,
            email:() => '请输入正确的邮箱格式'
        },
        attributes: {
            email:'邮箱',
            passwor:'密码',
            name:'账号'
        }
    }
}
Validator.localize(dictionary);
```

VeeValidate 相对来说要比 Vuelidate 好用一些，需要加入的代码比较少，不需要添加setName 方法；

##### 3-9 适配vee-validate旧版本v2.x

用 npm install 安装 2.x 具体的版本号即可

##### 3-10 vee-validate3.x简介

升级 package.json 中 "vee-validate": "^3.0.8", 以及其他依赖包的版本，最终 package.json 如下：

``` json
{
  "name": "front",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "axios": "^0.19.0",
    "core-js": "^2.6.9",
    "svg-captcha": "^1.4.0",
    "vee-validate": "^3.0.8",
    "vue": "^2.6.10",
    "vue-router": "^3.1.3",
    "vuex": "^3.1.1"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "^3.11.0",
    "@vue/cli-plugin-eslint": "^3.11.0",
    "@vue/cli-service": "^3.11.0",
    "@vue/eslint-config-standard": "^4.0.0",
    "babel-eslint": "^10.0.3",
    "eslint": "^6.5.0",
    "eslint-plugin-vue": "^5.2.3",
    "sass": "^1.22.12",
    "sass-loader": "^8.0.0",
    "vue-template-compiler": "^2.6.10"
  }
}
```

然后执行 npm run server , 终端会报 Cannot find module '@vue/cli-plugin-babel/preset'错误，此时需要修改 babel.config.js ：

```javascript
module.exports = {
  presets: [
    '@vue/app'
  ]
}
```

##### 3-11 vee-validate3.x演练

```vue
// template
<validation-provider
            name="用户名"
            rules="required|email"
            v-slot="{ errors }"
          >
            <div class="layui-input-inline">
              <input
                type="text"
                name="name"
                v-model.trim="name"
                placeholder="请输入标题"
                autocomplete="off"
                class="layui-input"
              />
            </div>
            <div class="error layui-form-mid ">{{ errors[0] }}</div>
</validation-provider>
// script
import * as rules from "vee-validate/dist/rules";
import zh from "vee-validate/dist/locale/zh_CN";
for (let rule in rules) {
  extend(rule, {
    ...rules[rule],
    message: zh.messages[rule]
  });
}
```

##### 3-12 完成登录、注册、找回密码页面样式及路由懒加载（1）

组件拆分：Header => Header 组件, Body => Router-view  , Footer => Footer 组件

Router-view：/login => Login 组件，/forget =>  Forget 组件， /reg =>  Reg 组件

```vue
<template>
<!--app.vue-->
  <div id="app">
     <imooc-header></imooc-header>
     <router-view></router-view>
     <imooc-footer></imooc-footer>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: "app",
  components:{
    'imooc-header': Header,
    'imooc-footer': Footer
  }
};
</script>
<style lang="scss">
@import "assets/layui/css/layui.css";
@import "assets/css/global.css";
@import "assets/layui/css/modules/layer/default/layer.css";
</style>
```

##### 3-13 完成登录、注册、找回密码页面样式及路由懒加载（2）

使用 `<router-link :to="{name:'routername'}"></router-link>` ，实现路由的跳转；

```vue
<router-link :to="{name:'login'}">登入</router-link>
<router-link :to="{name:'reg'}">注册</router-link>
<router-link :to="{name:'forget'}">忘记密码</router-link>
```

##### 3-14 完成登录注册页输入校验及图形验证码

注意本节课使用功能的版本为 `"vee-validate": "^2.2.13",`

##### 3-16 配置邮件服务NodeMailer（Nodejs进阶）

邮件服务注意：

- 使用客户端授权码，QQ邮箱14天限制；
- 公共邮箱限制了发送频次、数量、群发；
- 邮件服务：阿里云/亚马逊 SES / SendCloud;

```shell
npm install nodemailer@6.3.0 -S
```

具体 nodemailer 配置项可访问下面的官网链接：

```html
https://nodemailer.com/about/
```

##### 3-17 完成邮件服务接口与找回密码对接（Nodejs进阶）

生产环境下安装 moment

```shell
npm install moment@2.24.0 -S 
taskkill /f /t /im node.exe # 结束进程
```

在使用 postman 发送 post 请求时，记得将 methods 方法改为 post, body 部分改为 raw & json;

邮件服务总结

- 公共邮箱限制，使用授权码；
- 开发接口 Api : 业务 => 路由 => 测试接口 => 前端页面
- devServer 处理开发过程中的跨域问题；

### 第6周-团队协作-文档与版本管理
#### 第1章 项目开发团队协作——文档管理

##### 1-1 章导读（敏捷流程之文档管理宝鉴）

- 只有一个前端，也面临着团队协作吗? 答案是肯定的；

- 前端需要学会沟通（开发、测试、运维、产品）；

- 认识并学会使用 MarkDown;

- 常见的接口文档管理工具；
- 接口文档管理 ShowDoc 安装及使用介绍；

目标：学会使用基本的 MD 语法，并且书写文档；了解接口文档工具，并且学习接口文档的版式；实践ShowDoc,并进行接口文档的管理；

##### 1-2 Markdown简介

##### 1-3  Typora一款跨端的Markdown实时编辑预览编辑器

##### 1-4  Markdown常用语法

标题 ；字体；引用；图片；链接；列表；表格；代码；

图片插入：

两种方式，方式一，直接复制粘贴；

方式二，使用图片插入的代码格式，`![]()`;

```markdown
![]()
```

超链接（快捷键 ctrl + k）：

```mark
[]()
```

##### 1-5 Typora主题及Markdown输出样式自定义

##### 1-7 4 款文档管理工具介绍（思想决定视野，工具提升效率）

Showdoc:`https://www.showdoc.cc/`

 eoLinker:`https://www.eolinker.com/`

Mindoc:`https://www.iminho.me/`

apizza:`https://apizza.net/`

##### 1-8 ShowDoc的本地化安装

* 数据字典、接口模板；
* 团队协作；
* 免费开源；

##### 1-9 ShowDoc工作流及配置

##### 1-10 云笔记&个人笔记使用指北（勤练习才能写好文档）

常用云笔记：印象笔记、OneNote、有道笔记

如何记好笔记？

* 清晰的目录结构（注意分类、索引）；
* 时常更新与回顾，借助 App 利用碎片时间进行学习；
* 使用插件 + 移动端 App、提升效率；





























