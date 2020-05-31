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















