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

### 前端框架分类及选型

#### 第 1 章、下一代 web 引擎 koa 框架

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
//.babelrc
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
// src/components/modules/alert/index.js
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

vscode 中安装 Live Sass Compiler，点击 watch 可以实时看到 Css 代码

```bash
npm init -y
npm install -S dart-sass
npx dart-sass test.scss
```

##### 1-12 Sass进阶2@each,Map相关操作，学会书写通用工具类Mixin

```scss
$spacer: 10px;
$spacers: map-merge(
  $map1: (
    0: 0 * $spacer,
    1: 1 * $spacer,
    2: 2 * $spacer,
    3: 3 * $spacer,
    4: 4 * $spacer,
    5: 5 * $spacer,
  ),
  $map2: (),
);

@each $key, $value in $spacers {
  .p-#{$key} {
    padding: $value;
  }
}
```

```scss
// 合并 map.scss
$spacers: (
  6: 60px,
  7: 70px,
) !default;
// unites.scss
$spacer: 8px;
$spacers: map-merge(
  $map1: (
    0: 0 * $spacer,
    1: 1 * $spacer,
    2: 2 * $spacer,
    3: 3 * $spacer,
    4: 4 * $spacer,
    5: 5 * $spacer,
  ),
  $map2: $spacers,// 必须是一个map
);

@each $key, $value in $spacers {
  .p-#{$key} {
    padding: $value;
  }
}
```

#### 第2章 前后端分离后安全机制与缓存机制

##### 2-1 用户信息如何缓存？localStorage&SessionStorage的区别 

```js
sessionStorage.setItem("userInfo", JSON.stringify(res.data));
```

sessionStorage 只存在于本次会话中，切换 tab 页签或关闭 tab 页签存储的内容就没有了。

```
localStorage.setItem("userInfo", JSON.stringify(res.data));
```

localStorage 能够将数据存储在缓存中，除非用户主动清除，否则将一直保留。localStorage.clear 方法可以清除当前域下的所有缓存。

sessionStorage和localStorage都仅在客户端(即浏览器)中保存，不参与和服务器的通信。sessionStorage和localStorage在使用时需要注意一些安全性问题，都不适合存放敏感数据。

##### 2-3 登录路由优化（全局路由守卫） 

路由元信息的使用,beforeRouterEnter 是组件内的守卫，应该通过 beforeEach注册全局前置守卫，对应三个参数分别为 to, from , next，to为即将进入的目标，from 是当前导航要离开的路由，next 是一个方法，调用后退出当前的等待。

#### 第3章 用户积分体系之签到模块开发

##### 3-11 自定义Pop气泡组件

##### 3-12 完善签到组件

#### 第4章 修改基本信息页面开发

##### 4-1 异常路由处理，添加404页面

##### 4-2 input标签radio样式自定义

##### 4-11 上传头像前端页面开发

```js
upload (e) {
    let file = e.target.files
    let formData = new FormData()
    if(file.length>0) {
        formData.append('file',file[0])
        this.formData = formData
    }
    // 上传图片之后 -> uploadImg
    uploadImg(this.formData).then((res) => {
        updateUserInfo({pic:this.pic}).then((res) => {
            if(res.code === 200) {
                let user = this.$store.state.userInfo
                user.pic = this.pic
                this.$store.commit('setUserInfo',user)
                this.$alter('图片上传成功')
            }
        })
    })
    // 更新用户基本资料 -> uploadUserInfo
}
// 图片上传接口
const uploadImg = (formData) =>axios.post('/content/upload',formData)
```

##### 5-4 使用mixin混入优化图片验证码功能

mixin中的数据对象与组件中的数据对象重名时，优先组件中的数据。当组件的methods中有与mixin的methods方法重名，调用此方法时，只会执行组件中的方法。

##### 5-6 自定义表情&transition过渡、父子通信

 Vue 提供了 transition 的封装组件来实现过渡效果，其中name属性定义类名的前缀，如果不定义，默认的前缀为v-。

想要transition实现过渡效果，需要触发条件（比如：v-if、v-show等）。

enter-to / leave-to在Vue 2.1.8版本之后出现，定义 进入/离开 时过渡的结束状态。

#### 第6章 帖子详情页面开发--需求、样式与自定义组件

##### 6-6 分页组件逻辑分析&lodash进阶使用

```js
_.range([start=0], end, [step=1])
```

创建一个包含从 start 到 end，但不包含 end 本身范围数字的数组。 如果 start 是负数，而 end 或 step 没有指定，那么 step 从 -1 为开始。 如果 end 没有指定，start 设置为 0。 如果 end 小于 start ，会创建一个空数组，除非指定了 step。

###### 参数

1. `[start=0]` *(number)*: 开始的范围。
2. `end` *(number)*: 结束的范围。
3. `[step=1]` *(number)*: 范围的增量 或者 减量。

###### 返回

*(Array)*: 返回范围内数字组成的新数组。

###### 例子

```js
_.range(4);
// => [0, 1, 2, 3] 
_.range(-4);
// => [0, -1, -2, -3]
_.range(1, 5);
// => [1, 2, 3, 4]
_.range(0, 20, 5);
// => [0, 5, 10, 15]
_.range(0, -4, -1);
// => [0, -1, -2, -3]
_.range(1, 4, 0);
// => [1, 1, 1]
_.range(0);
// => []
```

##### 6-7 控制按钮样式与列表index绑定

官方风格指南：v-for 不能 与 v-if 共用；v-if 必须放在真实的元素上，不能放在 template 中；template 不会形成任何 dom 节点或 dom 元素，特别适合写 for 循环；

#### 第7章 帖子详情页面开发--评论点赞、回复

##### 7-1 Mock数据调试前端评论列表样式

##### 7-2 文章详情后台接口开发&前后端调试

### 第12周 消息中间件开发（WebSocket通信）

#### 第1章 WebSocket简介

##### 1-1 websocket章导学

* 了解 websocket 使用场景、工作原理
* 熟悉 websocket 常用 API （属性、方法）
* 开发调试 websocket 应用（多人聊天、鉴权、离线消息）

##### 1-2 Websocket基础

什么是 websocket? websocket 是一种网络传输协议，可在单个TCP连接上进行全双工通信，位于OSI模型的应用层。

特点：

* TCP连接，与HTTP协议兼容
* 双向通信，主动推送（服务端向客户端）
* 无同源限制，协议标识符是ws (加密wss)

应用场景：

* 聊天、消息、点赞
* 直播评论（弹幕）
* 游戏、协同编辑、基于位置的应用

##### 1-3 第一个WebSocket应用

ws 常用前端库

* ws (实现原生协议，特点：通用、性能高、定制性强)
* socket.io (向下兼容协议，特点：适配性强、性能一般)

```bash
npm init -y
npm i -S ws@7.2.1
```

##### 1-4 常见API介绍&第一个ws应用

```js
// server/index.js
const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 3000 })
wss.on('connection',function connection(ws) {
    console.log('one client is connected');
    // 接收客户端的消息
    ws.on('message',function (msg) {
        console.log(msg);
    })
    // 主动发送消息给客户端
    ws.send('Message from server')
})
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <script>
      var ws = new WebSocket('ws://127.0.0.1:3000')
      ws.onopen = function () {
        ws.send('Hello from client')
      }
      ws.onmessage = function (event) {
        console.log(event.data)
      }
    </script>
  </body>
</html>

```

##### 1-5 socket.io开发简单的消息应用

```bash
npm i -S socket.io@2.3.0
npm i -S express@4.17.1
```

```js
// sockit/server.js
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', function(socket) {
    console.log('a socket is running');
    socket.on('chatEvent', function(msg) {
        console.log('msg from client ' + msg);
        // socket.send('server says:' + msg)
        socket.broadcast.emit('ServerMsg', msg)
    })
})
http.listen(3000, function() {
    console.log('server is running on:3000');
})
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.staticfile.org/socket.io/2.3.0/socket.io.js"></script>
</head>
<body>
    <input type="text" name="" id="msg">
    <button type="button" id="btn">发送</button>
</body>
<script>
    var socket = io()
    document.getElementById('btn').addEventListener('click', function() {
        var value = document.getElementById('msg').value
        socket.emit('chatEvent', value)
        document.getElementById('msg').value = ''
    })
    socket.on('ServerMsg', function(msg) {
        console.log(msg);
    })
</script>
</html>
```

##### 1-6 WebSocket属性onerror&onclose

| Constant             | readyState |
| -------------------- | ---------- |
| Websocket.CONNETTING | 0          |
| Websocket.OPEN       | 1          |
| Websocket.CLOSING    | 2          |
| Websocket.ERROR      | 3          |
| Websocket.CLOSE      | 3          |

#### 第2章 多人聊天室应用

##### 2-1 ws实现聊天功能(消息广播)

```js
// server/index.js
const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 3000 })
wss.on('connection',function connection(ws) {
    console.log('one client is connected');
    // 接收客户端的消息
    ws.on('message',function (msg) {
        console.log(msg);
        // 主动发送消息给客户端
        // ws.send("server: "+ msg)
        // 广播消息
        wss.clients.forEach((client) => {
          client.send('server: ' + msg)
        })
    })
})
```

红色箭头为服务端向客户端发送消息，绿色箭头为客户端向服务端发送消息

##### 2-2 进入聊天室欢迎语功能

```js
var app = new Vue({
      el: '#app',
      data: {
        message: '',
        lists: [],
        ws: {},
        name: '',
        isShow: true
      },
      mounted() {
        this.ws = new WebSocket('ws://127.0.0.1:3000')
        this.ws.onopen = this.onOpen
        this.ws.onmessage = this.onMessage
        this.ws.onclose = this.onClose
        this.ws.onerror = this.onError
      },
      methods: {
        enter: function () {
          if (this.name.trim() === '') {
            alert('用户名不得为空')
            return
          }
          this.isShow = false
          this.ws.send(JSON.stringify({
            event: 'enter',
            message: this.name
          }))
        },
        onOpen: function () {
          console.log('open:' + this.ws.readyState);
          // ws.send('Hello from client')
        },
        onMessage: function (event) {
         // 接收服务端发送过来的消息
          var obj = JSON.parse(event.data);
          if (obj.event === 'enter') {
            // 当一个新的用户进入聊天室
            this.lists.push('欢迎: ' + obj.message + '加入聊天室')
          } else {
              // 接收正常的聊天
            this.lists.push(obj.message)
          }
        },
        onClose: function () {
          console.log('close:' + this.ws.readyState);
          console.log('已关闭 websocket');
        },
        onError: function () {
          console.log('error:' + this.ws.readyState);
          console.log('websocket 连接失败！');
        },
        // 发送消息
        send: function () {
          this.lists.push(this.message)
          this.ws.send(JSON.stringify({
            event: 'message',
            message: this.message
          }))
          this.message = ''
        },
      }
    })
```

##### 2-3 统计在线人数&离开聊天室发送通知

所有在线人数：`wss.clients.size`

##### 2-4 多聊天室

在服务端增加 roomid ，通过服务端的 roomid 进行判断，是否发送消息；

```js
if (client.readyState === WebSocket.OPEN && client.roomid === ws.roomid) {
        ...
 }
```

#### 第3章 WebSocket消息应用进阶

##### 3-1 WebSocket鉴权方式

在浏览器端调用ws, 会自动降级调用 http 中的 websocket, 不能传递 header 对象。

```bash
npm i jsonwebtoken@8.5.1
```

jsonwebtoken 主要用于解析前端发送过来的 token 数据。

* 协议本身在握手阶段不提供鉴权方案（主要是头部headers信息有规定的格式）
* 浏览器侧： url 传参、message 主动消息、session/cookie(适合浏览器端的websocket连接)
* Nodejs侧： 直接使用 ws 传递 Headers

##### 3-2 心跳检测&断线重连

##### 3-3 心跳检测&断线重连联调

##### 3-4 离线消息缓存开发准备

##### 3-5 消息缓存流程图&数据结构设计

当我们离开或关闭了我们的应用，再次登录时可以收到其他朋友给我们发送的消息。在消息缓存里需要存放是哪个用户，发送的什么消息。

Redis 缓存：房间用户（userID:1） &&  未读消息

##### 3-6 离线消息缓存-存储房间信息

##### 3-7 离线消息缓存-消息缓存

#### 第4章 个人中心--我的消息（实时、历史消息）开发

##### 4-2 后端消息查询方法一：MongoDB联合查询（困难）

##### 4-4 实时消息开发-后端WebSocket封装

##### 4-7 清空全部消息功能开发

##### 4-8 实时消息开发-断线重连

##### 4-9 本章总结

###### websocket 常见 API 

* 事件：onopen,onmessage,onerror,onclose

* 方法：send,close

* 兼容：尽量保证兼容，进行版本与状态控制

###### websocket 实战应用

* 基本的消息发送、退出提示、在线人数

* 心跳检测、断线重连

* 离线消息缓存

###### 个人中心-我的消息

* 历史消息 -> MongoDB -> 聚合查询
* 实时消息通知 -> Client、Server封装 -> 注意作用域
* 通知部分 -> mapState、actions、dispatch

### 第13周 性能优化--服务端渲染

#### 第1章 导读

##### 1-1 导学

SSR 基本概念 、SSR 工作原理、Nuxt.js 改造前端项目

Vue.js vs Nuxt.js

| 分类     | Vue.js                  | Nuxt.js                                     |
| -------- | ----------------------- | ------------------------------------------- |
| 框架     | 独立框架                | 基于Vue.js,不仅用于服务端渲染，还进行了丰富 |
| 生命周期 | 全                      | 只有created,beforeCreate                    |
| 组件     | router-view,router-link | nuxt,nuxt-child,nuxt-link,client-only       |
| 路由     | 自定义                  | 由文件名、文件夹自动生成                    |
| 目录结构 | 自定义                  | 相对限定，不同的文件名不同的默认行为        |
| 第三方库 | 自定义                  | 需求分浏览器与Node侧                        |
| 其他     | CLI集成了vuex,router    | Prettier,UI框架等                           |

#### 第2章 Vue服务端渲染方案一vue-server-renderer

##### 2-2 SSR学习路径

* 在服务端编写客户端代码时，要避免交叉状态污染（cross-request state pollution）;
* 尽量避免在 beforeCreate 和 created 中使用setInterval函数；
* 在服务端测不能够访问 window 或 document 等全局变量；
* 避免使用自定义的指令；

##### 2-3 SSR的webpack打包配置

```bash
npm i vue@2.6.11 vue-server-renderer@2.6.11 --save
npm i webpack webpack-cli friendly-errors-webpack-plugin vue-template-compiler vue-loader babel-loader vue-style-loader css-loader sass-loader @babel/core url-loader file-loader sass webpack-merge webpack-node-
externals rimraf @babel/preset-env -D
```

##### 2-4 第一个SSR应用

```js
const Vue = require('vue')
const path = require('path')
const server = require('express')()
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer')

const resolve = file => path.resolve(__dirname, file)
const bundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const templatePath = resolve('./src/index.template.html')
const template = fs.readFileSync(templatePath, 'utf-8')
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false, // 推荐
  template, // （可选）页面模板
  clientManifest // （可选）客户端构建 manifest
})

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
```

##### 2-5 配置SSR webpack热重载流程分析

```bash
npm i webpack-dev-middleware webpack-hot-middleware -D
```

##### 2-6 配置学习webpack-dev-middleware&webpack-hot-middleware

```js
// webpack.client.config.js
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(baseConfig, {
  entry: './src/entry-client.js',
  optimization: {
    // 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
    // 以便可以在之后正确注入异步 chunk。
    // 这也为你的 应用程序/vendor 代码提供了更好的缓存。
    splitChunks: {
      name: "manifest",
      minChunks: Infinity
    }
  },
  plugins: [
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin()
  ]
})
```

```js
// webpack.server.config.js
const { merge } = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.config.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseConfig, {
  // 将 entry 指向应用程序的 server entry 文件
  entry: './src/entry-server.js',

  // 这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，
  // 并且还会在编译 Vue 组件时，
  // 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
  target: 'node',

  // 对 bundle renderer 提供 source map 支持
  devtool: 'source-map',

  // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
  output: {
    libraryTarget: 'commonjs2'
  },

  // https://webpack.js.org/configuration/externals/#function
  // https://github.com/liady/webpack-node-externals
  // 外置化应用程序依赖模块。可以使服务器构建速度更快，
  // 并生成较小的 bundle 文件。
  externals: nodeExternals({
    // 不要外置化 webpack 需要处理的依赖模块。
    // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
    // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
    allowlist: /\.css$/
  }),

  // 这是将服务器的整个输出
  // 构建为单个 JSON 文件的插件。
  // 默认文件名为 `vue-ssr-server-bundle.json`
  plugins: [
    new VueSSRServerPlugin()
  ]
})
```

```js
//webpack.base.config.js
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const resolve = (dir) => path.join(path.resolve(__dirname, '../'), dir)
const isProd = process.env.NODE_ENV === "production"

module.exports = {
  mode: isProd ? 'production' : 'development',
  output: {
    path: resolve('dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      'public': resolve('public')
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.s(a|c)ss?$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
    ]
  },
  performance: {
    hints: false
  },
  plugins: [
    new VueLoaderPlugin(),
    new FriendlyErrorsWebpackPlugin(),// 友好编译界面提示
    // new CleanWebpackPlugin(),
  ]
}
```

```bash
npm i chokidar -D
npm i memory-fs -D
```

##### 2-7 调试webpack热重载

##### 2-8 路由和代码分割

dynamic import 和 code split 结合

```bash
npm i @babel/plugin-syntax-dynamic-import -D
```

```js
// learn/vue-ssr/src/router.js
export default new Router(
 {
    mode: 'history',
    routes: [
      // ...
      {
        path: '/hello',
        component: () => import(/* webpackChunkName:'hello' */'./components/Hello.vue')
      }
    ]
 })
```

##### 2-9 数据预取和状态

开始渲染过程之前，需要预先获取和解析好一些数据。

```bash
npm i vuex-router-sync -S
npm i vuex -S
```

#### 第3章 Vue服务端渲染方案二：Nuxt.js

##### 3-1 Nuxtjs 简介

* Nuxtjs 是一个基于 Vue.js 的通用应用框架
* 预设了利用 Vue.js 开发服务端渲染所需要的各种配置
* 提供静态站点、异步数据加载、中间件支持、布局支持等

```bash
npx create-nuxt-app@2.14.0 nuxt-demo
```

##### 3-2 工程目录&自动生成路由

###### 1、Vue 应用目录

``` js
src
	-- components    // 存放业务组件
    -- view          // 页面视图
    -- api           // 页面请求
    -- router        // 路由
    -- utils         // 公共配置
    -- store         // vuex
```

###### 2、Nuxt 应用工程目录

``` js
/
	-- layouts       // 视图
    -- pages         // 页面、用于形成路由
    -- components    // 存放业务组件
    -- assets        // 预编译资源 sass
    -- plugins       // 插件配置
    -- middleware    // 模块
    -- static        // 静态资源 (robots.txt 等)
    -- store         // vuex
```

Nuxt 没有 src 目录，而是将所有文件存放在根目录下，通过 pages 形成动态的路由，目录的名称是固定的；

npm run dev 是报错：Delete `␍`eslint(prettier/prettier)

需要在 package.json 将 --fix加入到 lint 命令中，即改成下面的方式：

```bash
"lint": "eslint --fix --ext .js,.vue src test/unit"
```

npm run dev 会报错： npm i sass sass-loader -S

* 安装：npx create-nuxt-app <project-name>
* 配置 vscode 插件 vetur
* 认识 Nuxt 工程化目录

##### 3-3 Nuxtjs异步数据

```bash
npm install -g json-server
json-server --watch db.json 
json-server --watch db.json --port=8000 # 端口冲突下使用
```

* asyncData 方法的基本使用
* store(vuex)，@nuxjs/axios,json-sever 集成
* 异步数据中 context 上下文对象

##### 3-4 Universal Mode

* 传统 SPA 应用的工作模式
* 什么是 Universal Mode ?
* Universal Mode 的工作原理 & 测试

###### 1、SPA 应用很慢，why ?

* 下载 index.html
* 下载 Vue 应用相关的 JavaScript 文件
* 初始化 Vue 应用
* 初始化 Vue 路由，并且导航到对应的路由组件
* 请求 API 接口，拉取必要渲染所需的数据
* 渲染页面

###### 2、Universal Mode 

会在滚动到对应位置加载相应的 js 文件，不会在一开始的时候就加载

##### 3-5 登录鉴权之nuxtjs auth模块

### 第14周 组件化思想进阶：iview上手文章管理

#### 第1章 导读

##### 1-1 后台管理全局思想

**后台界面 & 接口对接**

* 确定自己的角色与职责（分主次）
* 确定开发线路 （抓重点）
* 确定开发细节 （可实施）

**业务开发总结**

* 基础框架 --> 应用组件 --> 工程化开发  --> 标准化
* 开发模式 -->  开发效率提升  --> 自动化
* 项目积累 -->  业务沉淀 --> 规范化、文档化

##### 1-2 课程导读

**重点知识内容**

* 了解 iview-admin 及组件逻辑
* 如何快速开发新的 UI 页面
* 开发用户管理页面

####  第2章 中后台UI进阶（升级iview-admin基础组件库）

##### 2-1 项目依赖升级：Prettier&lint-stage配置

```bash
vue --version
vue upgrade
npm i prettier-eslint -D
```

##### 2-2 升级iview4.x版本&配置sass-loader

```bash
npm i view-design -S
```

##### 2-3 工程目录

```bash
https://lison16.github.io/iview-admin-doc/#/
```

###### 目录结构

```text
├── config  开发相关配置
├── public  打包所需静态资源
└── src
    ├── api  AJAX请求
    └── assets  项目静态资源
        ├── icons  自定义图标资源
        └── images  图片资源
    ├── components  业务组件
    ├── config  项目运行配置
    ├── directive  自定义指令
    ├── libs  封装工具函数
    ├── locale  多语言文件
    ├── mock  mock模拟数据
    ├── router  路由配置
    ├── store  Vuex配置
    ├── view  页面文件
    └── tests  测试相关
```

> 学贵心悟，守旧无功，想清楚比马上动手更重要。

* 业务目录：components,views,api,router,store
* 资源配置：assets,locale,config
* 测试目录：mock,test

##### 2-4 修改登录表单，添加图片验证码样式

使用 scoped 后，父组件的样式将不会渗透到子组件中。不过一个子组件的根节点会同时受其父组件有作用域的 CSS 和子组件有作用域的 CSS 的影响。

##### 2-5 iview-admin整体代码逻辑分析&图片验证码接口对接

**登录部分对接**

* 登录表单的样式调整
* 登录参数及接口定义
* 调整登录部分 Mock 请求到真实接口

什么情况下要用 components ?  用于某个特定业务的模块

什么情况下要用 module?  可以用在任务框架下的组件，能够复用

什么情况下要用 plugin? 在项目的全局，在任意一个地方都可能用到

##### 2-6 vuex中modules用法介绍

###### 使用常量替代 Mutation 事件类型

```js
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION';
```

```js
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
   state:{...},
   mutations:{
   // 可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
       [SOME_MUTATION](state) {
           // mutate state
       }
   }
})
```

##### 2-7 完成登录功能接口联调&登录组件改造

##### 2-8 登录Form组件数据校验

##### 2-9 用户登录状态保存（js-cookie）

#### 第3章 后台文章管理页面开发

##### 3-1 创建自定义路由

```js
//  src/router/community.js
import Main from '@/components/main'
export default [
  // 菜单分三种情况
  //  链接式的跳转 -> doc
  //  内嵌的子页面 -> Main Layout -> children
  //  一级菜单上添加的路由 (hideInMenu hideInBread)
  // 内容管理
  // 1.文章管理 -> 文章内容管理，文章标签管理（热门、精华 etc）
  {
    path: '/manage',
    name: 'manage',
    meta: {
      icon: 'logo-buffer',
      title: '文章管理'
    },
    component: Main,
    children: [
      {
        path: 'tables_page',
        name: 'tables_page',
        meta: {
          icon: 'md-grid',
          title: '文章内容管理'
        },
        component: () => import('@/view/components/tables/tables.vue')
      }
    ]
  }
]
```

##### 3-2 路由多语言逻辑分析&i18n多语言插件

多语设置的思路：a.看官方文档； b.全文进行搜素（效率最高）；c.查看路由逻辑（debugger）

##### 3-3 自定义内容管理页面基础样式

##### 3-4 两种格式化表格数据的方法（推荐render动态渲染）

```js
getList({ page: 0, limit: 10 }).then((res) => {
      // 方法一：修改getList接口
       const data = res.data
       data.forEach((item) => {
         if (item.status === 0) {
           item.status = '打开回复'
         } else {
           item.status = '禁止回复'
         }
       })
this.tableData = res.data
```

```js
// 方法二： 使用 render 动态渲染 (推荐使用)
{
  title: '作者',
  key: 'user',
  width: 120,
  align: 'center',
 // 方法二：使用 render 方法结构化数据
  render: (h, params) => {
    return h('div', [h('span', params.row.uid.name)])
  }
}
```

##### 3-5 集成Page分页组件

##### 3-6 自定义表格组件操作功能

##### 3-7 删除指定文章功能开发&接口联调

##### 3-8 文章管理编辑模态框

##### 3-9 文章管理编辑功能开发&接口联调

##### 3-10 标签管理页面开发（代码作业）

### 第15周-中后台权限系统：前端权限设计

#### 第1章 导读

##### 1-1 导学

* 权限设计基础
* 前台权限控制（页面-混合-后端），前台的控制大多是控制用户能否看到某些元素或某些页面，但不能控制用户访问某个接口或某条数据；控制数据和控制接口，通常在后端实现；
* 后台权限设计（RBAC - 基于权限的设计、ABAC - 基于属性的设计）

#### 第2章 前端权限方案（路由级、组件级、按钮级实现）

###### 2-1 权限基础（什么是菜单权限、数据权限）

* 页面 ---  页面权限（菜单权限），在js层面、浏览器层面进行控制，属于弱控制，用户可以通过修改浏览器里面的变量，从而让某个按钮或页面显示出来；
* 增、删、改、查  ---  操作权限
* 数据  ---  数据权限（针对某个接口）

##### 2-2 页面权限举例：基于角色的权限控制

##### 2-3 页面权限举例：操作权限控制

##### 2-4 角色权限控制基础

#### 第3章 用户管理（自定义动态搜索组件、批量设置）

##### 3-1 用户管理页面样式开发-添加Tables行批量选择功能

* @on-select , 选中某一项触发，返回值为 selection 和 row，分别为已选项和刚选择的项。
* @on-select-all, 点击全选时触发，返回值为 selection,已选项。
* @on-selection-change,只要选中项发生变化时就会触发，返回值为 selection，已选项。

##### 3-2 开发用户管理接口（获取用户列表）

##### 3-3 用户基本信息编辑功能

##### 3-4 修改用户信息&删除用户模态框开发（form表单异步校验）

##### 3-5 新增用户前台样式&交互开发

##### 3-6 新增用户接口开发&联调

##### 3-7 批量操作-批量删除用户（学习deleteMany方法）

##### 3-8 批量操作-批量设置用户前台样式&交互开发

##### 3-9 批量操作-批量设置用户接口开发&联调

##### 3-10 自定义搜索组件样式

##### 3-11 自定义搜索组件动态选项交互

##### 3-12 自定义搜索组件交互调试

##### 3-13 自定义搜索组件接口开发

* 1.datepicker - item:string, search  ---> array , starttime, endtime;
* 2.radio ---> key - value , $in
* 3.select ---> key -value ,$in

#### 第四章 权限设计

##### 4-1 菜单权限设计基础

* 菜单权限设计分为 原型设计、数据库设计（难点）、接口设计

* 菜单权限与用户如何进行关联（多对多，还是1对多）
* 树形菜单数据如何查询
* 菜单权限界面如何设计
* 经典模型：用户 ---> 角色（1：n） --->  菜单 （1：n）---> 操作（1：n）

**数据库设计：**

* Menu : 存储菜单，子菜单和资源操作
* Roles ：存储角色 ，存储对应的 Menu
* Users ： 存储用户角色

##### 4-2 菜单&权限管理数据库设计

##### 4-3 菜单&权限管理页面设计思考

##### 4-4 开发准备-删除无用页面

### 第16周-中后台权限系统：基于角色&菜单权限设计

#### 第1章 菜单管理基础样式（响应式、自定义表单）

##### 1-1 创建菜单&权限管理页面路由

##### 1-2 开发菜单管理页面样式（响应式布局设置） 

##### 1-3 菜单管理表单内容定制（vue中webpack链式配置：添加iview-loader）                                     

##### 1-4 自定义资源选项（分析页面交互，添加功能按钮）

#### 第2章 菜单管理多级树形控件

##### 2-1 添加菜单Dropdown交互

##### 2-2 多级菜单树添加兄弟节点、子节点交互

##### 2-3 多级菜单树编辑功能交互

排序可以使用 loadash 中的  sortby 方法；

##### 2-4 多级菜单树删除交互&操作互锁功能

##### 2-5 代码作业：菜单管理页面-组件拆分

#### 第3章 菜单管理之资源管理

##### 3-1 资源管理添加交互

##### 3-2 资源管理数据保存与显示交互

##### 3-3 资源管理批量设置、删除（完成菜单管理页面级交互）

#### 第4章 菜单管理接口开发

##### 4-1 Mongodb嵌套Model定义方法-定义菜单Menus

##### 4-2 菜单管理数据库操作机制

##### 4-3 菜单管理接口（CURD操作）

在 mounted () 方法中可以添加 window.vue = this , 进行调试，获取页面中的数据；

##### 4-4 获取&添加菜单接口对接（递归查询父节点）

在写递归时，先写特殊情况，再写一般情况，并通过一些临界值去验证；

##### 4-5 添加子菜单&更新菜单接口对接&联调

##### 4-6 菜单管理删除菜单接口联调

#### 第5章 角色权限页面开发

##### 5-1 角色权限页面样式开发

##### 5-2 角色权限页面交互分析&添加角色模态框

##### 5-3 角色权限管理交互（添加角色、角色权限展示）

##### 5-4 角色与菜单权限&操作权限联动交互

##### 5-5 角色权限操作互锁（非编辑状态判断）

```js
// 扁平化数组的方法
const flatten = (arr) => {
    while(arr.some((item)=> Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr
}
```

##### 5-7 角色权限接口开发&联调

#### 第6章 用户权限管理&接口权限（数据权限）开发

##### 6-1 用户管理页面（对接角色信息）

##### 6-3 获取用户所有角色权限信息

##### 6-4 完成动态菜单联调

##### 6-5 如何配置超级管理员

##### 6-6 接口权限控制中间件开发(数据权限)

### 第17周-首页可视化图表与日志服务

#### 第1章 首页可视化&Echart导学

##### 1-2 Echarts基础&地图类型图表两种解决方案

#### 第2章 首页统计

##### 2-1 首页顶部统计信息-新增用户统计

新增用户的接口和后台逻辑，三种更新子组件的方法；

##### 2-2 首页顶部统计-周数据统计

WeekDay add .weekday() API to get or set locale aware of the week.

```js
var weekday = require('dayjs/plugin/weekday')
dayjs.extend(weekday)
// when Monday is first day of the week
dayjs().weekday(-7) // last Monday
dayjs().weekday(7) // next Monday
```

##### 2-3 定制发帖统计功能（通用饼状组件）

##### 2-4 近6月累计发帖统计（aggregate进阶）

柱状组件横轴是 key 值， 纵轴是 value 值；

##### 2-5 近7日的统计数据（echarts 进阶）

type 为展示图的形状

##### 2-6 近7日的统计数据接口&联调

#### 第3章 监控日志服务

##### 3-1 准备联调开发环境

要实现复杂业务，其实是对综合业务的综合，包括解决问题的能力锻炼。

开发准备：云服务器（公网），配置 MongoDB 数据库、Redis 服务，域名（可选）

##### 3-2 监控日志方法一：简单的调试日志 koa-logger

日志收集 - 日志分类 - 错误日志 & 开发日志 （koa-logger & koa-log4j）

```shell
<-- GET /
--> GET / 200 835ms 746b
<-- GET /
--> GET / 200 960ms 1.9kb
<-- GET /users
--> GET /users 200 357ms 922b
<-- GET /users?page=2
--> GET /users?page=2 200 466ms 4.66kb
```

安装

```shell
$ npm install koa-logger
```

##### 3-3 监控日志方法二：文件日志 koa-log4js

使用 level 去限定打印日志的级别，例如只有 error 日志，才会打印到特定的文件中去。

介绍一个库：koa-log4js，其实是在koa-log4js上做了一层封装，使用起来和koa-log4js 是一样；

```js
import log4js from 'koa-log4js'
log4js.configure({
	appenders:{
      "type": "dateFile",
      "filename": "logs/access.log",
      "pattern": "-yyyy-MM-dd.log"
    },
    application:{
      "type": "dateFile",
      "filename": "logs/app.log",
      "pattern": "-yyyy-MM-dd.log"
    },
    error:{
      "type": "dateFile",
      "filename": "logs/error.log",
      "pattern": "-yyyy-MM-dd.log"
    },
    out:{type:'console'}
},
   categories:{
    default: {"appenders": ["console","app"],"level": "all"} ,
    access:{ "appenders": [ "errors"],"level": "error"},
 })
 export default log4js
```

##### 3-4 错误日志收集 koa 中间件开发（持久化方案-数据库保存）

收集的日志主要是后台管理端 web 错误日志；埋点 - 第三方 sdk, 对用户的行为进行监控；对于错误日志是没有编辑功能的。

##### 3-5 管理后台页面：table 组件 render 进阶

##### 3-6 管理后台页面参数详情 & 批量删除功能

##### 3-7 错误日志筛选查询（表格filterRemote）

ViewUI: flters 过滤数组的选项，格式为数组，数组中每项包含 label 和 value 属性，使用过滤，必须同时配合使用 filterMethod。

#### 第4章 前后台联调 & 持续集成任务配置

##### 4-1 联调项目部署介绍

##### 4-2 社区应用与后端联调（配置接口权限、优化登录细节）

##### 4-3 自动化流程回顾 + Jenkins 节点管理

##### 4-4 项目部署准备（Dockerfile、生产环境 mongo & redis）

```shell
From node:12-alpine
LABEL maintainer=brian@tomic.com
# 创建一个工作目录
WORKDIR /app
COYP ..
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories && apk update
RUN apk --no-cache add --virtual builds-deps build-base python alpine-sdk \
 && npm install --no-progress --registry=https://registry.npm.taobao.org \
 && npm run build \
 && npm run build bcrypt --build-from-source \
 && apk del builds-deps
EXPOSE 12500
VOLUME ["/app/public"]
CMD ["node","dist/server.bundle.js"]
```

##### 4-5 接口项目配置自动化任务（敏感信息、微信通知）

添加密钥时，需要粘贴私钥，不要粘贴公钥；前端项目和后台管理的接口不同；

##### 4-6 自动化部署前后台项目

### 第18周 WebApp 页面设计与开发

#### 第1章 必学导学

##### 1-1 WebApp 章导学

- 移动端开发的重难点
- 移动端适配（Saas Mixin）
- 上拉加载、下拉刷新（自定义 Scroll 组件）

长列表、适配、样式、滚动、上/下拉、布局、交互设计

什么是移动端 WebApp?

移动端 WebApp : 泛指在手持设备移动端的 web。

特点：

- 类 App 应用，运行环境是浏览器；
- 可以包一层壳，成为 App;
- 常见的混合应用：ionic, cordova,appcan, uni-app;
- 原生应用：ReactNative, Flutter；
- 桌面应用：Electron;

##### 1-2 WebApp原型稿&项目演示

#### 第2章 基础组件开发

##### 2-1 Mint-ui介绍（熟悉组件名称、使用场景）

##### 2-2 Mint 项目初始化（配置babel）

```shell
npm i mint-ui -S
npm install babel-plugin-component -D
```

##### 2-3 项目 state 分层级动态 module 加载（改造登录逻辑）

```js
const files = require.context('./modules',false,/\.js$/);
const modules = {};
// 动态加载 vuex
files.keys().forEach(key => {
    modules[key.replace(/(\.\/|\.js)/g,'')] = files(key).default
})
```

##### 2-4  自定义 icon 组件（svg-sprite-loader 的 vue  webpack 配置）

##### 2-5 自定义 header 组件（动态组件注册）

##### 2-6 全局样式方案：Normalize 和 Reset

```shell
npm install --save normalize.css
```

##### 2-7 全局预处理样式 & 变量 sass-loader 配置

##### 2-8 如何修改UI框架主题？（三种思路）

#### 第3章 常见问题解决方案（适配、上下拉加载）

##### 3-1 添加首页路由及页面 Tabs 

##### 3-2 自定义搜索组件（移动端适配方案 postcss-px-to-viewport）

```js
plugins:{
    'postcss-px-to-viewport':{
          unitToConvert: 'px',
          viewportWidth: 320,
          unitPrecision: 5,
          propList: ['*'],
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
          selectorBlackList: [],
          minPixelValue: 1,
          mediaQuery: false,
          replace: true,
          exclude: [],
          landscape: false,
          landscapeUnit: 'vw',
          landscapeWidth: 568
    }
}
```

##### 3-3 作业：iconfont 添加自定义去色的 svg 图片

##### 3-4 自定义 Footer 组件

##### 3-5 移动端适配底部 Footer 组件（mixin 方法扩展应用）

```scss
// @include resH-to(small-screens) {}
@mixin resH-to($media) {
    @if $media == small-greens {
        @media only screen and (max-heihgt:$height-small) {
            @content;
        }
    }
}
```

##### 3-6 下拉刷新、上拉加载（重要）

主要监听页面上 touchstart、touchmove、touchend ， 这三个事件；

##### 3-7 自定义首页 ListItem 组件

### 第19周 WebApp 前后端联调

#### 第1章 详情页交互

##### 1-1 详情页面需求分析 & 详情页面开发准备

##### 1-2 详情页面开发-文章、底部输入框

##### 1-3 完成评论列表样式

##### 1-4 评论列表样式（无限滚动加载）

#### 第2章 移动端适配解决方案

##### 2-1 处理微信下拉黑边

```js
// src/utils/forbidScroll.js
export const forbidScroll = (elem) => {
  let flag = false

  elem.addEventListener('touchstart', (evt) => {
    if (elem.contains(evt.target)) {
      flag = true
    } else {
      flag = false
    }
  }, false)
  elem.addEventListener('touchmove', (evt) => {
    evt.prop = flag
  })
}

const handler = (evt) => {
  if (evt.prop) {
    evt.preventDefault()
  }
}

document.body.removeEventListener('touchmove', handler, { passive: false })
document.body.addEventListener('touchmove', handler, { passive: false })
```

##### 2-2 移动端 HTML 的 Meta 标签配置

##### 2-3 移动端横竖屏兼容 CSS 方案

CSS 样式中支持 orientation 的属性：

```css
@media (orientation:landscape) {
    body {
        flex-direction: row;
    }
}
@media (orientation:portrait) {
    body {
        flex-direction: column;
    }
}
```

##### 2-4 移动端底部 Fixed 定位交互设计

#### 第3章 业务组件样式开发

##### 3-1 登录页面基础样式

##### 3-2 登录接口对接（Vuex进阶Namespace及使用）

##### 3-3 个人中心页面头部样式

##### 3-4 完成个人中心样式（处理资源路径）

```vue
.icon-teizi {
	background-image:url(~@/assets/images/taizi@2x.png)
}
```

vue 会将 ~ 之后以模块形式进行引用，wepack 可以识别 @ 所表示的具体路径；

##### 3-5 热门头部筛选样式

##### 3-6 完成热门列表样式

##### 3-7 完成消息列表样式

#### 第4章 Webapp 前后端对接

##### 4-1 热门功能前端接口定义（js策略模式）

##### 4-2热门文章接口开发 & 调试

```js
// 3天前
starttime = moment().subtract(3,'day').format("YYYY-MM-DD 00:00:00")
// 2天后
endtime = moment().add(1,'day').format("YYYY-MM-DD 00:00:00")
```

##### 4-3 热门评论&签到接口开发

##### 4-4 热门帖子功能前后端联调

##### 4-5 热门评论 & 签到排行前后端联调

##### 4-6 路由守卫 & 历史消息对接

##### 4-7 NotFound页面及路由配置 

##### 4-8 如何理解 Vue 中的 Transition 过滤

##### 4-9 移动端路由切换动画设计

##### 4-10 如何调试过渡效果&动画？transition 小结

v-enter v-enter-active v-enter-to v-leave v-leave-active v-leave-to

##### 4-11 热门模块组件化拆分

##### 4-12 webapp自动化发布&打包优化(配置TerserWebpackPlugin)

### 第20周 小程序基础与进阶

#### 第1章 章导学

##### 1-1 章导学

##### 1-2 小程序起源与技术思考

##### 1-3 重点内容介绍

#### 第2章 开发准备

##### 2-1 小程序注册流程(建议使用非个人主体注册)

##### 2-2 小程序后台开发配置、流程及UnionID机制

##### 2-3 开发者工具&第一个小程序应用

##### 2-4 小程序工程目录

- .json 后缀的 JSON 配置文件；
- .wxml 后缀的 WXML 模板文件；
- .wxss 后缀的 WXSS 样式文件；
- .js 后缀的 JS 脚本逻辑文件；

##### 2-5 小程序宿主环境

#### 第3章 小程序核心知识

##### 3-1 小程序样式语言WXSS及两种预编译方案介绍

##### 3-2 小程序App&Page生命周期

##### 3-3 WXML&WXSS语法简介

##### 3-4 跨端框架横向对比(Wepy, mpvue, taro, uniapp)

##### 3-5 mpvue项目初始化

### 第21周 小程序首页/菜单定制/登录开发

#### 第1章 mpvue集成第三方UI库

##### 1-1 mpvue中webpack配置简介 

##### 1-2 集成vant-weapp&配置mpvue支持sass

#### 第2章 自定义首页tabBar&图标的三种方法

##### 2-1 完成底部导航(方法一：app.json中的tabBar配置)

##### 2-2 自定义con组件(让小程序支持svg图标)

##### 2-3 自定义tabBar组件

##### 2-4 图解 flex 布局

横轴为 row ,  justify-content, 纵轴为 align-items;

| justify-conent: start; <br />align-items: start | justify-conent: center;<br /> align-items: start | justify-conent:end ;<br />align-items: start |
| ----------------------------------------------- | ------------------------------------------------ | -------------------------------------------- |
| start center                                    | center center                                    | end center                                   |
| start end                                       | center end                                       | end end                                      |

##### 2-5 使用 van-tabbar & 自定义 van-icon

#### 第3章 首页列表与搜索功能

##### 3-1 首页标签页 tabs 切换

##### 3-2 首页列表样式

##### 3-3 首页自定义顶部导航-搜索框样式实现

#### 第4章 封装request(Promise支持、重复取消、异常处理)

##### 4-1 API 接口 Promise 化

##### 4-2 Request 方法封装分析（如何取消请求）

##### 4-3 wx.request封装为Promise方法(兼容原生) 

##### 4-4 终止重复请求&优化 toast 显示

##### 4-5 小程序本地缓存 token & 封装 post、get 方法

#### 第5章 首页列表接口对接

##### 5-1 首页部分自定义组件拆分

##### 5-2 首页部分拆分自定义标签栏、搜索、列表组件

##### 5-3 首页数据接口对接

##### 5-4 vue 状态管理&首页下拉刷新上拉加载

##### 5-5 下拉刷新上拉加载交互优化

### 第22周 小程序详情面/个人中心开发

#### 第1章 章导学

##### 1-1 章导学必看

#### 第2章 文章详情 & 代码高亮

##### 2-1 文章详情页面路由 & 基础数据

##### 2-2 文章详情之 HTML 解析 mpvue-wxParse 

##### 2-3 mpvue 中使用原生组件 & 自定义小程序组件

##### 2-4 扩展知识：自定义mpvue高亮组件

##### 2-5 代码高亮之自定义 wxParse 组件

##### 2-6 评论列表接口对接&封装通用分页类 Paging

##### 2-7 onReachBottom 事件 & 底部回复样式

```shell
# 切换某个提交记录到新分支上
git checkout commitid -b newbranch
```

##### 2-8 表情事件绑定&3种safeArea适配方案 

手机刘海挡住文字的情况时，可以在 HTML 中添加 meta 属性 viewport-fit=cover, 即 `<meta name="viewport" content="width=device-width,viewport-fit=cover"` :

```css
.post {
    padding:12px;
    padding-left:env(safe-area-inset-left);
    padding-left:env(safe-area-inset-left);
    padding-right:const(safe-area-inset-right);
    padding-right:const(safe-area-inset-right);
}
```

#### 第3章 登录授权&个人信息获取

##### 3-1 微信登录流程介绍

auth.code2Session 登录凭证校验。通过 wx.login 接口获得临时登录凭证 code 后传到开发者服务器调用此接口完成登录流程。

##### 3-2 完成登录页样式

##### 3-3 获取用户信息&微信登录接口开发

##### 3-4 开放数据校验与解密

##### 3-5 小程序侧登录状态校验与授权登录 

##### 3-6 用户信息校验

##### 3-7 后台登录接口开发&调试

```js
findOrCreatedByOpenData:function (wxUserInfo) {
return this.findOne({openid:wxUserInfo.openid},{unionid:0,password:0,openid:0}).then((user) => {
        return user || this.create({
            openid:wxUserInfo.openid,
            unionid:wxUserInfo.unionid,
            username:getTempName(),//随机产生一个账号
            name:wxUserInfo.nickName,
            gender:wxUserInfo.gender,
            pic:wxUserInfo.avatarUrl,
			location:wxUserInfo.city
        })
    })
}
```

#### 第4章 个人中心

##### 4-1 完成个人中心 & 用户数据对接

##### 4-2 个人中心跳转首页 & globalData 全局变量

### 第23周 小程序编辑与发贴开发

#### 第1章 导读

##### 1-1 章导学

- SSL 证书申请及Nginx配置
- 小程序原生能力 —— 订阅消息开发
- 小程序发布流程与提交记录

常见的 cert 证书介绍：

```html
EV SSL 证书（Extended Validation SSL Certificate）
OV SSL 证书（Organization Validation SSL Certificate）
DV SSL 证书（Domain Validation SSL Certificate）- 不适合电商，简易型 SSL 证书
```

#### 第2章 HTTPS 加持 - SSL 证书申请 & 配置 Nginx

##### 2-1 SSL 证书 & Nginx 配置介绍

HTTPS 默认端口为 443；HTTP 默认端口是 80

##### 2-2 使用 acme.sh 申请免费的 SSL 证书

##### 2-3 docker-compose 配置 nginx

（1）安装 docker,docker-compose ----> nginx

（2）docker-compose -> nginx

（3）创建一个 https docker 网络 -> gitlab , jenkins , etc

（4）配置 nginx.conf, 创建 conf.d -> vhost.conf

（5）安装 ssl 证书

（6）docker-compose up -d 运行 nginx 容器 -> 测试 cron 定时任务脚本

##### 2-4 场景一：静态站 nginx 配置 HTTPS 协议（A+安全评级）

#### 第3章 小程序订阅消息

##### 3-1 小程序订阅消息机制&使用说明

##### 3-2 小程序订阅消息基础用法

##### 3-3 消息订阅的应用场景

- 获取用户已经订阅的消息
- 获取服务订阅消息的模板 ID -> restful -> array
- 对比服务器已有消息模板 globalData
- 等待用户的订阅

##### 3-4 从服务端获取订阅消息模板 IDs

##### 3-5 accessToken 定时更新机制设计

accessToken 一般会存放在 redis 缓存中，更新 redis 缓存中的 cookie 即可

##### 3-6 订阅消息通用 utils 开发 & 订阅消息联调

#### 第4章 内容安全

##### 4-1 用户发帖&内容安全介绍

##### 4-2 完成发帖部分样式 & 集成上传图片组件

##### 4-3 内容安全：文本内容安全微信小程序接口对接

##### 4-4 内容安全：图片内容安全微信小程序接口对接

（1）准备图片的 form-data;

（2）处理图片 - 要检测的图片文件，格式支持PNG、JPG、GIF，图片尺寸不超过 750px *  1334px; 

```shell
npm i images -S
# 推荐使用 sharp
npm i install sharp
```

```js
const img = sharp(file.path);
const data = await img.resize(750,1334,{
    fit:'inside'
}).toFile('output.jpg')
```

##### 4-5 小程序图片上传接口 wx.uploadFile 封装 & 接口联调

#### 第5章 打包优化

##### 5-1 打包优化

##### 5-2 mpvue 小程序分包

### 第24周 项目部署、运维与展望

#### 第1章 周导学

##### 1-1 周导学

#### 第2章 扩展内容

##### 2-1 Linux 中分区扩展

##### 2-2 如何更新 Jenkins & 加速插件下载

##### 2-3 Jenkins 任务构建通知

##### 2-4 更简单上手的 HTTPS 服务 Caddy 简介

```shell
cp ./caddy /usr/local/bin/
chmod +x /usr/local/bin/caddy
caddy -host www.example.com
```

##### 2-5 Caddy Version 2  上手 Cloudflare DNS 配置 HTTPS

##### 2-6 如何访问谷歌服务（推荐自建）

##### 2-7 学生相关的资源

#### 第3章 课程展望

##### 3-1 前端人的窘境

##### 3-2 课程展望












































