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
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackconfig = {
  target: 'node',
  mode: 'development',
  entry: {
    server: path.join(__dirname, './src/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, './dist'),
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: [path.join(__dirname, './node_modules')],
      },
    ],
  },
  externals: [nodeExternals()],
  plugins: [new CleanWebpackPlugin()],
  node: {
    console: true,
    global: true,
    process: true,
    Buffer: true,
    __filename: true,
    __dirname: true,
    setImmediate: true,
    path: true,
  },
}
module.exports = webpackconfig
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

##### 2.2.UI 框架选型

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

##### 2.3.JS 框架的选型

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

##### 3-2 UI 框架快速完成登录业务的样式开发（学会用轮子）

登录注册页需求分析

##### 3-3 图形验证码功能开发 1

在 npmjs 中搜索 svg-captcha 依赖包

```shell
npm install --save svg-captcha@1.4.0
```

将验证码放到 input 框，需要安装 axios；

```shell
npm install axios@0.19.0 -S
```

在 App.vue 中通过 axios 发送请求

```javascript
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

##### 3-4 图形验证码功能开发 2

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

##### 3-6 Vuelidate 的安装及使用（表单验证进阶）

首先安装 vuelidate `npm install vuelidate@0.7.4 -S`, src/main.js 中引入 Vuelidate:

```javascript
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
// 具体用法见网站 https://vuelidate.js.org/
```

使用校验时，有两种方法参考，一种是引入 $model ,一种是 withourt $model。

##### 3-7 VeeValidate 的安装及使用（表单验证进阶）

首先安装 vee-validate `npm install vee-validate@2.2.13 --save` , src/main.js 中引入 VeeValidate:

```js
import VeeValidate, { Validator } from 'vee-validate'
// method1 to zh-CN
import zh from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)
Validator.localize('zh-CN', zh)
```

改变 message 为中文的第二中方法：

```javascript
// main.js
import VeeValidate, { Validator } from 'vee-validate'
import './local/index'
Vue.use(VeeValidate)
const validator = new Validator()
validator.localize('zh-CN')
// src/local/index.js
import { Validator } from 'vee-validate'
const dictionary = {
  'zh-CN': {
    messages: {
      required: (field) => '请输入' + field,
      email: () => '请输入正确的邮箱格式',
    },
    attributes: {
      email: '邮箱',
      passwor: '密码',
      name: '账号',
    },
  },
}
Validator.localize(dictionary)
```

VeeValidate 相对来说要比 Vuelidate 好用一些，需要加入的代码比较少，不需要添加 setName 方法；

##### 3-9 适配 vee-validate 旧版本 v2.x

用 npm install 安装 2.x 具体的版本号即可

##### 3-10 vee-validate3.x 简介

升级 package.json 中 "vee-validate": "^3.0.8", 以及其他依赖包的版本，最终 package.json 如下：

```json
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
  presets: ['@vue/app'],
}
```

##### 3-11 vee-validate3.x 演练

```vue
// template
<validation-provider name="用户名" rules="required|email" v-slot="{ errors }">
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
// script import * as rules from "vee-validate/dist/rules"; import zh from
"vee-validate/dist/locale/zh_CN"; for (let rule in rules) { extend(rule, {
...rules[rule], message: zh.messages[rule] }); }
```

##### 3-12 完成登录、注册、找回密码页面样式及路由懒加载（1）

组件拆分：Header => Header 组件, Body => Router-view , Footer => Footer 组件

Router-view：/login => Login 组件，/forget => Forget 组件， /reg => Reg 组件

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
  name: 'app',
  components: {
    'imooc-header': Header,
    'imooc-footer': Footer,
  },
}
</script>
<style lang="scss">
@import 'assets/layui/css/layui.css';
@import 'assets/css/global.css';
@import 'assets/layui/css/modules/layer/default/layer.css';
</style>
```

##### 3-13 完成登录、注册、找回密码页面样式及路由懒加载（2）

使用 `<router-link :to="{name:'routername'}"></router-link>` ，实现路由的跳转；

```vue
<router-link :to="{ name: 'login' }">登入</router-link>
<router-link :to="{ name: 'reg' }">注册</router-link>
<router-link :to="{ name: 'forget' }">忘记密码</router-link>
```

##### 3-14 完成登录注册页输入校验及图形验证码

注意本节课使用功能的版本为 `"vee-validate": "^2.2.13",`

##### 3-16 配置邮件服务 NodeMailer（Nodejs 进阶）

邮件服务注意：

- 使用客户端授权码，QQ 邮箱 14 天限制；
- 公共邮箱限制了发送频次、数量、群发；
- 邮件服务：阿里云/亚马逊 SES / SendCloud;

```shell
npm install nodemailer@6.3.0 -S
```

具体 nodemailer 配置项可访问下面的官网链接：

```html
https://nodemailer.com/about/
```

##### 3-17 完成邮件服务接口与找回密码对接（Nodejs 进阶）

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

### 第 6 周-团队协作-文档与版本管理

#### 第 1 章 项目开发团队协作—文档管理

##### 1-1 章导读（敏捷流程之文档管理宝鉴）

- 只有一个前端，也面临着团队协作吗? 答案是肯定的；

- 前端需要学会沟通（开发、测试、运维、产品）；

- 认识并学会使用 MarkDown;

- 常见的接口文档管理工具；
- 接口文档管理 ShowDoc 安装及使用介绍；

目标：学会使用基本的 MD 语法，并且书写文档；了解接口文档工具，并且学习接口文档的版式；实践 ShowDoc,并进行接口文档的管理；

##### 1-2 Markdown 简介

##### 1-3 Typora 一款跨端的 Markdown 实时编辑预览编辑器

##### 1-4 Markdown 常用语法

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

##### 1-5 Typora 主题及 Markdown 输出样式自定义

##### 1-7 4 款文档管理工具介绍（思想决定视野，工具提升效率）

Showdoc:`https://www.showdoc.cc/`

eoLinker:`https://www.eolinker.com/`

Mindoc:`https://www.iminho.me/`

apizza:`https://apizza.net/`

##### 1-8 ShowDoc 的本地化安装

- 数据字典、接口模板；
- 团队协作；
- 免费开源；

##### 1-9 ShowDoc 工作流及配置

##### 1-10 云笔记&个人笔记使用指北（勤练习才能写好文档）

常用云笔记：印象笔记、OneNote、有道笔记

如何记好笔记？

- 清晰的目录结构（注意分类、索引）；
- 时常更新与回顾，借助 App 利用碎片时间进行学习；
- 使用插件 + 移动端 App、提升效率；

##### 1-11 hexo+github pages 自建博客（Markdown 的另类玩法）

```bash
ssh-keygen -t rsa -b 4096 -C "email address"
```

##### 1-12 章小结（文档管理工具按需取用）

#### 第 2 章 项目开发团队协作—版本管理

##### 2-1 章导学（敏捷流程之版本控制宝鉴）

版本控制可不光是 pull / push

##### 2-2 语义化版本 Semantic Versioning（版本控制基础）

![版本格式](record.assets\版本格式.png)

版本名称释义

alpha：内部测试版本，除非是内部测试人员，否则不推荐使用，有很多 bug;

beta:公测版本，消除了严重错误，还是会有缺陷，这个阶段还会持续加入新的功能；

rc: Release Candidate,发行候选版本。这个版本不会加入新的功能，主要是排错，修改 Bug;

release:发行版本。

##### 2-4 git 工具导学&git vs svn&git 多密钥管理

版本控制工具 Git

常见的 Git 平台：github、gitlab、gitea、gitee

Git 基础：仓库代码操作的基本命令，README.md 文件及开源协议；

git flow: 分支管理、团队协作

##### 2-7 从零配置 github 到 SSH 秘钥克隆仓库（版本控制工具 git）

创建远程仓库：

```bash
git remote add origin http://github.com/jerrychane/learngit.git
```

##### 2-9 情景一：空仓库&创建仓库提交代码（版本控制工具 git）

```bash
# 显示所有文件
ls -la
```

.git 目录下是存放的快照文件，快照有多个状态，git 是通过管理这些快照，进行版本的管理。

##### 2-10 情境二：推送代码到多个仓库（版本控制工具 git）

##### 2-11 github 仓库 settings 介绍（版本控制工具 git）

##### 2-13 深入理解 git 工作原理——快照管理（版本控制工具 git）

| 工作区            | 暂存区          | 远程仓库   |
| ----------------- | --------------- | ---------- |
| git clone         | git reset       | git branch |
| git init          | git checkout    | git merge  |
| git add           | git stash&apply | git diff   |
| git fetch         | git rm          | git remote |
| git pull/git push | git status      | git rebase |
| git checkout      | ......          | git reset  |
| git log/reflog    | ......          | ......     |
| git config/status | ......          | ......     |

```bash
git config --global --list
```

##### 2-18 分支管理的基础命令介绍（多人协作之分支管理）

git fetch 查看哪些分支上的代码做了更新，然后使用 git merge FETCH_HEAD 合并更新,这两句命令相当于 git pull 这一句命令；

```bash
git fetch origin some-branch:dev
```

##### 2-20 实操 git flow &常见问题（多人协作之分支管理）

在某个分支上打 tag

```bash
git tag v1.0.0
git push origin mater --tags
git tag -d v1.0.0 # 删除本地 tag
git tag --list
git push origin :refs/tags/v1.0.0 # 删除远程 tag
git reset HEAD <filename> # 取消暂存文件
git checkout -- <filename> # 丢弃工作区的改动
```

Git Flow 重要意义
- 多人协作，权限控制；
- 解决冲突；
- 溯源，问题 Issue;

Branch 创建原则

- 按需创建；
- 重要的版本管理（版本历史）；
- 学会使用 Tags;

##### 2-22 docker run 搭建 gitlab 平台

##### 2-23 docker-compose 搭建 gitlab 平台（自动动手）

##### 2-24 docker-compose 运维 gitlab 平台：备份&恢复（自动动手）

##### 2-25 gitlab 的权限介绍&组权限控制&分支保护

Gitlab 权限控制

- 以组为单元，设置管理员；
- 熟悉 Merge Request,写好 git commit;
- 及时回收权限，或者设置过期时间；

##### 2-26 三种方法产生.gitignore 文件（git 必备知识）

```bash
git rm --cached -r . # 删除 git 本地缓存
````

##### 2-27 Git 的 GUI 工具使用简介

Sourcetree,Gitlens,

### 第 7 周-团队协作-缺陷控制与自动化流程

#### 第 1 章 缺陷控制（项目进度质量管理）

##### 1-1 章导读

缺陷控制在项目全生命周期旨在提高软件的质量；

##### 1-3 缺陷控制概念【万里长征第一步，质量管理】

总结办法：

- 分工明确，责任到人；
- 借助工具，提升效率；
- 量体裁衣，按需取用；

以动态的眼光看问题，长远的角度实施计划；

##### 1-6 最佳实践【万里长征第一步，质量管理】

##### 1-8 缺陷管理工具分类

| 代码类     | ESlint、JSlint、StyleLint      |
| ---------- | ------------------------------ |
| **流程类** | Jira、禅道、Redmine            |
| **工具类** | Trello、Teambition、钉钉、石墨 |

##### 1-9 Trello&Teambition 使用介绍

##### 1-10 禅道&Jira&Redmine 简介

#### 第 2 章 缺陷控制之质量管理工具

##### 2-1 ESLint 安装&初始化

```bash
npm install -D eslint@6.3.0
```

执行 eslint 命令的方法

```bash
# 方法1
./node_modules/.bin/eslint --version
# 方法2
npx eslint --version
```

初始化 eslint 配置文件 : `npx eslint --init`, 在根目录下生成 .eslintrc.js 文件

```javascript
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {},
}
```

如果同一个目录下有多个配置文件，ESLint 只会使用一个。优先级顺序如下：

1. .eslintrc.js
2. .eslintrc.yaml
3. .eslintrc.yml
4. .eslintrc.json
5. .eslintrc
6. package.json

##### 2-3 ESLint 规则&配置方法

- 规则分三种等级：off(0) 关闭，warn(1) 警告、error(2) 强制；

```html
"off" 或 0 - 关闭规则 "warn" 或 1 - 开启规则，使用警告级别的错误：warn
(不会导致程序退出) "error" 或 2 - 开启规则，使用错误级别的错误：error
(当被触发的时候，程序会退出)
```

- 在 eslint 配置文件中配置 rules, 对应不同类型的规则；

- 在行内书写规则，需要写在 /_ eslint ... _/

##### 2-6 ESLint 与 VSCode&Webstorm 结合使用

ESLint 的插件使用，需要全局安装 eslint

```bash
npm install -g eslint
```

##### 2-7 Vue 项目中使用 VSCode 插件自动格式化+自动 ESLint 代码

#### 第 3 章 深入浅出前端自动化

##### 3-1 章导读【小荷才露尖尖角，揭开自动化的面纱】

- CI/CD 流程：持续集成、持续部署；
- Jenkins 简介、安装及使用；
- 其他 CI/CD 工具： Travis CI, Circle CI;

##### 3-2 什么是前端自动化？什么是CI/CD？ 

前端自动化是指前端代码的自动化构建、打包、测试及部署等流程。

持续集成（Continuous Integration）/ 持续部署（Continuous Deployment）。

前端自动化通常与 CI/CD 流程相结合。

为什么要结合自动化流程？

1. 减少人为失误，提高软件质量；
2. 效率迭代，便捷部署；
3. 快速交付，便于管理；

##### 3-4 自动化流程概念&最佳实践

* 最基本的版本控制，培养协同效率；

* 创建工程化项目，参与开源项目实践；
* 按需取用，推动团队自动化流程；

#### 第4章 CircleCI/TravisCI自动化工具合集

##### 4-1 自动化工具介绍&CircleCI使用 

| 分类     | Jenkins    | Travis CI | Circle CI |
| -------- | ---------- | --------- | --------- |
| 本地部署 | 支持       | 云平台    | 云平台    |
| 配置     | 高度可配置 | YAML文件  | YAML文件  |
| 跨平台   | 是         | Linux+Mac | Linux+Mac |
| 多服务器 | 是         | 否        | 否        |
| 费用     | 免费       | 60$/c/m   | 50$/c/m   |

```bash
git rebase -i head~3 # 和先前的3次提交做变基
```

vm 中按两次dd，就是删除1行；删除多的话，先按d,再输入一个数字10，表示删除10行，再按d即可删除；

##### 4-7 CircleCI实战Vue项目发布到github pages 

- Github 账号注册、授权；
- 新建项目添加 .circleci/config.yml 文件；
- 配置脚本任务，流程：环境 => 构建 => （缓存）=> 发布

##### 4-9 TravisCI介绍&配置自动化任务

* Github 账号注册、授权，控制面板中同步项目
* 新建项目添加 .travis.yml 文件
* 配置环境变量 GITHUB_TOKEN 发布到 github_pages;

#### 第5章 Jenkins — CI&CD工具鼻祖

##### 5-1 Jenkins使用介绍&课程案例架构

##### 5-3 Jenkins安装&Docker安装示例

##### 5-7 Jenkins插件配置&保存Docker容器数据

* 使用 Docker 进行快速验证，配置端口与防火墙
* 国内插件下载加速 & 离线安装方式
* 备份 Docker 容器内部的数据的3种方式

##### 5-9 Jenkins权限管理3种方案 

安全域配置哪些用户可以访问，授权策略配置这些用户可以访问什么。

* 基于角色/项目的权限管理
* 基于安全矩阵的权限管理
* gitlab 集成的权限管理方案

##### 5-11 Jenkins&gitlab项目任务 

Jenkins 任务配置

* 源码管理 - > 构建触发器 - > 构建环境 - > 构建 - > 后操作
* Webhooks 概念理解，配置部署秘钥
* Shell 脚本及 Docker & Docerfile 结合

Gitlab 与 Jenkins 流程

(1) 创建 git 项目

(2) 在 gitlab 中配置 deploy 密钥

(3) 使用 sshkey 命令来创建一个 ssh 公私钥，用于 deploy

(4) 在 Jenkins 中添加 SSH 密钥凭据

(5) 在 Jenkins 中配置源码管理，配置 ssh 项目地址，选择 deploy 密钥

(6) 在 Jenkins 中选择需要构建的分支

(7) 查看 Jenkins 中的 webhooks 的地址，设置 secret token

(8) 配置 gitlab 中的 webhooks

(9) 在 gitlab 进行 test 测试

正确的流程分三步走：

1. gitlab 这边是创建 git 项目，添加 deploy 公钥，添加 webhooks 配置；
2. 创建 SSH 公私钥， Jenkins 添加私钥凭据，Jenkins 任务配置源码；
3. Jenkins 任务配置构建触发器，产生 secret token, 添加到 gitlab 的 webhooks 中，然后测试。

#### 第6章 自动化实战

##### 6-1 前后端项目Dockerfile&项目实战配置 

Dockerfile 的作用

* 用于产生 Docker 镜像
* Dockerfile 按照步骤构建，产生文件系统
* Dockerfile 是镜像配置文件，高度可配置

##### 6-2 本地测试Dockerfile及打包镜像 

##### 6-3 前后端项目Jenkins任务配置（1） 

##### 6-4 前后端项目Jenkins任务配置（2） 

* Dockerfile 基础的语法，构建镜像命令： docker build
* Shell 脚本控制发布
* 构建端口防火墙规则及脚本优化

### 第8周-NoSQL数据库的设计与集成

#### 第1章 NoSQL数据库MongoDB 认知与设计

##### 1-1 章导读

* NoSQL 数据库设计
* MongoDB 安装、配置、GUI 工具
* Nodejs 中的 Mongoose 库

**目标:**

* 掌握 NoSQL 数据库设计原则
* 熟练 Mongo 安装、配置，及 GUI 工具的使用
* Mongoose 库的集成，学会如何配置到 Node 项目

##### 1-2 NoSQL数据库&设计原则

**学习 NoSQL 的意义**

* 易扩展，高性能，高可用
* 较容易映射复杂数据（key-value）
* 无事务特性要求 (ACID特性:Atomic 原子性，Consistency 一致性，Isolation 隔离性，Durability 持久性)

**数据库相关概念**

关系型数据库，是指采用了关系模型来组织数据的数据库。

NoSQL 是对不同于传统的关系型数据库的数据库管理系统的统称，是和关系型数据库对立的。

**NoSQL 设计**

* 常见场景及设计方法（内嵌、父/子引用、反范式）
* 双向关联的场景及设计原则

内嵌是指存在关联关系的文档，放在同一文档中，以数组的形式存放。

**内嵌设计**

* 减少了关联查询
* 适合于单类需要描述的属性
* 不经常变化的属性（扩展、嵌套关联）

**什么是父引用**

父引用是指存在一对多的情况中，放在同一文档中，以数组的形式存放。

**什么是子引用**

子引用是指存在一对非常多的情况中，由于数据库文档存放限制，这个时候进行反向引用。

**父子引用设计**

* 引用数据内容是否非常多
* 引用数据量是否非常庞大，而且不断在增加
* 数据是否需要单独访问

**什么是反范式**

范式是指按既定的用法，范式就是一种公认的模型或模式。**反范式 -> 不走寻常路 ~~~**

**反范式设计**

* 是否有提升性能的区间
* 数据量的变化是否非常庞大，庞大到更新会异常低效
* 先考虑读写比，再考虑反范式

**设计原则小结**

* 优先考虑内嵌，如果单独访问，则不适合
* 数组不应该无限增长
* 考虑读写比，考虑反范式，考虑应用场景

##### 1-3 MongoDB简介&安装


https://docs.mongodb.com/

Linux 安装（Docker 安装）、MacOS 安装、Window 安装

```shell
# CentOS
firewall-cmd --add-prot=27017/tcp --permanent
firewall-cmd reload
```

#### 第2章 MongoDB 应用与实战

##### 2-1 MongoDB初始化配置

MongoDB SQL语句：https://docs.mongodb.com/manual/crud/

> 知识是没有边界的，先学会使用，解决现实问题，再深入学习
>
> 学习方法：新的知识 -> 业务问题->学习原理->熟悉到熟练

##### 2-2 介绍GUI工具

Robo 3T: https://robomongo.org/

##### 2-3 MongoDB备份与恢复

* 备份方式：docker cp , mongodump
* 恢复方式：docker cp , mongorestore

```sql
# 备份数据到 /tmp/test
docker exec -it mongotest_mongo_1 mongodump -h localhost -u root -p example -o /tmp/test
# 恢复数据	/tmp/test
docker exec -it mongotest_mongo_1 mongorestore -h localhost -u root -p example --dir /tmp/test
```

##### 2-4 Mongoose使用简介

| 分类 | Oralce/Mysql   | MongoDB            | Mongoose                    |
| ---- | -------------- | ------------------ | --------------------------- |
| 1    | 数据库实例     | MongoDB实例        | Mongoose                    |
| 2    | 模式（schema） | 数据库（database） | mongoose                    |
| 3    | 表（table）    | 集合（collection） | 模板（Schema）模型（Model） |
| 4    | 行（row）      | 文档（document）   | 实例（instance）            |
| 5    | Primary key    | Object (_id)       | Object (_id)                |
| 6    | 表字段 Column  | Field              | Field                       |

```bash
npm install -S mongoose@5.7.1
npm install -S saslprep@1.0.3  # 消除 warning
```

##### 2-5 Mongoose实战配置&CURD操作

* 核心概念介绍（Schema、Model）
* 安装 & 初始化配置
* 常见的增删改查操作

#### 第3章  Redis 认知与必备CLI命令 

#####  3-1 章导读

* Redis 简介 & 安装
* Redis 命令行，GUI 工具
* Nodejs 中集成 Redis

##### 3-2 Redis简介

Redis 是完全开源免费的，遵守 BSD 协议，是一个高性能的 key - value 数据库。Redis 与其他 key - value 缓存产品相比：支持数据的持久化，多数据结构 list , set , zset , hash 等的存储，支持数据备份。

**Redis 特点**

* 高性能，可持久化
* key - value 结构，支持多种数据类型
* 支持事务，数据的原子性（要么不做/全做）

**Redis 应用场景**

* 缓存（读写性能优异）
* 计数 & 消息系统（高并发、发布/订阅阻塞队列功能）
* 分布式会话 session & 分布式锁（秒杀）

**Redis  vs Mongo**

* 存储方式不一样： key - value vs Document
* 使用方式 & 可靠性不一样： MongoDB SQL & ACID 支持
* 应用场景不一样：高性能缓存 vs 海量数据分析

##### 3-4 Redis安装

* 手动方式安装（适合不熟悉 Docker / 无 Docker 环境）
* Docker 方式安装（推荐）
* 配置 redis.conf , 缓存 redis 数据（生产需要）

##### 3-6 Redis常见CLI命令1—取值 

* 设置/取值 （String, Hash , List , Set）

Redis 命令参考：http://doc.redisfans.com/ (推荐) or http://redisdoc.com/

redis鉴权登录：（1）redis-cli -h 127.0.0.1 -a 123456 （2）redis-cli auth 123456

LPUSH 是 List (列表) 相关的命令，关于 List 命令，与  JS 中的 Array 操作进行对比：

LPUSH -> unshift -> 从队首插入一个元素      LPOP -> shift 从队首移出一个元素

RPUSH -> push 从队尾插入一个元素              RPOP -> pop 从队尾移出一个元素

##### 3-6 Redis常见CLI命令2—发布订阅

SUBSCRIBE / PUBLISH

##### 3-11 Redis常见CLI命令3—服务相关&备份恢复

CONFIG / CLIENT / FLUSHALL (清空所有数据库) / FLUSHDB（清空单个数据库）/ SAVE(备份-同步任务) / BGSAVE (备份-开启子任务) /  LASTSAVE(备份-最后一次)

SAVE命令是同步命令，执行的时候，Redis中断了其他命令的执行。BGSAVE是一个后台执行的保存命令。

CONFIG是配置命令

CLIENT是服务器端去查看客户端的连接的命令

SLOWLOG是用于调试Redis查询服务器的命令。

#### 第4章 Redis 和 Nodejs 集成与实践

##### 4-1 Redis的GUI工具 

Rdis GUI 工具推荐：

- Another Redis DeskTop Manager （免费）

- Medis (收费，可自构建)
- Redist DeskTop Manager （收费）

##### 4-2 Redis实战应用配置—get&set方法

##### 4-3 Redis实战应用配置—哈希表hset&hgetall

##### 4-4 Redis实战应用配置-BlueBird

* redis 包的安装及配置
* 定义 redis 的常用方法 get , set , hset , hget
* bluebird 引用， Promise EveryThing

### 第9周-JWT登录鉴权—通用登录模块后端开发

#### 第1章 鉴权方式及相关概念

##### 1-1 章导学 

鉴权方式： jwt 、session / cookie、oAuth 2.0

* 核心概念（鉴权方式，加密/解密，HTTPS）
* JWT 工作原理（Json Web Token）
* Nodejs 集成 JWT

目标：

* 理解鉴权 / 加密/ HTTPS 等核心概念
* 熟悉常见的鉴权方式（JWT、session） 及优缺点
* 使用 JWT 方式开发登录鉴权模块，设计相应接口

##### 1-2 登录鉴权核心概念

鉴权工作一般放在服务器端，防止隐私泄露，保证整个系统的安全

鉴权  != 算符/加密 != HTTPS

常见的鉴权方式

| 鉴权方式       | 优点                                                 | 缺点                                                         |
| -------------- | ---------------------------------------------------- | ------------------------------------------------------------ |
| Session/Cookie | 交易扩展，简单                                       | 安全性低，性能低，服务端存储，多服务器同步session困难，跨平台困难 |
| JWT            | 易扩展、支持移动设备，跨应用调用，安全，承载信息丰富 | 刷新与过期处理，PayLoad不易过大，中间人攻击                  |
| Oauth          | 开放、安全、简单、权限指定                           | 需要增加授权服务器，增加网络请求                             |

##### 1-3 JWT的工作原理

什么是 JWT ?JWT的全称是 Json Web Token， 一个JWT由三部分构成：Header（头部）/PayLoad（载荷）/ Signature（签名）。

JWT 特点

* 防 CSRF(主要是伪造请求，带上 Cookie)
* 适合移动应用
* 无状态，编码数据

##### 1-4 API接口安全相关知识（加密&算法&HTTPS）

算法中的指令描述是一个计算，当其运行时能从一个初始状态和初始输入（可能为空）开始，经过一系列有限而清晰定义的状态最终产生输出并停止于一个终态。（本质上算法就是一个函数）

数据加密的基本过程，就是对原来为明文的文件或数据按某种算法进行处理，使其成为不可读的一段代码，通常称为“密文”。通过这种途径，来达到保护数据不被非法人窃取、阅读的目的。

**API 安全设计**

* 通信信道加密：使用 HTTPS
* 通信数据加密：密文 + 加密关键数据
* 通信安全策略：授权中间层、尝试次数、过期策略...

#### 第2章 客户端开发 - 前端接口开发&数据校验

##### 2-1 登录鉴权开发前置回顾

功能拆解

* 使用验证码方式暴力登录
* 登录 / 注册，用户注册数据保存（bcrypt 加密敏感数据）
* 鉴权方式：jwt, 采用 koa-jwt

##### 2-2 前端项目Veevalidate3X

有2个坑：

(1) vee-validate 的版本需要是 ^3.1.3 , 否则在引入 rules 时会报 rules 未定义；

(2) Login.vue 中 validation-provider 需要包裹 errors 和 errros[0] , 不然会找不到 errors；

```html
<label for="L_pass" class="layui-form-label">密码</label>
<validation-provider  name="password" rules="required|min:6"  v-slot="{errors}">
    <div class="layui-input-inline">
      <input
        type="password"
        name="password"
        v-model="password"
        placeholder="请输入密码"
        autocomplete="off"
        class="layui-input"
      />
    </div>
    <div class="layui-form-mid">
    <span style="color: #c00;">{{errors[0]}}</span>
    </div>
</validation-provider>
```

##### 2-3 Veevalidate3X升级-本地化&配置自定义消息

```js
///src/util/veevalidate.js
import { extend, localize } from 'vee-validate'
import { required, email, min, length, confirmed } from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN.json'
extend('email', email)
extend('min', min)
extend('length', length)
extend('required', required)
extend('confirmed', confirmed)
localize('zh_CN', {
    messages: {
        ...zh.messages,
        required: '请输入{_field_}',
    },
    names: {
        email: '邮箱',
        password: '密码',
        name: '昵称',
        username: '账号',
        code: '验证码',
    },
    fields: {
        email: {
            email: '请输入正确的{_field_}',
            required: '请输入{_field_}！！！',
        },
    },
})
```

##### 2-4 Veevalidate结合vuei18n

```bash
npm install vue-i18n@8.14.1 -S
```

```js
// src/util/veevidate-i18n.js
import { extend, configure } from 'vee-validate'
import { required, email, min, length, confirmed } from 'vee-validate/dist/rules'
import { i18n } from './i18n'
configure({
    defaultMessage: (field, values) => {
        // overide the field name
        values._field_ = i18n.t(`fields.${field}`);
        return i18n.t(`validation.${values._rule_}`, values);
    }
})
extend('email', email)
extend('min', min)
extend('length', length)
extend('required', required)
extend('confirmed', confirmed)
// src/util/i18n.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from 'vee-validate/dist/locale/zh_CN.json'
Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: "zh_CN",
    messages: {
        "zh_CN": {
            fields: {
                email: '邮箱',
                password: '密码',
                name: '昵称',
                username: '账号',
                code: '验证码',
            },
            validation: {
                ...zh.messages,
                required: '请输入{_field_}',
                email: '请输入正确的{_field_}!!!',
            },
        }
    }
})
export { i18n }
```

##### 2-5 封装Axios请求（拦截器）

import 或 export 函数和模块不需要加 {} 例如 axios, react ， import 或 export 对象和组件需要加 {}

##### 2-6 axios封装进阶-业务示例、逻辑代码、配置

Axios  Request Config 有一个配置叫 withCredentials：true,解决跨域请求时，是否带上凭证即cookie

Axios 封装要点 （见课程 9-2-5）

* 公共配置内容，注意目录结构
* Axios 拦截器（请求拦截/响应拦截）使用
* 错误日志收集

##### 2-7 图片验证码存储&校验机制设计

```bash
npm install uuid@3.3.3 -S
```

使用 uuid v4 版本

```js
import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
```

使用 redis 缓存，setValue 和 getValue , 设置超时时间

src 路径使用@作为 alias webpack 如何配置

```bash
"watch": "cross-env NODE_ENV=dev webpack --watch --progress --hide-modules --config config/webpack.config.dev.js",
"debug": "nodemon --inspect ./dist/server.bundle.js"
```

```js
// config/utils
const path = require('path')
exports.resolve = function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
exports.APP_PATH = exports.resolve('src')
exports.DIST_PATH = exports.resolve('dist')
exports.getWebpackResolveConfig = function (customAlias = {}) {
  const appPath = exports.APP_PATH;
  return {
    modules: [appPath, 'node_modules'],
    extensions: ['.js', '.json'],
    alias: {
      '@': appPath,
      ...customAlias,
    },
  };
};
```

前端常见问题 Token 存哪里？ localStorage(推荐) , sessionStorage(会话中断，内容清空)，cookie(浏览器端好，跨端支持不好)

提高 JWT 安全性的策略：（1）使用 HTTPS （2）服务端存储 Secret,动态 Secret  (3) 设置短期的 Token 有效，设置刷新 Token

##### 2-8 前台veevalidate登录校验&接口请求设计

先校验整个提交的表单数据，然后执行 submit 方法，发送请求，提交数据。

#### 第3章 服务端开发 - jwt鉴权集成

##### 3-1 JWT鉴权方式：koa-jwt集成 

在 api-start 目录下

```bash
npm i koa-jwt@^3.6.0 -S
npm i -D npm-run-all@4.1.5
```

##### 3-2 服务端登录逻辑&业务代码调试

使用 vscode 调试终端打断点，需要在调试脚本上添加 --inspect 进行监听；

```json
 {
      "type": "node",
      "request": "launch",
      "name": "Launch via NPM",
      "runtimeExecutable": "npm",
      "restart": true,
      "console": "integratedTerminal",
      "runtimeArgs": ["run-script", "start:dist"],
      "port": 9229,
      "skipFiles": ["<node_internals>/**"]
    },
{
      "type": "node",
      "request": "launch",
      "name": "nodemon",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/nodemon",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/src/index.js",
      "restart": true
    }
```

##### 3-3 服务端koa统一错误处理

##### 3-4 VSCode对配置alias的支持

借助插件 Node modules resolve，在项目的根目录下创建 jsconfig.json ，配置项如下：

```json
{
    "compilerOptions": {
        "target": "es2017",
        "allowSyntheticDefaultImports": false,
        "baseUrl": "./",
        "paths": {
            "@/*":["src/*"]
        }
    },
    "exclude": ["node_modules","dist"]
}
```

##### 3-5 使用Chrome调试服务端应用

在源码里标记 debugger, 结合 Chrome 进行调试。

##### 3-6 登录功能小结&联调测试

#### 第4章 vue自定义组件

##### 4-1 前端数据校验及交互设计的两种方法

alert 弹窗 和 vue 自定义组件（推荐）

##### 4-2 Vue自定义Alert组件

使用 vbase ，快速形成 template 结构的文件，定义完 Alert.vue 组件后，可在 index.js 创建 Vue 自定义插件。

```js
// src\components\modules\alert\index.js
import AlertComponent from './Alert.vue'
const Alert = {}
Alert.install = function (Vue) {
    const AlertConstructor = Vue.extend(AlertComponent)
    const instance = new AlertConstructor()
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)

    Vue.prototype.$alert = function (msg) {
        // 逻辑...
        instance.type = 'alert'
        instance.msg = msg
        instance.isShow = true
    }

    // 4. 添加实例方法
    Vue.prototype.$confirm = function (msg, success, cancel) {
        // 逻辑...
        instance.type = 'confirm'
        instance.msg = msg
        instance.isShow = true
        if (typeof success !== "undefined") {
            instance.success = success
        }
        if (typeof cancel !== "undefined") {
            instance.cancel = cancel
        }
    }
}
export default Alert
```

##### 4-3 Vue自定义Confirm组件

##### 4-4 前端数据校验交互一：自定义弹窗

##### 4-5 前端数据校验交互二：veevalidate服务端检验

#### 第5章 前后端联调--注册接口及接口联调

##### 5-1 前端注册业务开发

路由守卫：

```js
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg,
      beforeEnter: (to, from, next) => {
        console.log('from', from)
        console.log('to', to)
        if (from.name === 'login') {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget
    }
  ]
})
```

##### 5-2 注册接口Mock数据

##### 5-3 注册接口开发&前后联调

```bash
npm i -S bcrypt@3.0.6
```

##### 5-4 登录鉴权总结

### 第10周-全栈开发—首页模块

#### 第1章 首页：需求分析

##### 1-1 章导读（教学内容、目标、建议） 

| 项目要求 | 业务要求 | 用户需求 | 具体产出     |
| -------- | -------- | -------- | ------------ |
| 全栈项目 | 社区应用 | 交互简单 | 需求文档     |
| 前端痛点 | 登录鉴权 | 页面美观 | 项目选型     |
| 企业对接 | 用户体系 | 运行流畅 | 技术栈选型   |
| 开发周期 | 积分系统 | 功能实用 | 开发周期预估 |
| 跨端应用 | 发帖收藏 | 定制需求 | 项目进度预估 |
| 多场景   | 点赞回复 | 其他需求 | 分项原型图   |
|          | 内容管理 |          | 分项流程图   |

* 原型设计、版本控制、文档管理
* 首页组件拆分（组件拆分原则）
* 数据库设计 / 接口设计

##### 1-2 功能拆解&原型设计说明

内容宽度1000 -1200 ， 设置参考线或者参考区

#### 第2章 首页：数据库设计

##### 2-1 数据库-业务功能分析

##### 2-2 数据库设计-用户信息

-  用户表，储存用户信息

| 字段     | 类型     | 空   | 默认  | 注释                                                       |
| :------- | :------- | :--- | ----- | ---------------------------------------------------------- |
| uid      | ObjectId | 否   |       | 这个默认产生的ObjectId(''),取的使用需要\_id                |
| username | String   | 否   |       | 用户名，这个是邮件账号                                     |
| password | String   | 否   |       | 密码                                                       |
| name     | String   | 否   |       | 昵称                                                       |
| created  | Date     | 否   | now() | 注册时间                                                   |
| updated  | Date     | 否   | now() | 更新时间                                                   |
| favs     | Number   | 否   | 100   | 用户积分                                                   |
| gender   | String   |      |       | 默认，0-男，1-女                                           |
| roles    | String   | 否   | user  | 角色，user-普通用户，admin-管理员，super-admin超级管理员   |
| pic      | String   | 否   |       | 用户头像                                                   |
| mobile   | String   | 否   |       | 手机号码                                                   |
| status   | String   | 否   | 0     | 是否被禁用，0-正常，1-禁言，2-账号禁用                     |
| regmark  | String   | 否   |       | 个性签名                                                   |
| location | String   | 否   |       | 城市                                                       |
| isVip    | String   | 否   | 0     | 是否是Vip用户，0-普通用户，1-会员用户，2-7定义成vip的level |
| count    | Number   | 否   | 0     | 签到次数                                                   |
- 备注：无

##### 2-3 数据库设计-发贴、签到、友链

- 发帖信息

|字段|类型|空|默认|注释|
|:----    |:-------    |:--- |-- -|------      |
|tid    |ObjectId     |否 |  |这个默认产生的ObjectId(''),取的使用需要\_id             |
|uid |String |否 |    |   用户ID  |
|title |String |否 |    |  文章标题  |
|content |String |否   |    |   文章内容    |
|created |Date     |否   | now()  |   创建时间  |
|catalog |String     |否   |   |   帖子分类，index-全部，ask-提问，advise-建议，discuss-讨论，share-分享，news-动态  |
|fav     |Number |否   |   |    帖子积分     |
|isEnd     |String |   | 0 | 0-未结束，1-已结帖   |
|reads     |Number |否   | 0  |    阅读记数    |
|answer     |Number |否   |0    |    回答记数     |
|status     |String |否   |  0  |    0-打开回复，1-关闭回复     |
|isTop     |String |否   |  0  |    0-未置顶，1-已置顶      |
|sort     |String |否   |  0  |    置顶排序    |
|tags     |String |否   |  |    文章的标签、精华，加精，etc    |                              |

-  友情链接、推荐，常用信息

| 字段    | 类型   | 空   | 默认 | 注释     |
| :------ | :----- | :--- | ---- | -------- |
| title   | String | 否   |      | 标题     |
| link    | String | 否   |      | 链接     |
| created | Date   | 否   |      | 创建时间 |
| isTop   | String | 是   | 0    | 是否置顶 |
| sort    | String | 否   | 0    | 排序编号 |

-  签到记录

| 字段      | 类型   | 空   | 默认 | 注释         |
| :-------- | :----- | :--- | ---- | ------------ |
| uid       | String | 否   |      | 用户ID       |
| created   | Date   | 否   |      | 创建时间     |
| fav       | String | 否   |      | 积分数量     |
| last_sign | Date   | 是   |      | 上一签到时间 |

#### 第3章 首页：接口定义&组件拆分

##### 3-1 接口设计&组件拆分

(1) 接口设计原则

* 简单：高内聚，与业务对应；
* 高效：属性设计、数据结构、方法抽象；
* 兼容：尽量保证兼容，进行版本与状态控制；

(2) 错误的设计

敏感数据、多层嵌套的数据结构；

(3) 组件化原则

* 独立功能模块（松耦合、扁平化、提炼精华）
* 独立的状态变化（统一的状态管理）
* 从上而下的逻辑思考，从下而上的组件拆分

##### 3-2 首页接口定义-文章列表


**简要描述：** 

- 文章列表接口

**请求URL：** 
- ` /public/list `
  

**请求方式：**
- GET 

**参数：** 

| 参数名  | 必选 | 类型   | 说明                                                         |
| :------ | :--- | :----- | ------------------------------------------------------------ |
| type    | 是   | string | 0-普通列表，1-置顶列表                                       |
| page    | 是   | string | 分页，从几页开始                                             |
| limit   | 否   | string | 每页的数量，默认10                                           |
| catalog | 否   | string | 分类的名称，默认是'index'                                    |
| sort    | 否   | string | 文章的排序，默认是'created'创建时间进行倒序排列，否则按照回复数量进行排列 |
| status  | 否   | string | 文章的状态， 0-未关闭，1-已结帖                              |

 **返回示例**

``` 
  {
    "code": 200,
    "data": [{
      "tid": "1",
      "title": "帖子的标题",
      "catalog": "index",
      "fav": '20' ,
      "created": "2020-06-15 00:00:00",
      "isEnd": "0",
	  "isTop": "0",
	  "sort": "0",
	  "answer": "0",
	  "status": "0",
	  "user": {
	  	"id":"用户id",
		"isVip": "0",
	    "name": "用户昵称",
		"pic": "用户头像"
	  },
    }],
	"msg":"服务端的消息"
  }
```

 **返回参数说明** 

| 参数名 | 类型   | 说明                                      |
| :----- | :----- | ----------------------------------------- |
| code   | int    | 200-成功，500-服务端返回的异常消息，去msg |
| data   | Array  | 文章列表                                  |
| msg    | string | 系统的消息数据                            |

`data` 中 Array 数据的示例：


| 参数名  | 类型     | 说明                                                         |
| :------ | :------- | ------------------------------------------------------------ |
| tid     | ObjectId | 这个默认产生的ObjectId(''),取的使用需要\_id                  |
| uid     | String   | 用户ID                                                       |
| title   | String   | 文章标题                                                     |
| content | String   | 文章内容                                                     |
| created | Date     | 创建时间                                                     |
| catalog | String   | 帖子分类，index-全部，ask-提问，advise-建议，discuss-讨论，share-分享，news-动态 |
| fav     | Number   | 帖子积分                                                     |
| isEnd   | String   | 0-未结束，1-已结帖                                           |
| reads   | Number   | 阅读记数                                                     |
| answer  | Number   | 回答记数                                                     |
| status  | String   | 0-打开回复，1-关闭回复                                       |
| isTop   | String   | 0-未置顶，1-已置顶                                           |
| sort    | String   | 置顶排序                                                     |
| tags    | String   | 文章的标签、精华，加精，etc                                  |

`user` 对象说明：

| 参数名 | 类型   | 说明                           |
| :----- | :----- | ------------------------------ |
| id     | string | 用户ID                         |
| name   | string | 用户昵称                       |
| isVip  | string | 是否是会员，0-普通用户，1-会员 |
| pic    | string | 用户头像                       |

##### 3-3 首页接口定义-侧栏接口定义

#### 第4章 首页样式开发

##### 4-1 git 仓库初始化

```bash
git config user.name "jerrychane"
git config user.email "jerrychane@126.com"
git config --list
```

##### 4-2 vue-cli升级到v4版本

```sh
npm install -g @vue/cli
vue upgrade
```

##### 4-4 初识响应式原理

##### 4-7 完成首页静态页面结构

##### 4-8 优化温馨通道样式

```scss
<style lang="scss" scoped>
$border-color: #f2f2f2;
.fly-panel-main {
  padding: 15px;
}
.imooc-quick {
  border: 1px solid $border-color;
  border-bottom: none;
  border-right: none;
  .layui-col-xs6 {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    border: 1px solid $border-color;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    border-left: none;
    border-top: none;
    a {
      display: block;
    }
  }
}
```

#### 第5章 首页筛选交互及接口开发

##### 5-1 首页交互及接口分析&最终效果展示

linkActiveClass和linkExactActiveClass都是用来设置 链接激活时使用的 CSS 类名

linkActiveClass 是只要匹配路由，就会添加类名。

linkExactActiveClass是精确匹配到路由就会添加类名。

linkActiveClass的默认值是router-link-active

linkExactActiveClass的默认值是router-link-exact-active

##### 5-3 首页Panel部分路由交互

##### 5-4 前台首页接口开发

使用 qs 简化接口

```bash
npm i -S qs@6.9.0
```

```js
import axios from '@/utils/request'
import qs from 'qs'
/**
 * 读取文章列表
 * @param {Object} options 读取文章列表接口参数
 */
const getList = (options) => {
    return axios.get('/public/list?' + qs.stringify(options))
}
// 温馨提醒
const getTips = () => {
    return axios.get('/public/tips')
}
// 本周热议
const getTop = () => {
    return axios.get('/public/topWeek')
}
// 友情链接
const getLinks = () => {
    return axios.get('/public/links')
}
export { getList, getTips, getLinks, getTop }
```

##### 5-5 首页列表筛选部分交互逻辑

template 不会渲染任何 DOM 

```vue
<!-- 用户登入后显示 -->
<template v-if="isLogin">
    <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
        <a href="user/index.html">我发表的贴</a>
    </li>
    <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
        <a href="user/index.html#collection">我收藏的贴</a>
    </li>
</template>
```

##### 5-6 拆分首页ListItem组件1

```bash
npm i lodash@^4.17.15 -S
```

##### 5-7 拆分首页ListItem组件2

```bash
npm i -S moment@2.24.0
```

 momen可以使用format方法指定转换格式  

```js
moment(‘1580452305134’).format(‘YYYY-MM-DD’)
```

 moment可以接受两个参数，第二个参数是格式的类型。

```js
moment(‘1580452305134’, ‘MM-YY-DD HH:mm:ss’)
```

 moment().subtract方法接受两个参数，第一个参数是数字，第二参数是单位。

```js 
moment(‘2012-02-02’).isBefore(moment().subtract(7, ‘days’))
```

#### 第6章 首页长列表内容配合Mock数据开发

##### 6-1 长列表加载注意的三个基本面

```js
getList(options)
        .then(res => {
          console.log(res);
          // 对于异常的判断， res.code 非200，我们给用户一个提示
          // 判断是否lists长度为0，如果为零即可直接赋值
          // 当lists长度不为0，后面请求的数据，加入到Lists里面来
          if (res.code === 200) {
            if (this.lists.length === 0) {
              this.lists = res.data;
            } else {
              this.lists = this.lists.concat(res.data);
            }
          }
        })
        .catch(err => {
          this.$alert(err.msg);
        });
```

接口地址:

```html
http://url.cn/5ayaGGs
```

下载 net.js ，进行 mock 数据的监听，同时修改vue.config.js 中的代理地址  和 src/config/index.js 中的dev代理,在 net.js 同级目录 执行命令以下命令，

```bash
node net.js http://www.toimc.com:10040/mock/5d0666bebaa920000bb519b1 http://localhost:3000
```

##### 6-2 axios拦截器取消用户重复请求

##### 6-3 首页列表监听筛选数据

##### 6-4 首页路由监听加载分类数据

##### 6-5 首页侧边栏：温馨通道、友链接口开发

#### 第7章 首页后端开发

##### 7-1 后台项目初始化：项目依赖升级

检查依赖的更新情况

```bash
npm i -g npm-check-updates
```

```bash
npm i -D eslint
npx eslint --init
npx eslint src/**/*.js 查看src目录下的js文件
```

##### 7-2 ESLint规则扩展：使用Standard规则

```bash
npm install --save-dev eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node
```

##### 7-3 定义文章接口的Model（学习Pre、Statics方法）

### 第11周 全栈开发—用户中心和发贴/回帖模块

#### 第1章 个人中心页面与交互开发

##### 1-1 优化用户登录路由

对于用户密码、昵称和角色等敏感信息，在用户登录时不需要返回给用户，需要在服务端进行过滤删除后返回给用户。

```js
 const userObj = user.JSON()
        const arr = ['password', 'username', 'roles']
        arr.map((item) => {
          delete userObj[item]
})
```

##### 1-2 首页个人中心菜单交互

```js
show() {
      console.log("show");
      // 当用户的鼠标移入头像时，显示操作菜单
      this.hoverCtrl = setTimeout(() => {
        this.isHover = true;
      }, 200);
    },
hide() {
  console.log("hide");
  // 当用户的鼠标移出头像时，隐藏操作菜单
  clearTimeout(this.hoverCtrl);
  this.hoverCtrl = setTimeout(() => {
    this.isHover = false;
  }, 5000);
}
```

##### 1-3 使用iconfont制作自定义图标

在使用阿里巴巴图标字体文件时，可以私有化Font Family，以免和其他图标字体冲突；

```vue
<template>
  <div class="layui-container fly-marginTop fly-user-main">
    <ul class="layui-nav layui-nav-tree" lay-filter="test">
      <!-- 侧边导航: <ul class="layui-nav layui-nav-tree layui-nav-side"> -->
      <li
        class="layui-nav-item layui-nav-itemed"
        v-for="(item,index) in lists"
        :key="'center' + index"
      >
        <a href="javascript:;">
          <i class="iconfont-tomic" :class="item.icon"></i>
          {{item.name}}
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "center",
  data() {
    return {
      lists: [
        {
          name: "我的主页",
          icon: "iconhome1"
        },
        {
          name: "基本设置",
          icon: "iconSettings"
        },
        {
          name: "我的帖子",
          icon: "icondocument"
        },
        {
          name: "我的消息",
          icon: "iconmessage1"
        },
        {
          name: "其他设置",
          icon: "iconSimilarproducts"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/custom/iconfont.css";
.iconfont-tomic {
  margin-right: 10px;
}
</style>
```

##### 1-4 使用最新的Layui版本 

```html
https://www.layuicdn.com/
```

##### 1-5 创建个人内容子组件

##### 1-6 完成用户中心欢迎页静态样式书写(CSS基础)

##### 1-7 完成个人中心基本设置(CSS基础)

##### 1-8 完成我的帖子子组件静态样式(CSS基础)

##### 1-9 完成消息&其他设置页面静态样式(CSS基础)

##### 1-10 Sass进阶1@for,@Mixin,Map用法介绍

```bash
npm init -y
npm install -S dart-sass
npx dart-sass test.scss
```

